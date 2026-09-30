import { useEffect, useState } from "react";

const CACHE_KEY = "gh-repos-cache-v1";
const CACHE_TTL = 1000 * 60 * 60; // 1 hora, evita estourar o rate limit anônimo da API

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { savedAt, repos } = JSON.parse(raw);
    if (Date.now() - savedAt > CACHE_TTL) return null;
    return repos;
  } catch {
    return null;
  }
};

const writeCache = (repos) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), repos }));
  } catch {
    /* armazenamento indisponível (modo privado etc.), segue sem cache */
  }
};

const normalize = (repo) => ({
  id: repo.id,
  name: repo.name,
  description: repo.description,
  url: repo.html_url,
  homepage: repo.homepage,
  language: repo.language,
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  topics: repo.topics ?? [],
  pushedAt: repo.pushed_at,
});

export function useGitHubRepos(username, { limit = 9 } = {}) {
  const [repos, setRepos] = useState(() => readCache() ?? []);
  const [status, setStatus] = useState(repos.length ? "success" : "loading");

  useEffect(() => {
    // O estado inicial já vem do cache; só busca na API se não houver cache válido
    if (readCache()?.length) return;

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          }
        );
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        const data = await res.json();

        const cleaned = data
          .filter((r) => !r.fork && !r.archived && r.name.toLowerCase() !== username.toLowerCase())
          .map(normalize)
          .sort(
            (a, b) =>
              b.stars - a.stars || new Date(b.pushedAt) - new Date(a.pushedAt)
          );

        writeCache(cleaned);
        setRepos(cleaned);
        setStatus("success");
      } catch (err) {
        if (err.name !== "AbortError") setStatus("error");
      }
    })();

    return () => controller.abort();
  }, [username]);

  return { repos: repos.slice(0, limit), total: repos.length, status };
}

// Cores oficiais de linguagens do GitHub (subset das mais usadas por Vinishireis)
export const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  "C#": "#178600",
  C: "#555555",
  "C++": "#f34b7d",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#663399",
  Dart: "#00B4AB",
  Java: "#b07219",
  ShaderLab: "#222c37",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
};
