import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../../data/profile";

gsap.registerPlugin(ScrollTrigger);

const ROW_B = [
  "🏆 FECAP Ágora",
  "🥇 Ibracon 2025",
  "🥈 Ibracon 2026",
  "🥉 CSBC 2026",
  "Deloitte ADC",
  "NúcleoTech",
  "GameFY",
  "TrocaTicket",
  "Nexo Finance",
];

const Row = ({ items, inverted, rowClass }) => (
  <div className="overflow-hidden">
    <div className={`flex w-max items-center gap-3 will-change-transform ${rowClass}`}>
      {/* Conteúdo triplicado para as bordas nunca aparecerem durante o scrub */}
      {[...items, ...items, ...items].map((item, i) => (
        <span
          key={i}
          className={`whitespace-nowrap rounded-2xl px-8 py-4 text-lg font-semibold uppercase tracking-tight md:px-10 md:py-5 md:text-2xl ${
            inverted
              ? "bg-mist text-surface"
              : "border border-line bg-white/[0.04] text-mist"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

export const Marquee = () => {
  const scope = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const scrub = {
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };
      gsap.fromTo(
        ".marquee-a",
        { xPercent: -14 },
        { xPercent: -2, ease: "none", scrollTrigger: scrub }
      );
      gsap.fromTo(
        ".marquee-b",
        { xPercent: -2 },
        { xPercent: -14, ease: "none", scrollTrigger: { ...scrub } }
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      aria-label="Tecnologias e conquistas"
      className="flex flex-col gap-3 overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <Row items={skills.desenvolvimento} rowClass="marquee-a" />
      <Row items={ROW_B} inverted rowClass="marquee-b" />
    </section>
  );
};
