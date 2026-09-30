import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import * as React from "react";

/**
 * Dock de ferramentas: uma fileira de ícones sobrepostos e inclinados que
 * incha em volta do ponteiro, com um único tooltip que desliza até o ícone
 * mais próximo. Adaptado do componente ToolDock (TSX + shadcn) para o JS e os
 * tokens de cor deste projeto. Usa LazyMotion + `m` (em vez de `motion`) para
 * carregar só as features de animação necessárias: ~17 kB gzip a menos.
 *
 * items: [{ label, icon }]. `label` vai no tooltip e no leitor de tela;
 * `icon` é decorativo (imagens com alt="").
 */

const cn = (...classes) => classes.filter(Boolean).join(" ");

/** Fixo por posição, para a fileira inclinar igual em todo render. */
const TILT = [-7, 5, -4, 8, -6, 4, -8, 6, -3, 7, -5, 6];
/** Quantas larguras de ícone de cada lado do ponteiro ainda incham. */
const REACH = 1.2;
/** Quanto um ícone totalmente inchado sobe, em alturas de ícone. */
const LIFT = 0.19;
/** Assenta rápido e sem balanço, para o ícone voltar logo que o ponteiro sai. */
const SPRING = { stiffness: 520, damping: 40, mass: 0.5 };

/**
 * Quanto o ícone `k` incha com o ponteiro em `x`, de 0 a 1. Ao quadrado, para
 * o ícone sob o ponteiro levar quase tudo e os vizinhos só se mexerem.
 */
function swellAt({ centers, width }, k, x) {
  const center = centers[k];
  if (!Number.isFinite(x) || center === undefined || !width) return 0;
  return Math.max(0, 1 - Math.abs(x - center) / width / REACH) ** 2;
}

/**
 * Os ícones entram da esquerda para a direita na primeira vez que a fileira
 * aparece: cada um sobe um pouco e ganha nitidez. Com movimento reduzido,
 * simplesmente aparecem.
 */
const deal = {
  hidden: { opacity: 0, y: 12, scale: 0.94, filter: "blur(3px)" },
  shown: ({ index, still }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: still
      ? { duration: 0 }
      : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 },
    transitionEnd: { filter: "none" },
  }),
};

/**
 * Um ícone. Tudo é calculado pela posição do ponteiro ao longo da fileira
 * contra o centro de repouso do ícone, nunca pelo que está sob o ponteiro:
 * como os ícones crescem e se sobrepõem, o hit-test trocaria o ícone ativo
 * enquanto ele cresce (é isso que faz a maioria dos docks piscar).
 *
 * Os ícones nunca trocam de lugar na pilha. A fileira abre espaço: quando um
 * incha, os da esquerda deslizam para a esquerda e os da direita para a
 * direita, o suficiente para ele não cobrir os vizinhos.
 */
const DockTile = React.memo(function DockTile({
  item,
  index,
  count,
  pointer,
  layout,
  still,
  overlap,
  magnification,
  tilt,
}) {
  const lean = tilt ? TILT[index % TILT.length] : 0;
  // Um ícone totalmente inchado empurra cada vizinho esta distância, em
  // larguras de ícone: metade do próprio crescimento mais a sobreposição.
  const room = Math.max(0, overlap + magnification / 2);

  const near = useTransform(pointer, (x) =>
    still ? 0 : swellAt(layout.current, index, x)
  );
  // Empurrado para a direita por cada ícone inchado à esquerda e vice-versa,
  // para a fileira se abrir em volta do ponteiro como um dock.
  const push = useTransform(pointer, (x) => {
    if (still) return 0;
    const { centers, width } = layout.current;
    let shift = 0;
    for (let k = 0; k < centers.length; k++) {
      if (k !== index) {
        shift += swellAt(layout.current, k, x) * (k < index ? 1 : -1);
      }
    }
    return shift * width * room;
  });

  const swell = useSpring(near, SPRING);
  const x = useSpring(push, SPRING);
  const scale = useTransform(swell, (v) => 1 + v * magnification);
  const y = useTransform(swell, (v) => -v * LIFT * layout.current.width);
  const rotate = useTransform(swell, (v) => lean * (1 - v));

  return (
    <m.li
      data-slot="tool-dock-item"
      custom={{ index, still }}
      variants={deal}
      className="pointer-events-none relative flex"
      style={{
        // Em repouso, cada ícone cobre o seguinte.
        zIndex: count - index,
        marginLeft: index === 0 ? 0 : `calc(var(--tool-dock-size) * ${-overlap})`,
      }}
    >
      <m.div
        role="img"
        aria-label={item.label}
        style={{ x, y, scale, rotate }}
        className="size-(--tool-dock-size) origin-bottom select-none will-change-transform"
      >
        {item.icon}
      </m.div>
    </m.li>
  );
});

