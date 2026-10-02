import { useCallback, useEffect, useState } from "react";
import { FiCalendar, FiClock, FiX } from "react-icons/fi";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeading } from "../SectionHeading";
import { NewsFeed } from "../NewsFeed";
import { TechButton } from "../ui/TechButton";
import { posts } from "../../data/posts";

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const PostModal = ({ post, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="card-glass max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-surface-raised/95 p-6 sm:p-8"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
            {post.title}
          </h3>
          <TechButton
            size="icon"
            variant="ghost"
            icon={FiX}
            aria-label="Fechar artigo"
            onClick={onClose}
            className="shrink-0"
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <FiCalendar size={13} /> {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <FiClock size={13} /> {post.readingTime} de leitura
          </span>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-gray-300 sm:text-base">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent-500/10 px-3 py-1 text-xs text-accent-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};

export const Blog = () => {
  const scope = useReveal();
  const [activePost, setActivePost] = useState(null);
  const closeModal = useCallback(() => setActivePost(null), []);

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section ref={scope} id="blog" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Blog"
          title="Histórias e conquistas"
          subtitle="Histórias das minhas conquistas e do que ando construindo."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post, i) => (
            <article
              key={post.slug}
              data-reveal="up"
              data-reveal-delay={`${(i % 3) * 0.12}`}
              className="card-glass group flex cursor-pointer flex-col p-6 transition-all hover:-translate-y-1.5 hover:border-accent-500/40 hover:shadow-[0_12px_40px_rgba(187,204,215,0.15)]"
              onClick={() => setActivePost(post)}
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FiCalendar size={12} /> {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock size={12} /> {post.readingTime}
                </span>
              </div>

              <h3 className="mb-2 font-semibold leading-snug text-white transition-colors group-hover:text-accent-300">
                {post.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-400">
                {post.excerpt}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <TechButton
                variant="link"
                className="self-start"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePost(post);
                }}
              >
                Ler artigo
              </TechButton>
            </article>
          ))}
        </div>

        {/* Notícias de IA, tecnologia, dev, web e mobile */}
        <NewsFeed />
      </div>

      {activePost && <PostModal post={activePost} onClose={closeModal} />}
    </section>
  );
};
