import {
  featuredProjects,
  highlights,
  profile,
  services,
  skills,
  timeline,
} from "../src/data/profile.js";
import { posts } from "../src/data/posts.js";
import { seo } from "../src/data/seo.js";

/**
 * Plugin de SEO do portfólio. Tudo sai dos arquivos em src/data, então
 * atualizar um projeto, conquista ou post atualiza junto:
 *
 * - <head>: title, description, canonical, Open Graph, Twitter, ícones e
 *   JSON-LD (Person + WebSite + ProfilePage) no marcador <!-- seo:head -->
 * - conteúdo estático no #root (<!-- seo:fallback -->) para buscadores e
 *   robôs de IA que não executam JavaScript; o React o substitui ao montar
 * - robots.txt, sitemap.xml, llms.txt, llms-full.txt e site.webmanifest
 *
 * Verificação de propriedade (opcional): defina GOOGLE_SITE_VERIFICATION e/ou
 * BING_SITE_VERIFICATION nas variáveis de ambiente do deploy.
 */

const SITE = seo.siteUrl.replace(/\/$/, "");
const HOME = `${SITE}/`;
const abs = (path) => `${SITE}${path}`;
const today = () => new Date().toISOString().slice(0, 10);

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const allSkills = [...skills.desenvolvimento, ...skills.produtoEDados];
const awards = highlights.filter((h) => /^\d/.test(h.title)).map((h) => h.title);
const [firstName, ...lastNames] = profile.name.split(" ");
const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

/* ------------------------------------------------------------ JSON-LD */

const structuredData = () => {
  const person = {
    "@type": "Person",
    "@id": `${HOME}#person`,
    name: profile.name,
    alternateName: ["Vinicius Nishimura Reis", profile.githubUser, "VNR"],
    givenName: firstName,
    familyName: lastNames.join(" "),
    url: HOME,
    image: abs(seo.ogImage.path),
    jobTitle: "Desenvolvedor Full Stack",
    description: seo.summary,
    email: `mailto:${profile.links.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: profile.location.country,
    },
    sameAs: [profile.links.github, profile.links.linkedin],
    knowsAbout: allSkills,
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "FECAP – Fundação Escola de Comércio Álvares Penteado",
        url: "https://www.fecap.br",
      },
      { "@type": "EducationalOrganization", name: "Etec Sebrae" },
    ],
    worksFor: { "@type": "Organization", name: "Deloitte", url: "https://www.deloitte.com/br" },
    memberOf: {
      "@type": "Organization",
      name: "NúcleoTech FECAP",
      url: "https://www.nucleotech.dev.br",
    },
    award: awards,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${HOME}#website`,
        url: HOME,
        name: seo.siteName,
        description: seo.description,
        inLanguage: seo.language,
        author: { "@id": `${HOME}#person` },
        publisher: { "@id": `${HOME}#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${HOME}#profilepage`,
        url: HOME,
        name: seo.title,
        description: seo.description,
        inLanguage: seo.language,
        isPartOf: { "@id": `${HOME}#website` },
        about: { "@id": `${HOME}#person` },
        mainEntity: { "@id": `${HOME}#person` },
        dateModified: today(),
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: abs(seo.ogImage.path),
          width: seo.ogImage.width,
          height: seo.ogImage.height,
        },
      },
    ],
  };
};

/* ------------------------------------------------------------- <head> */

