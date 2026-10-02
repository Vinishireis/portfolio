/**
 * Hero estilo pôster em azul: sala em perspectiva ao fundo, régua superior
 * com links, headline gigante com selo e swash, pílula de status, flor
 * girando, rabisco desenhado e lista de serviços na base.
 */

/* ------------------------------------------------------------- a sala */

/**
 * Uma sala em perspectiva de um ponto numa caixa 1000x1000, esticada para
 * preencher a hero. A parede do fundo é uma grade; cada linha na borda dela
 * corre até a moldura, afastando-se do ponto de fuga; as linhas de
 * profundidade são a parede do fundo escalada em torno desse ponto.
 */
function room() {
  const x0 = 95;
  const x1 = 905;
  const y0 = 85;
  const y1 = 865;
  const vx = (x0 + x1) / 2;
  const vy = (y0 + y1) / 2;
  const cols = 14;
  const rows = 11;
  const back = [];
  const rays = [];
  const out = (x, y) => {
    const dx = x - vx;
    const dy = y - vy;
    const tx = dx > 0 ? (1000 - x) / dx : dx < 0 ? -x / dx : Infinity;
    const ty = dy > 0 ? (1000 - y) / dy : dy < 0 ? -y / dy : Infinity;
    const t = Math.min(tx, ty);
    return [x, y, x + dx * t, y + dy * t];
  };
  for (let i = 0; i <= cols; i++) {
    const x = x0 + ((x1 - x0) * i) / cols;
    back.push([x, y0, x, y1]);
    rays.push(out(x, y0), out(x, y1));
  }
  for (let j = 0; j <= rows; j++) {
    const y = y0 + ((y1 - y0) * j) / rows;
    back.push([x0, y, x1, y]);
    rays.push(out(x0, y), out(x1, y));
  }
  const depth = [1.07, 1.16, 1.28, 1.45, 1.7].map((s) => {
    const l = vx + (x0 - vx) * s;
    const r = vx + (x1 - vx) * s;
    const t = vy + (y0 - vy) * s;
    const b = vy + (y1 - vy) * s;
    return "M" + l + " " + t + "H" + r + "V" + b + "H" + l + "Z";
  });
  return { back, rays, depth };
}

const ROOM = room();

/** Cinco pétalas irregulares, fechadas, num contorno só. */
function flowerPath() {
  const n = 180;
  const lens = [1, 0.84, 0.95, 0.78, 0.9];
  let d = "";
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = Math.floor(((a + Math.PI / 5) / (Math.PI * 2)) * 5) % 5;
    const lobe = Math.pow(Math.abs(Math.cos((a * 5) / 2)), 0.9);
    const r = 50 * (0.3 + 0.7 * lobe * lens[k]);
    const x = 60 + Math.cos(a - Math.PI / 2) * r;
    const y = 60 + Math.sin(a - Math.PI / 2) * r;
    d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
  }
  return d + "Z";
}

const FLOWER = flowerPath();

/* ----------------------------------------------------------------- styles */

