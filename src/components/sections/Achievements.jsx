import { useReveal } from "../../hooks/useReveal";
import { SectionHeading } from "../SectionHeading";
import { highlights } from "../../data/profile";

export const Achievements = () => {
  const scope = useReveal();

  return (
    <section ref={scope} id="achievements" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Conquistas"
          title="Em destaque"
          subtitle="Hackathons nacionais, programação competitiva e liderança estudantil."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => (
            <article
              key={item.title}
              data-reveal="zoom"
              data-reveal-delay={`${(i % 3) * 0.12}`}
              className="card-glass group flex flex-col p-6 transition-all hover:-translate-y-1.5 hover:border-accent-500/40 hover:shadow-[0_12px_40px_rgba(187,204,215,0.15)]"
            >
              <span className="mb-4 text-3xl transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              <h3 className="mb-2 font-semibold leading-snug text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
