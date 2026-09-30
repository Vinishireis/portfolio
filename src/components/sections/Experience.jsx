import { useReveal } from "../../hooks/useReveal";
import { SectionHeading } from "../SectionHeading";
import { timeline } from "../../data/profile";

export const Experience = () => {
  const scope = useReveal();

  return (
    <section ref={scope} id="experience" className="py-24">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading
          eyebrow="Trajetória"
          title="Experiência e formação"
          subtitle="Onde estudo, onde trabalho e o caminho até aqui."
        />

        <div className="relative ml-3 border-l border-line pl-8 sm:ml-6">
          {timeline.map((item, i) => (
            <article
              key={item.org + item.title}
              data-reveal={i % 2 === 0 ? "left" : "right"}
              className="group relative pb-12 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[37px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent-500 bg-surface transition-all group-hover:bg-accent-500 group-hover:shadow-[0_0_12px_rgba(187,204,215,0.6)]"
              />
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent-400">
                {item.period}
              </p>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mb-2 text-sm font-medium text-gray-400">{item.org}</p>
              <p className="mb-3 text-sm leading-relaxed text-gray-400">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
