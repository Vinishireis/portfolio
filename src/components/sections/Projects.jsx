import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink, FiGitBranch, FiGithub, FiStar } from "react-icons/fi";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeading } from "../SectionHeading";
import { TechButton } from "../ui/TechButton";
import { featuredProjects, profile } from "../../data/profile";
import { languageColors, useGitHubRepos } from "../../hooks/useGitHubRepos";

gsap.registerPlugin(ScrollTrigger);

/* Os três produtos principais viram cards empilhados; as imagens são as
   og-images dos próprios sites dos produtos. */
const STACK_IMAGES = {
  GameFY: "https://www.gamefy.education/og-image.png",
  TrocaTicket: "https://trocaticket.com.br/og-image.png",
  "Nexo Finance": "https://www.nexoxapp.com.br/og-image.png",
};

const stack = featuredProjects.filter((p) => STACK_IMAGES[p.name]);
const others = featuredProjects.filter((p) => !STACK_IMAGES[p.name]);

const StackedCards = () => {
  const wrapRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const slots = gsap.utils.toArray(".proj-slot");
      slots.forEach((slot, i) => {
        if (i === slots.length - 1) return;
        // O card encolhe conforme o próximo sobe por cima dele
        gsap.to(slot.querySelector(".proj-card"), {
          scale: 1 - (slots.length - 1 - i) * 0.05,
          filter: "brightness(0.6)",
          ease: "none",
          scrollTrigger: {
            trigger: slots[i + 1],
            start: "top bottom",
            end: "top 120px",
            scrub: true,
          },
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef}>
      {stack.map((p, i) => (
        <div key={p.name} className="proj-slot h-[92vh] md:h-[88vh]">
          <article
            className="proj-card sticky mx-auto flex max-w-5xl flex-col gap-6 rounded-[40px] border-2 border-mist/70 bg-surface p-5 will-change-transform sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
            style={{ top: `calc(84px + ${i * 26}px)`, transformOrigin: "center top" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5 md:gap-8">
                <span
                  className="text-gradient font-black leading-none"
                  style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                >
                  0{i + 1}
                </span>
                <div>
                  <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">
                    {p.status}
                  </p>
                  <h3
                    className="font-medium uppercase tracking-tight text-white"
                    style={{ fontSize: "clamp(1.25rem, 2.6vw, 2.2rem)" }}
                  >
                    {p.name}
                  </h3>
                </div>
              </div>
              <TechButton href={p.url}>Ver projeto</TechButton>
            </div>

            <div className="grid gap-5 md:grid-cols-5">
              <div className="flex flex-col justify-between gap-5 md:col-span-2">
                <p className="font-light leading-relaxed text-gray-400">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-wide text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-[28px] border border-line bg-white/[0.04] sm:rounded-[34px] md:col-span-3 md:rounded-[40px]">
                <img
                  src={STACK_IMAGES[p.name]}
                  alt={`Prévia do projeto ${p.name}`}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="h-[clamp(180px,30vw,360px)] w-full object-cover"
                />
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};

const RepoCard = ({ repo }) => (
  <a
    href={repo.url}
    target="_blank"
    rel="noreferrer"
    className="card-glass group flex flex-col p-5 transition-all hover:-translate-y-1 hover:border-mist/40"
  >
    <div className="mb-2 flex items-center justify-between gap-2">
      <h4 className="truncate font-mono text-sm font-semibold text-white group-hover:text-accent-300">
        {repo.name}
      </h4>
      <FiExternalLink
        className="shrink-0 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100"
        size={14}
      />
    </div>
    <p className="mb-4 line-clamp-2 flex-1 text-sm font-light text-gray-400">
      {repo.description ?? "Repositório no GitHub."}
    </p>
    <div className="flex items-center gap-4 text-xs text-gray-500">
      {repo.language && (
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: languageColors[repo.language] ?? "#64748b" }}
          />
          {repo.language}
        </span>
      )}
      <span className="flex items-center gap-1">
        <FiStar size={13} /> {repo.stars}
      </span>
      <span className="flex items-center gap-1">
        <FiGitBranch size={13} /> {repo.forks}
      </span>
    </div>
  </a>
);

export const Projects = () => {
  const { repos, status } = useGitHubRepos(profile.githubUser, { limit: 9 });
  const scope = useReveal([status]);

  return (
    <section
      ref={scope}
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-surface pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] md:-mt-14 md:rounded-t-[60px] md:pt-28"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Portfólio" title="Projetos" />
      </div>

      {/* Cards empilhados dos produtos principais */}
      <div className="px-4">
        <StackedCards />
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-4">
        {/* Demais destaques */}
        <h3
          data-reveal="up"
          className="display-heading text-gradient mb-10 text-center"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          Também construí
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((project, i) => (
            <article
              key={project.name}
              data-reveal="up"
              data-reveal-delay={`${(i % 3) * 0.12}`}
              className="card-glass group flex flex-col p-6 transition-all hover:-translate-y-1.5 hover:border-mist/40"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h4 className="text-lg font-semibold uppercase tracking-tight text-white">
                  {project.name}
                </h4>
                <span className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-accent-300">
                  {project.status}
                </span>
              </div>
              <p className="mb-4 flex-1 text-sm font-light leading-relaxed text-gray-400">
                {project.description}
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <TechButton href={project.url} variant="link" className="self-start">
                Conhecer projeto
              </TechButton>
            </article>
          ))}
        </div>

        {/* Repositórios carregados automaticamente via API do GitHub */}
        <div className="mt-24">
          <div
            data-reveal="up"
            className="mb-8 flex flex-col items-center gap-2 text-center"
          >
            <h3
              className="display-heading text-gradient flex items-center gap-3"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              <FiGithub aria-hidden="true" className="text-mist" />
              Direto do GitHub
            </h3>
            <p className="text-sm font-light text-gray-500">
              Repositórios públicos carregados automaticamente do meu perfil{" "}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-accent-300 hover:underline"
              >
                @{profile.githubUser}
              </a>
              .
            </p>
          </div>

          {status === "loading" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-glass h-36 animate-pulse p-5">
                  <div className="mb-3 h-4 w-2/5 rounded bg-white/10" />
                  <div className="mb-2 h-3 w-full rounded bg-white/5" />
                  <div className="h-3 w-3/4 rounded bg-white/5" />
                </div>
              ))}
            </div>
          )}

          {status === "error" && (
            <p className="text-center text-sm text-gray-500">
              Não foi possível carregar os repositórios agora. Veja tudo em{" "}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-accent-300 hover:underline"
              >
                github.com/{profile.githubUser}
              </a>
              .
            </p>
          )}

          {status === "success" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <div key={repo.id} data-reveal="up">
                  <RepoCard repo={repo} />
                </div>
              ))}
            </div>
          )}

          <div data-reveal="up" className="mt-10 text-center">
            <TechButton href={profile.links.github} size="lg" icon={FiGithub}>
              Ver todos os repositórios
            </TechButton>
          </div>
        </div>
      </div>
    </section>
  );
};
