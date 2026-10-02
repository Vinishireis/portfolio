import { useEffect, useRef } from "react";
import gsap from "gsap";
import PosterHero from "../ui/PosterHero";
import { profile } from "../../data/profile";

const services = [
  "React & React Native",
  "Node.js & TypeScript",
  "Next.js & Supabase",
  "UI/UX & Produto",
];

export const Hero = () => {
  const scope = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".mph-top", { autoAlpha: 0, y: -28, duration: 0.7 })
        .from(
          ".mph-h1 .mph-line",
          { autoAlpha: 0, y: 56, duration: 0.8, stagger: 0.14 },
          "-=0.35"
        )
        .from(".mph-pill", { autoAlpha: 0, x: -40, duration: 0.6 }, "-=0.4")
        .from(
          ".mph-services li",
          { autoAlpha: 0, y: 24, duration: 0.5, stagger: 0.08 },
          "-=0.35"
        )
        // Flor e rabisco têm animações CSS próprias de transform e traço;
        // aqui só o fade, para não conflitar.
        .from(
          [".mph-flower", ".mph-curl"],
          { autoAlpha: 0, duration: 0.6 },
          "-=0.4"
        );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="home">
      <PosterHero
        height="100svh"
        minHeight="600px"
        index="v2.0"
        discipline="Full Stack Dev"
        tagline="Código com propósito"
        collection={["Web", "Mobile"]}
        reel={[
          { label: "github.com/Vinishireis", href: profile.links.github },
          { label: "/in/vinicius-nishimura-reis", href: profile.links.linkedin },
        ]}
        year="2026"
        initials="VNR"
        badge="Disponível"
        line2="Full Stack"
        line3="Developer"
        word="Code"
        verticalTag="React"
        bracketed="S"
        seekingLabel="Aberto a*"
        seeking="Oportunidades"
        href="#contact"
        services={services}
        title={`${profile.name}, desenvolvedor full stack web e mobile`}
      />
    </section>
  );
};