const CSS = `
.mph-root{position:relative;width:100%;overflow:hidden;isolation:isolate;background:var(--mph-paper);color:var(--mph-ink);container:mph / size;font-family:var(--mph-sans);-webkit-font-smoothing:antialiased;}
.mph-room{position:absolute;inset:0;width:100%;height:100%;display:block;color:var(--mph-ink);pointer-events:none;}
.mph-room line,.mph-room path{vector-effect:non-scaling-stroke;}
.mph-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(100cqw,177.78cqh);aspect-ratio:16/9;container:mphs / inline-size;}

.mph-top{position:absolute;left:4.6%;right:4.6%;top:8%;display:grid;grid-template-columns:auto auto 1fr auto auto;align-items:center;column-gap:2.4cqw;font-size:1.05cqw;font-weight:700;line-height:1.1;text-transform:uppercase;letter-spacing:.02em;}
.mph-index{display:inline-flex;align-items:center;gap:.9em;border:.12cqw solid var(--mph-ink);border-radius:999px;padding:.12em .9em .12em .12em;font-size:.72em;}
.mph-index b{background:var(--mph-accent);color:var(--mph-paper);border-radius:999px;padding:.3em 1.2em;font-weight:700;}
.mph-tagline{font-size:1.18em;font-weight:800;margin-left:1cqw;}
.mph-brace{grid-column:4;font-size:1.3em;font-weight:700;letter-spacing:.04em;margin-right:2.6cqw;}
.mph-reel{grid-column:5;display:flex;align-items:center;gap:.8em;font-size:.8em;text-align:right;}
.mph-reel i{display:block;width:1.9em;height:1.9em;border-radius:50%;background:var(--mph-accent);border:.12cqw solid var(--mph-ink);flex:none;}
.mph-reel a{display:block;color:inherit;text-decoration:none;transition:color .2s;}
.mph-reel a:hover{color:var(--mph-accent2);}

.mph-h1{position:absolute;left:8.8%;top:20%;margin:0;font-family:var(--mph-display);font-weight:800;font-size:6.5cqw;line-height:.95;letter-spacing:-.03em;text-transform:uppercase;color:var(--mph-ink);}
.mph-line{display:block;width:max-content;white-space:nowrap;position:relative;}
.mph-ch{display:inline-block;transition:transform .35s cubic-bezier(.3,1.6,.5,1),color .2s;}
.mph-ch:hover{transform:translateY(-.08em) rotate(-4deg);color:var(--mph-accent2);}
.mph-arrow{display:inline-block;width:.6em;height:.6em;margin:0 .06em 0 .1em;vertical-align:-.02em;}
.mph-arrow path{stroke:currentColor;stroke-width:15;fill:none;stroke-linecap:square;}
.mph-badge{position:absolute;top:-.02em;left:calc(100% + .55em);font-family:var(--mph-sans);font-size:.2em;font-weight:700;letter-spacing:0;line-height:1;text-transform:none;border:.13cqw solid var(--mph-ink);border-radius:50%;padding:.75em 1.15em;transform:rotate(-9deg);transition:background .25s,color .25s,transform .4s cubic-bezier(.3,1.6,.5,1);cursor:default;}
.mph-badge sup{font-size:.7em;margin-left:.1em;}
.mph-badge:hover{background:var(--mph-accent);color:var(--mph-paper);transform:rotate(6deg) scale(1.08);}
.mph-swash{position:relative;display:inline-block;}
.mph-swash svg{position:absolute;left:-.95em;top:.3em;width:2.55em;height:.72em;overflow:visible;pointer-events:none;}
.mph-swash path{fill:none;stroke:var(--mph-accent2);stroke-width:.2cqw;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0;animation:mph-draw 1.6s .5s cubic-bezier(.6,0,.2,1) both;}
.mph-h1:hover .mph-swash path{animation:mph-draw 1.1s cubic-bezier(.6,0,.2,1) both;}
.mph-l4{font-size:1.2em;letter-spacing:-.02em;margin-top:.04em;}
.mph-vtag{display:inline-flex;flex-direction:column;align-items:stretch;vertical-align:-.02em;margin:0 .1em 0 .06em;width:.2em;}
.mph-vtag span{display:block;background:var(--mph-ink);color:var(--mph-paper);writing-mode:vertical-rl;font-family:var(--mph-sans);font-size:.105em;font-weight:700;letter-spacing:.12em;padding:.55em 0;text-align:center;}
.mph-vtag i{display:block;height:.34em;background:repeating-linear-gradient(to bottom,var(--mph-ink) 0 .02em,transparent .02em .045em);}
.mph-bracket{position:relative;display:inline-block;padding:0 .08em;}
.mph-bracket svg{position:absolute;left:-.02em;right:-.02em;top:-.1em;bottom:-.12em;width:calc(100% + .04em);height:calc(100% + .22em);overflow:visible;}
.mph-bracket path{fill:none;stroke:var(--mph-ink);stroke-width:.62cqw;stroke-linecap:butt;transition:transform .45s cubic-bezier(.3,1.6,.5,1);}
.mph-bracket:hover .mph-arc-t{transform:translateY(-10px);}
.mph-bracket:hover .mph-arc-b{transform:translateY(10px);}
.mph-star{display:inline-block;font-size:.66em;vertical-align:.5em;margin-left:.02em;color:var(--mph-accent2);transition:transform .6s cubic-bezier(.3,1.6,.5,1);}
.mph-l4:hover .mph-star{transform:rotate(180deg) scale(1.2);}

/* Mesmo padrão dos botões do site (.btn-tech): mono em caixa alta, prompt ">",
   cursor "_" piscando e cantoneiras de mira no hover */
.mph-pill{position:absolute;left:8.8%;top:74%;display:flex;align-items:stretch;font-size:1.45cqw;font-weight:600;line-height:1;text-transform:uppercase;letter-spacing:.14em;}
.mph-pill-a{background:var(--mph-card);color:var(--mph-ink);border:.12cqw solid var(--mph-ink);border-right:0;border-radius:.4em 0 0 .4em;padding:.95em 1.2em;display:inline-flex;align-items:center;}
.mph-pill-b{position:relative;display:inline-flex;align-items:center;gap:.6em;padding:.95em 1.7em;background:var(--mph-accent);color:var(--mph-paper);border:.12cqw solid var(--mph-ink);border-radius:0 .4em .4em 0;text-decoration:none;transition:background .25s,color .25s;}
.mph-pill-b i{font-style:normal;opacity:.7;transition:translate .2s,opacity .2s;}
.mph-pill-b em{font-style:normal;display:inline-block;width:0;margin-left:-.6em;overflow:hidden;opacity:0;transition:width .2s,margin .2s,opacity .2s;}
.mph-pill-b::before,.mph-pill-b::after{content:"";position:absolute;width:.6em;height:.6em;border:0 solid var(--mph-ink);opacity:0;pointer-events:none;transition:inset .25s cubic-bezier(.22,1,.36,1),opacity .2s;}
.mph-pill-b::before{top:.25em;left:.25em;border-top-width:.12cqw;border-left-width:.12cqw;}
.mph-pill-b::after{right:.25em;bottom:.25em;border-right-width:.12cqw;border-bottom-width:.12cqw;}
.mph-pill-b:hover,.mph-pill-b:focus-visible{background:var(--mph-ink);color:var(--mph-paper);outline:none;}
.mph-pill-b:hover i,.mph-pill-b:focus-visible i{translate:.2em 0;opacity:1;}
.mph-pill-b:hover em,.mph-pill-b:focus-visible em{width:.7em;margin-left:0;opacity:1;animation:mph-blink .9s step-end infinite;}
.mph-pill-b:hover::before,.mph-pill-b:focus-visible::before{top:-.5em;left:-.5em;opacity:1;}
.mph-pill-b:hover::after,.mph-pill-b:focus-visible::after{right:-.5em;bottom:-.5em;opacity:1;}

.mph-flower{position:absolute;left:68%;top:52%;width:9.5%;aspect-ratio:1;animation:mph-spin 22s linear infinite;cursor:grab;}
.mph-flower svg{display:block;width:100%;height:100%;overflow:visible;transition:transform .5s cubic-bezier(.3,1.8,.5,1);}
.mph-flower:hover svg{transform:scale(1.18) rotate(40deg);}
.mph-flower path{fill:var(--mph-card);stroke:var(--mph-ink);stroke-width:2.6;stroke-linejoin:round;}
.mph-curl{position:absolute;left:80%;top:30%;width:6.5%;aspect-ratio:1;overflow:visible;pointer-events:none;}
.mph-curl path{fill:none;stroke:var(--mph-ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;animation:mph-draw 1.4s 1s cubic-bezier(.6,0,.2,1) both;}

.mph-services{position:absolute;left:4.6%;bottom:4.6%;display:flex;gap:4cqw;margin:0;padding:0;list-style:none;font-size:1.3cqw;font-weight:700;}
.mph-services li{position:relative;cursor:default;padding-bottom:.25em;}
.mph-services li::after{content:"";position:absolute;left:0;right:0;bottom:0;height:.18em;background:linear-gradient(90deg,var(--mph-accent),var(--mph-accent2));transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.6,0,.2,1);}
.mph-services li:hover::after{transform:scaleX(1);}

.mph-rule{position:absolute;width:0;border-left:.1cqw solid var(--mph-ink);}
.mph-rule::after{content:"";position:absolute;bottom:0;left:-.1cqw;width:1.1cqw;border-top:.1cqw solid var(--mph-ink);transform:rotate(28deg);transform-origin:left;}
.mph-rule-l{left:3.7%;top:23%;height:13%;}
.mph-rule-r{left:94.8%;top:62%;height:13%;}

@keyframes mph-draw{from{stroke-dashoffset:1;}to{stroke-dashoffset:0;}}
@keyframes mph-spin{to{transform:rotate(360deg);}}
@keyframes mph-blink{50%{opacity:0;}}

@container mph (orientation: portrait){
.mph-stage{top:0;transform:translateX(-50%);width:min(100cqw,56.25cqh);height:100cqh;aspect-ratio:auto;}
.mph-top{top:20cqw;left:6%;right:6%;grid-template-columns:auto 1fr auto;font-size:2.5cqw;}
.mph-tagline,.mph-brace{display:none;}
.mph-reel{grid-column:3;}
.mph-h1{left:7%;top:36cqw;font-size:11.4cqw;}
.mph-badge{left:calc(100% + .35em);top:.1em;font-size:.22em;}
.mph-pill{left:7%;top:96cqw;font-size:3cqw;}
.mph-flower{left:auto;right:8%;top:auto;bottom:30cqh;width:16%;}
.mph-curl{left:auto;right:6%;top:78cqw;width:11%;}
.mph-services{left:7%;right:7%;top:auto;bottom:8cqh;flex-wrap:wrap;gap:1.6cqw 5cqw;font-size:3cqw;}
.mph-rule-l{left:3%;top:40cqw;height:12cqw;}
.mph-rule-r{left:95%;top:auto;bottom:36cqh;height:12cqw;}
}

@media (prefers-reduced-motion: reduce){
.mph-root *,.mph-root *::after{animation:none!important;transition:none!important;}
}
`;

