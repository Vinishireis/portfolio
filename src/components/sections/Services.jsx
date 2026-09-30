import { useReveal } from "../../hooks/useReveal";

const SERVICES = [
  {
    n: "01",
    name: "Desenvolvimento Web",
    description:
      "Aplicações web modernas e escaláveis com React, Next.js e TypeScript, do design system ao deploy.",
  },
  {
    n: "02",
    name: "Apps Mobile",
    description:
      "Apps multiplataforma com React Native e Expo, do protótipo à publicação, com foco em experiência nativa.",
  },
  {
    n: "03",
    name: "Back-end & APIs",
    description:
      "APIs e integrações com Node.js, Supabase e bancos SQL, incluindo autenticação, dados em tempo real e funções serverless.",
  },
  {
    n: "04",
    name: "Automação & Dados",
    description:
      "Scripts, pipelines e análise de dados com Python e SQL para automatizar processos e gerar insights.",
  },
  {
    n: "05",
    name: "UI/UX & Produto",
    description:
      "Interfaces bem construídas no Figma, com design orientado a produto, acessibilidade e conversão.",
  },
];

export const Services = () => {
  const scope = useReveal();

  return (
    <section
      ref={scope}
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 text-surface sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        data-reveal="up"
        className="display-heading mb-16 text-surface sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Serviços
      </h2>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((s, i) => (
          <article
            key={s.n}
            data-reveal="up"
            data-reveal-delay={`${i * 0.1}`}
            className="flex items-start gap-6 border-b py-8 last:border-b-0 sm:gap-10 sm:py-10 md:gap-14 md:py-12"
            style={{ borderColor: "rgba(12, 12, 12, 0.15)" }}
          >
            <span
              className="shrink-0 font-black leading-none"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {s.n}
            </span>
            <div className="pt-2 md:pt-4">
              <h3
                className="mb-2 font-medium uppercase tracking-tight"
                style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
              >
                {s.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed opacity-60"
                style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
              >
                {s.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