export function ToolDock({
  items,
  size = 56,
  overlap = 0.12,
  magnification = 0.28,
  tilt = true,
  label = "Ferramentas",
  className,
  ...props
}) {
  const rail = React.useRef(null);
  const layout = React.useRef({ centers: [], width: 0 });
  const still = useReducedMotion() ?? false;
  // Posição do ponteiro ao longo da fileira em px; Infinity quando fora.
  const pointer = useMotionValue(Number.POSITIVE_INFINITY);
  const [active, setActive] = React.useState(null);
  // Lido pelos handlers do ponteiro, que podem disparar duas vezes antes de um render.
  const current = React.useRef(null);
  // O tooltip desliza entre ícones, mas aparece no lugar quando abre.
  const [glide, setGlide] = React.useState(false);
  const [at, setAt] = React.useState(0);
  // Mantido quando o ponteiro sai, para o texto não sumir no meio do fade.
  const [text, setText] = React.useState(items[0]?.label ?? "");

  // Os slots nunca se movem (só os ícones dentro deles), então os centros são
  // medidos uma vez e de novo sempre que a fileira muda de tamanho.
  React.useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const measure = () => {
      const slots = [...el.children];
      layout.current = {
        centers: slots.map((li) => li.offsetLeft + li.offsetWidth / 2),
        width: slots[0]?.offsetWidth ?? 0,
      };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

  const track = (clientX) => {
    const el = rail.current;
    if (!el) return;
    const x = clientX - el.getBoundingClientRect().left;
    pointer.set(x);
    const { centers } = layout.current;
    if (centers.length === 0) return;
    let nearest = 0;
    for (let i = 1; i < centers.length; i++) {
      if (Math.abs(x - centers[i]) < Math.abs(x - centers[nearest])) nearest = i;
    }
    if (nearest === current.current) return;
    setGlide(current.current !== null);
    current.current = nearest;
    setActive(nearest);
    setText(items[nearest].label);
    setAt(centers[nearest]);
  };

  const release = () => {
    pointer.set(Number.POSITIVE_INFINITY);
    current.current = null;
    setActive(null);
  };

  // A fileira cabe no container (`size` ou menor), com folga dos dois lados
  // para abrir espaço em volta de um ícone inchado.
  const span =
    1 +
    (items.length - 1) * (1 - overlap) +
    2 * Math.max(0, overlap + magnification / 2);
  // Um ícone inchado sobe isto acima da fileira; o tooltip fica acima dele.
  const rise = LIFT + magnification;

  return (
    <LazyMotion features={domAnimation} strict>
      <div
        data-slot="tool-dock"
        className={cn("@container flex w-full justify-center", className)}
        {...props}
      >
        <div
          className="relative w-fit pt-[calc(var(--tool-dock-size)*var(--tool-dock-rise)+2.75rem)]"
          style={{
            "--tool-dock-size": `min(${size}px, calc((100cqw - 1rem) / ${span}))`,
            "--tool-dock-rise": rise,
          }}
        >
          <span
            aria-hidden="true"
            data-slot="tool-dock-tooltip"
            data-state={active === null ? "closed" : "open"}
            className={cn(
              "pointer-events-none absolute bottom-[calc(var(--tool-dock-size)*(1+var(--tool-dock-rise))+0.625rem)] left-0 z-50 whitespace-nowrap rounded-md border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-mist opacity-0 shadow-lg shadow-black/40 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:opacity-100 motion-reduce:transition-none",
              glide
                ? "transition-[translate,opacity] duration-300"
                : "transition-opacity duration-200"
            )}
            style={{ translate: `calc(${at}px - 50%) 0` }}
          >
            {text}
            <span className="absolute -bottom-[5px] left-1/2 -ml-[4.5px] size-[9px] rotate-45 rounded-br-[2px] border-b border-r border-line bg-surface-raised" />
          </span>

          <m.ul
            ref={rail}
            role="list"
            aria-label={label}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            onPointerMove={(event) => track(event.clientX)}
            onPointerDown={(event) => track(event.clientX)}
            onPointerLeave={release}
            onPointerUp={(event) => {
              if (event.pointerType !== "mouse") release();
            }}
            onPointerCancel={release}
            className="relative flex w-fit touch-pan-y"
          >
            {items.map((item, index) => (
              <DockTile
                key={item.label}
                item={item}
                index={index}
                count={items.length}
                pointer={pointer}
                layout={layout}
                still={still}
                overlap={overlap}
                magnification={magnification}
                tilt={tilt}
              />
            ))}
          </m.ul>
        </div>
      </div>
    </LazyMotion>
  );
}

/**
 * Ícone estilo app para um logo: quadrado arredondado com leve elevação,
 * brilho no topo e borda fina. A cor de fundo vem sempre por `className`
 * (sem cor padrão, para não disputar com ela sem o tailwind-merge).
 */
export function ToolDockTile({ className, children, ...props }) {
  return (
    <div
      data-slot="tool-dock-tile"
      className={cn(
        "relative grid size-full place-items-center overflow-hidden rounded-[23%] shadow-[0_0_0_0.5px_rgb(255_255_255/0.1),0_1px_1.5px_rgb(0_0_0/0.4),0_6px_16px_-6px_rgb(0_0_0/0.6)]",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-linear-to-b after:from-white/15 after:to-transparent after:shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14),inset_0_1px_0_rgb(255_255_255/0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