/* ------------------------------------------------------------- componente */

export default function PosterHero({
  height = "100svh",
  minHeight = "560px",

  /* ---- régua do topo ---- */
  index = "v2.0",
  discipline = "Full Stack Dev",
  tagline = "Código com propósito",
  collection = ["Web", "Mobile"],
  /** Itens do canto superior direito; com `href` viram links. */
  reel = [{ label: "Portfólio @ 2026" }, { label: "São Paulo, Brasil" }],

  /* ---- headline ---- */
  year = "2026",
  initials = "VNR",
  badge = "Disponível",
  line2 = "Full Stack",
  line3 = "Developer",
  word = "Code",
  verticalTag = "React",
  bracketed = "S",

  /* ---- pílula e serviços ---- */
  seekingLabel = "Aberto a*",
  seeking = "Oportunidades",
  href,
  services = [],

  /** Texto real do h1 (leitores de tela e buscadores); o pôster é decorativo. */
  title,

  /* ---- paleta (a versão azul) ---- */
  accent = "#3b82f6",
  accent2 = "#22d3ee",
  paper = "#060a14",
  card = "#0b1120",
  ink = "#e5e7eb",
  className,
}) {
  const chars = (s) =>
    Array.from(s).map((c, i) => (
      <span key={i} className="mph-ch">
        {c === " " ? " " : c}
      </span>
    ));

  const l3 = Array.from(line3);
  const l3Head = l3.slice(0, -1).join("");
  const l3Tail = l3[l3.length - 1] ?? "";

  const vars = {
    "--mph-accent": accent,
    "--mph-accent2": accent2,
    "--mph-paper": paper,
    "--mph-card": card,
    "--mph-ink": ink,
    "--mph-sans": '"JetBrains Mono","Kanit",ui-monospace,monospace',
    "--mph-display": '"Kanit","Arial Black",system-ui,sans-serif',
    height,
    minHeight,
  };

  const pillInner = (
    <>
      <i aria-hidden="true">&gt;</i>
      {seeking}
      <em aria-hidden="true">_</em>
    </>
  );

  return (
    <div className={"mph-root" + (className ? " " + className : "")} style={vars}>
      <style>{CSS}</style>

      <svg
        className="mph-room"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.1">
          {ROOM.back.map((s, i) => (
            <line key={"b" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.rays.map((s, i) => (
            <line key={"r" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.depth.map((d, i) => (
            <path key={"d" + i} d={d} />
          ))}
        </g>
      </svg>

      <div className="mph-stage">
        <header className="mph-top">
          <span className="mph-index">
            <b>{index}</b>
            {discipline}
          </span>
          <span className="mph-tagline">{tagline}</span>
          <span className="mph-brace">
            {"{"}
            {collection[0]}/{collection[1]}
            {"}"}
          </span>
          <span className="mph-reel">
            <i aria-hidden="true" />
            <span>
              {reel.map((r) =>
                r.href ? (
                  <a key={r.label} href={r.href} target="_blank" rel="noreferrer">
                    {r.label}
                  </a>
                ) : (
                  <span key={r.label} style={{ display: "block" }}>
                    {r.label}
                  </span>
                )
              )}
            </span>
          </span>
        </header>

        <span className="mph-rule mph-rule-l" aria-hidden="true" />
        <span className="mph-rule mph-rule-r" aria-hidden="true" />

        <h1
          className="mph-h1"
          aria-label={
            title ? undefined : [year, initials, line2, line3, word + bracketed].join(" ")
          }
        >
          {title && <span className="sr-only">{title}</span>}
          <span className="mph-line" aria-hidden="true">
            {chars(year)}
            <svg className="mph-arrow" viewBox="0 0 100 100">
              <path d="M14 14 L84 84 M84 30 V84 H30" />
            </svg>
            {chars(initials)}
            <span className="mph-badge">
              {badge}
              <sup>@</sup>
            </span>
          </span>
          <span className="mph-line" aria-hidden="true">
            {chars(line2)}
          </span>
          <span className="mph-line" aria-hidden="true">
            {chars(l3Head)}
            <span className="mph-swash">
              <span className="mph-ch">{l3Tail}</span>
              <svg viewBox="0 0 255 72" preserveAspectRatio="none">
                <path
                  pathLength={1}
                  d="M6 44 C40 18 150 4 222 14 C262 20 258 48 214 58 C150 72 60 70 30 60 C10 53 20 40 60 34"
                />
              </svg>
            </span>
          </span>
          <span className="mph-line mph-l4" aria-hidden="true">
            {chars(word)}
            <span className="mph-vtag">
              <span>{verticalTag}</span>
              <i />
            </span>
            <span className="mph-bracket">
              <svg viewBox="0 0 100 120" preserveAspectRatio="none">
                <path
                  className="mph-arc-t"
                  vectorEffect="non-scaling-stroke"
                  d="M4 16 Q50 -8 96 16"
                />
                <path
                  className="mph-arc-b"
                  vectorEffect="non-scaling-stroke"
                  d="M4 104 Q50 128 96 104"
                />
              </svg>
              {bracketed}
            </span>
            <span className="mph-star">*</span>
          </span>
        </h1>

        <svg className="mph-curl" viewBox="0 0 100 100" aria-hidden="true">
          <path
            pathLength={1}
            d="M92 8 C70 6 52 22 58 40 C63 56 84 52 80 36 C76 22 50 30 40 48 C32 62 26 74 16 84 M14 66 L14 86 L34 86"
          />
        </svg>

        <div className="mph-pill">
          <span className="mph-pill-a">{seekingLabel}</span>
          {href ? (
            <a className="mph-pill-b" href={href}>
              {pillInner}
            </a>
          ) : (
            <span className="mph-pill-b" tabIndex={0}>
              {pillInner}
            </span>
          )}
        </div>

        <div className="mph-flower" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <path d={FLOWER} />
            <circle cx="60" cy="60" r="4" fill="none" stroke={ink} strokeWidth="2" />
          </svg>
        </div>

        <ul className="mph-services">
          {services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
