import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Anima com GSAP + ScrollTrigger todos os descendentes marcados com
 * [data-reveal] dentro do elemento retornado. Valores possíveis:
 *   data-reveal="up" | "left" | "right" | "zoom"  (padrão: "up")
 *   data-reveal-delay="0.2"                        (segundos, opcional)
 */
export function useReveal(deps = []) {
  const scope = useRef(null);

  useEffect(() => {
    if (!scope.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = scope.current.querySelectorAll("[data-reveal]");
    if (prefersReduced) {
      targets.forEach((el) => (el.style.opacity = 1));
      return;
    }

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const kind = el.dataset.reveal || "up";
        const delay = parseFloat(el.dataset.revealDelay || 0);

        const from = {
          up: { y: 48, x: 0, scale: 1 },
          left: { y: 0, x: -56, scale: 1 },
          right: { y: 0, x: 56, scale: 1 },
          zoom: { y: 0, x: 0, scale: 0.92 },
        }[kind];

        gsap.fromTo(
          el,
          { opacity: 0, ...from },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, scope);

    ScrollTrigger.refresh();
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
