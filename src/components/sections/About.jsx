import { Suspense, lazy, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TechButton } from "../ui/TechButton";

gsap.registerPlugin(ScrollTrigger);

// O dock usa framer-motion (~32 kB gzip): fica num chunk à parte, fora do bundle inicial
const TechStack = lazy(() =>
  import("../TechStack").then((mod) => ({ default: mod.TechStack }))
);

const BIO =
  "Estudo Ciência da Computação na FECAP, sou desenvolvedor full stack e coordeno o NúcleoTech. Já levei projetos de hackathon ao pódio nacional e hoje construo produtos próprios enquanto estagio na Deloitte. Bora construir algo incrível juntos?";

const STATS = [
  "4+ prêmios em competições nacionais",
  "10+ projetos web & mobile entregues",
  "3 produtos em desenvolvimento ativo",
];

/* Glifos decorativos flutuando nos cantos, no lugar dos renders 3D */
const corners = [
  { text: "{ }", cls: "left-[2%] top-[6%] md:left-[5%]", from: -80, rot: "-rotate-12" },
  { text: "</>", cls: "right-[2%] top-[6%] md:right-[5%]", from: 80, rot: "rotate-12" },
  { text: "✦", cls: "bottom-[10%] left-[4%] md:left-[10%]", from: -80, rot: "rotate-6" },
  { text: "*", cls: "bottom-[6%] right-[4%] md:right-[10%]", from: 80, rot: "-rotate-6" },
];

export const About = () => {
  const scope = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(
          "[data-about], [data-about='footer'] > *, .about-char, .about-corner",
          { opacity: 1 }
        );
        return;
      }

      gsap.fromTo(
        "[data-about='title']",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-about='title']", start: "top 85%" },
        }
      );

      // Revelação caractere a caractere guiada pelo scroll
      gsap.fromTo(
        ".about-char",
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.6,
          scrollTrigger: {
            trigger: "[data-about='bio']",
            start: "top 80%",
            end: "bottom 35%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        "[data-about='footer'] > *",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-about='footer']", start: "top 90%" },
        }
      );

      // Cantos: entram pelas laterais e ficam flutuando
      gsap.utils.toArray(".about-corner").forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: parseFloat(el.dataset.from) },
          {
            autoAlpha: 0.5,
            x: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 70%" },
          }
        );
        gsap.to(el, {
          y: i % 2 ? 18 : -18,
          duration: 5 + i,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {corners.map((c) => (
        <span
          key={c.text + c.cls}
          aria-hidden="true"
          data-from={c.from}
          className={`about-corner text-gradient pointer-events-none absolute z-0 font-mono font-black opacity-0 ${c.cls} ${c.rot}`}
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          {c.text}
        </span>
      ))}

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <h2
            data-about="title"
            className="display-heading text-gradient opacity-0"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Sobre mim
          </h2>

          <p
            data-about="bio"
            className="max-w-[560px] text-center font-medium leading-relaxed text-mist"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          >
            {BIO.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {Array.from(word).map((ch, ci) => (
                  <span key={ci} className="about-char inline-block">
                    {ch}
                  </span>
                ))}
                <span className="about-char inline-block">&nbsp;</span>
              </span>
            ))}
          </p>
        </div>

        <Suspense fallback={<div aria-hidden="true" className="h-36 w-full" />}>
          <TechStack />
        </Suspense>

        <div data-about="footer" className="flex flex-col items-center gap-10">
          <TechButton href="#contact" variant="primary" size="lg" className="opacity-0">
            Fale comigo
          </TechButton>

          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-0">
            {STATS.map((s) => (
              <li
                key={s}
                className="flex items-center gap-3 whitespace-nowrap text-xs uppercase tracking-wider text-gray-400 sm:text-sm"
              >
                <span aria-hidden="true" className="text-gradient font-black">
                  ✦
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