const headTags = () => {
  const image = abs(seo.ogImage.path);
  const robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="keywords" content="${esc(seo.keywords.join(", "))}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="googlebot" content="${robots}" />`,
    `<link rel="canonical" href="${HOME}" />`,
    `<link rel="alternate" hreflang="${seo.language}" href="${HOME}" />`,
    `<link rel="alternate" hreflang="x-default" href="${HOME}" />`,
    `<link rel="me" href="${profile.links.github}" />`,
    `<link rel="me" href="${profile.links.linkedin}" />`,
    `<meta name="theme-color" content="#0c0c0c" />`,
    `<meta name="color-scheme" content="dark" />`,
    `<meta name="application-name" content="VinishiReis" />`,
    `<meta name="apple-mobile-web-app-title" content="VinishiReis" />`,
    `<meta name="format-detection" content="telephone=no" />`,
    `<meta name="geo.region" content="BR-SP" />`,
    `<meta name="geo.placename" content="${esc(profile.location.city)}" />`,

    // Open Graph (WhatsApp, LinkedIn, Facebook, Discord, Slack, Telegram...)
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${esc(seo.siteName)}" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:url" content="${HOME}" />`,
    `<meta property="og:title" content="${esc(seo.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(seo.ogDescription)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:secure_url" content="${image}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="${seo.ogImage.width}" />`,
    `<meta property="og:image:height" content="${seo.ogImage.height}" />`,
    `<meta property="og:image:alt" content="${esc(seo.ogImage.alt)}" />`,
    `<meta property="profile:first_name" content="${esc(firstName)}" />`,
    `<meta property="profile:last_name" content="${esc(lastNames.join(" "))}" />`,
    `<meta property="profile:username" content="${esc(profile.githubUser)}" />`,

    // X / Twitter
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(seo.ogDescription)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(seo.ogImage.alt)}" />`,

    // Ícones e PWA
    `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`,
    `<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
  ];

  if (process.env.GOOGLE_SITE_VERIFICATION) {
    tags.push(`<meta name="google-site-verification" content="${esc(process.env.GOOGLE_SITE_VERIFICATION)}" />`);
  }
  if (process.env.BING_SITE_VERIFICATION) {
    tags.push(`<meta name="msvalidate.01" content="${esc(process.env.BING_SITE_VERIFICATION)}" />`);
  }

  // "</" escapado para o JSON nunca fechar a tag <script> antes da hora
  const jsonLd = JSON.stringify(structuredData()).replace(/</g, "\\u003c");
  tags.push(`<script type="application/ld+json">${jsonLd}</script>`);

  // Quem roda JS nunca vê o conteúdo estático: o React o substitui ao montar
  tags.push(
    `<script>document.documentElement.classList.add("has-js")</script>`,
    `<style>.has-js #seo-fallback{display:none}#seo-fallback{max-width:46rem;margin:0 auto;padding:3rem 1.25rem;font:16px/1.65 system-ui,-apple-system,"Segoe UI",sans-serif;color:#d7e2ea;background:#0c0c0c}#seo-fallback h1{font-size:2.25rem;line-height:1.1;margin:.25rem 0}#seo-fallback h2{margin-top:2.5rem;font-size:1.35rem;border-bottom:1px solid rgba(215,226,234,.14);padding-bottom:.4rem}#seo-fallback h3{font-size:1.05rem;margin:1.1rem 0 .2rem}#seo-fallback a{color:#93c5fd}#seo-fallback ul{padding-left:1.1rem}</style>`
  );

  return tags.join("\n    ");
};

/* ------------------------------------------- conteúdo estático (#root) */

const dateBR = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const fallbackHtml = () => `<div id="seo-fallback">
      <header>
        <p>Portfólio</p>
        <h1>${esc(profile.name)}</h1>
        <p><strong>${esc(profile.role)}</strong> em ${esc(profile.location.city)}, ${esc(profile.location.region)}, Brasil</p>
        <p>${esc(profile.headline)}</p>
      </header>
      <main>
        <section>
          <h2>Sobre mim</h2>
          <p>${esc(profile.bio)}</p>
        </section>
        <section>
          <h2>Serviços</h2>
          <ul>${services.map((s) => `<li><strong>${esc(s.name)}</strong>: ${esc(s.description)}</li>`).join("")}</ul>
        </section>
        <section>
          <h2>Projetos</h2>
          <ul>${featuredProjects
            .map(
              (p) =>
                `<li><h3><a href="${esc(p.url)}">${esc(p.name)}</a></h3><p>${esc(p.status)}. ${esc(p.description)}</p><p>Tecnologias e temas: ${esc(p.tags.join(", "))}</p></li>`
            )
            .join("")}</ul>
        </section>
        <section>
          <h2>Experiência e formação</h2>
          <ul>${timeline
            .map(
              (t) =>
                `<li><h3>${esc(t.title)}, ${esc(t.org)}</h3><p>${esc(t.period)}. ${esc(t.description)}</p></li>`
            )
            .join("")}</ul>
        </section>
        <section>
          <h2>Conquistas</h2>
          <ul>${highlights.map((h) => `<li><h3>${esc(h.title)}</h3><p>${esc(h.description)}</p></li>`).join("")}</ul>
        </section>
        <section>
          <h2>Tecnologias</h2>
          <p>${esc(allSkills.join(", "))}</p>
        </section>
        <section>
          <h2>Blog</h2>
          <ul>${sortedPosts
            .map(
              (p) =>
                `<li><article><h3>${esc(p.title)}</h3><p><time datetime="${p.date}">${dateBR(p.date)}</time></p><p>${esc(p.excerpt)}</p></article></li>`
            )
            .join("")}</ul>
        </section>
        <section>
          <h2>Contato</h2>
          <ul>
            <li>E-mail: <a href="mailto:${esc(profile.links.email)}">${esc(profile.links.email)}</a></li>
            <li>LinkedIn: <a href="${esc(profile.links.linkedin)}">${esc(profile.links.linkedin)}</a></li>
            <li>GitHub: <a href="${esc(profile.links.github)}">${esc(profile.links.github)}</a></li>
          </ul>
        </section>
      </main>
    </div>`;

/* --------------------------------------------- arquivos na raiz do site */

