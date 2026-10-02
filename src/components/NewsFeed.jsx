import { useState } from "react";
import {
  FiArrowUpRight,
  FiCode,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiRss,
  FiSmartphone,
  FiZap,
} from "react-icons/fi";
import { useTechNews } from "../hooks/useTechNews";
import { TechButton } from "./ui/TechButton";

const PAGE_SIZE = 6;
const ALL = "todas";

const topicIcons = {
  [ALL]: FiLayers,
  ia: FiCpu,
  tecnologia: FiZap,
  desenvolvimento: FiCode,
  web: FiGlobe,
  mobile: FiSmartphone,
};

const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

const timeAgo = (iso) => {
  const minutes = Math.min(0, Math.round((new Date(iso) - Date.now()) / 60000));
  if (minutes > -60) return rtf.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (hours > -24) return rtf.format(hours, "hour");
  return rtf.format(Math.round(hours / 24), "day");
};

const NewsCard = ({ article, topicLabels, delay }) => (
  <a
    href={article.url}
    target="_blank"
    rel="noreferrer"
    style={{ animationDelay: `${delay}ms` }}
    className="card-glass group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-[0_8px_32px_rgba(187,204,215,0.12)] motion-safe:animate-fade-up"
  >
    <div className="relative aspect-video overflow-hidden bg-white/5">
      <FiRss
        aria-hidden="true"
        size={28}
        className="absolute inset-0 m-auto text-gray-600"
      />
      {article.image && (
        <img
          src={article.image}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>

    <div className="flex flex-1 flex-col p-5">
      <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
        <span className="truncate font-medium text-accent-300">{article.source}</span>
        <span aria-hidden="true">•</span>
        <time dateTime={article.publishedAt} className="shrink-0">
          {timeAgo(article.publishedAt)}
        </time>
      </div>

      <h4 className="mb-2 line-clamp-3 font-semibold leading-snug text-white transition-colors group-hover:text-accent-300">
        {article.title}
      </h4>
      {article.description && (
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-400">
          {article.description}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {article.topics.map((id) => (
            <span
              key={id}
              className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-300"
            >
              #{topicLabels[id] ?? id}
            </span>
          ))}
        </div>
        <FiArrowUpRight
          aria-hidden="true"
          size={16}
          className="shrink-0 text-gray-500 transition-colors group-hover:text-accent-400"
        />
      </div>
      <span className="sr-only">(abre em nova aba)</span>
    </div>
  </a>
);

export const NewsFeed = () => {
  const { topics, articles, updatedAt, status } = useTechNews();
  const [filter, setFilter] = useState(ALL);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const topicLabels = Object.fromEntries(topics.map((t) => [t.id, t.label]));
  const filters = [
    { id: ALL, label: "Todas", count: articles.length },
    ...topics.map((t) => ({
      ...t,
      count: articles.filter((a) => a.topics.includes(t.id)).length,
    })),
  ].filter((f) => f.count > 0);

  const filtered =
    filter === ALL ? articles : articles.filter((a) => a.topics.includes(filter));

  const selectFilter = (id) => {
    setFilter(id);
    setVisible(PAGE_SIZE);
  };

  return (
    <div className="mt-20">
      <div
        data-reveal="up"
        className="mb-8 flex flex-col items-center gap-2 text-center"
      >
        <h3 className="flex items-center gap-2 text-xl font-semibold">
          <FiRss className="text-accent-400" />
          Notícias de <span className="text-gradient">tecnologia</span>
        </h3>
        <p className="max-w-xl text-sm text-gray-500">
          As últimas novidades de IA, tecnologia, desenvolvimento, web e
          mobile, atualizadas automaticamente.
        </p>
      </div>

      {status === "loading" && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="card-glass animate-pulse overflow-hidden">
              <div className="aspect-video bg-white/5" />
              <div className="p-5">
                <div className="mb-3 h-3 w-1/3 rounded bg-white/10" />
                <div className="mb-2 h-4 w-full rounded bg-white/10" />
                <div className="mb-4 h-4 w-4/5 rounded bg-white/10" />
                <div className="h-3 w-full rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="text-center text-sm text-gray-500">
          Não foi possível carregar as notícias agora. Tente novamente mais tarde.
        </p>
      )}

      {status === "success" && (
        <>
          <div
            role="group"
            aria-label="Filtrar notícias por tema"
            className="mb-8 flex flex-wrap justify-center gap-2"
          >
            {filters.map(({ id, label, count }) => {
              const Icon = topicIcons[id] ?? FiRss;
              const active = id === filter;
              return (
                // Filtro ativo ganha o prompt ">", como item selecionado num menu de terminal
                <TechButton
                  key={id}
                  size="sm"
                  variant={active ? "primary" : "outline"}
                  prompt={active}
                  icon={Icon}
                  aria-pressed={active}
                  onClick={() => selectFilter(id)}
                >
                  {label}
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] tracking-normal ${
                      active ? "bg-surface/10 text-surface" : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </TechButton>
              );
            })}
          </div>

          {/* key no filtro: trocar de aba remonta a grade e refaz a animação de entrada */}
          <div key={filter} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, visible).map((article, i) => (
              <NewsCard
                key={article.id}
                article={article}
                topicLabels={topicLabels}
                delay={(i % PAGE_SIZE) * 70}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            {visible < filtered.length && (
              <TechButton onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Carregar mais notícias
              </TechButton>
            )}
            {updatedAt && (
              <p className="text-xs text-gray-600">Atualizado {timeAgo(updatedAt)}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