const robotsTxt = () => `# ${profile.name} | ${profile.role}
# Buscadores e robôs de IA são bem-vindos. Resumo para LLMs: ${abs("/llms.txt")}

User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${abs("/sitemap.xml")}
`;

const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${HOME}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${abs(seo.ogImage.path)}</image:loc>
    </image:image>
  </url>
</urlset>
`;

const projectLine = (p) => `- [${p.name}](${p.url}): ${p.description} (${p.status}; ${p.tags.join(", ")})`;
const timelineLine = (t) => `- **${t.title}**, ${t.org} (${t.period}): ${t.description}`;

// Formato de https://llmstxt.org: H1, resumo em citação, seções H2 com links
const llmsTxt = () => `# ${profile.name}

> ${seo.summary}

- Nome: ${profile.name} (também conhecido como ${profile.githubUser} ou VNR)
- Área: desenvolvimento full stack, web e mobile
- Principais tecnologias: ${skills.desenvolvimento.slice(0, 7).join(", ")}, Supabase
- Status: aberto a oportunidades, projetos e parcerias
- Idioma: português (Brasil)

## Perfil e contato

- [Portfólio](${HOME}): site oficial com projetos, trajetória, conquistas e blog
- [GitHub](${profile.links.github}): repositórios públicos
- [LinkedIn](${profile.links.linkedin}): trajetória profissional e acadêmica
- [E-mail](mailto:${profile.links.email}): ${profile.links.email}

## Projetos

${featuredProjects.map(projectLine).join("\n")}

## Experiência e formação

${timeline.map(timelineLine).join("\n")}

## Conquistas

${highlights.map((h) => `- ${h.title}`).join("\n")}

## Optional

- [Conteúdo completo](${abs("/llms-full.txt")}): biografia, serviços, tecnologias e todos os artigos do blog na íntegra
- [Sitemap](${abs("/sitemap.xml")})
`;

const llmsFullTxt = () => `# ${profile.name}

> ${seo.summary}

Site oficial: ${HOME}
GitHub: ${profile.links.github}
LinkedIn: ${profile.links.linkedin}
E-mail: ${profile.links.email}

## Sobre

${profile.bio}

Também conhecido como ${profile.githubUser} (usuário no GitHub) e VNR (iniciais). Aberto a oportunidades, projetos e parcerias.

## Serviços

${services.map((s) => `### ${s.name}\n\n${s.description}`).join("\n\n")}

## Tecnologias

- Desenvolvimento: ${skills.desenvolvimento.join(", ")}
- Produto e dados: ${skills.produtoEDados.join(", ")}

## Projetos

${featuredProjects
  .map((p) => `### ${p.name}\n\n${p.description}\n\n- Status: ${p.status}\n- Temas: ${p.tags.join(", ")}\n- Link: ${p.url}`)
  .join("\n\n")}

## Experiência e formação

${timeline
  .map((t) => `### ${t.title}, ${t.org}\n\n${t.period}. ${t.description}\n\n- Temas: ${t.tags.join(", ")}`)
  .join("\n\n")}

## Conquistas

${highlights.map((h) => `### ${h.title}\n\n${h.description}`).join("\n\n")}

## Blog

${sortedPosts
  .map((p) => `### ${p.title}\n\nPublicado em ${p.date} · ${p.readingTime} de leitura · ${p.tags.join(", ")}\n\n${p.content.join("\n\n")}`)
  .join("\n\n")}
`;

const webManifest = () =>
  JSON.stringify(
    {
      name: `${profile.name} | Desenvolvedor Full Stack`,
      short_name: "VinishiReis",
      description: seo.description,
      lang: seo.language,
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#0c0c0c",
      theme_color: "#0c0c0c",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      ],
    },
    null,
    2
  );

const FILES = {
  "robots.txt": [robotsTxt, "text/plain; charset=utf-8"],
  "sitemap.xml": [sitemapXml, "application/xml; charset=utf-8"],
  "llms.txt": [llmsTxt, "text/plain; charset=utf-8"],
  "llms-full.txt": [llmsFullTxt, "text/plain; charset=utf-8"],
  "site.webmanifest": [webManifest, "application/manifest+json; charset=utf-8"],
};

export function seoPlugin() {
  return {
    name: "portfolio-seo",

    transformIndexHtml: {
      order: "pre",
      handler: (html) =>
        html
          .replace("<!-- seo:head -->", headTags())
          .replace("<!-- seo:fallback -->", fallbackHtml()),
    },

    // Em dev os arquivos são servidos na hora; no build vão para o dist/
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = req.url?.split("?")[0].slice(1);
        if (!name || !Object.hasOwn(FILES, name)) return next();
        const [build, type] = FILES[name];
        res.setHeader("Content-Type", type);
        res.end(build());
      });
    },

    generateBundle() {
      for (const [fileName, [build]] of Object.entries(FILES)) {
        this.emitFile({ type: "asset", fileName, source: build() });
      }
    },
  };
}
