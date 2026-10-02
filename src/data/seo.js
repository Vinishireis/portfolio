import { profile } from "./profile.js";

/**
 * Metadados de SEO. O plugin em seo/plugin.js monta a partir daqui (e do
 * profile.js) as meta tags, o JSON-LD, o sitemap, o robots e os llms.txt.
 */
export const seo = {
  siteUrl: profile.links.site,
  locale: "pt_BR",
  language: "pt-BR",
  siteName: `${profile.name} | Portfólio`,

  // Até ~60 caracteres para não ser cortado na busca
  title: `${profile.name} | Desenvolvedor Full Stack Web & Mobile`,
  // Até ~155 caracteres: é o texto que aparece embaixo do título no Google
  description:
    "Portfólio de Vinícius Nishimura Reis, desenvolvedor full stack em São Paulo. Apps web e mobile com React, React Native, Next.js, Node.js e TypeScript.",

  // Resumo em terceira pessoa: JSON-LD (Person) e citação de abertura do llms.txt
  summary:
    "Vinícius Nishimura Reis é desenvolvedor full stack web e mobile em São Paulo, estudante de Ciência da Computação na FECAP, coordenador do NúcleoTech FECAP e estagiário de TI na Deloitte (Audit Delivery Center). Constrói produtos com React, React Native, Next.js, Node.js, TypeScript e Supabase e soma pódios em hackathons nacionais.",

  // Texto dos cards de compartilhamento (WhatsApp, LinkedIn, X, Discord...)
  ogTitle: `${profile.name}: Desenvolvedor Full Stack Web & Mobile`,
  ogDescription:
    "Do produto em produção ao hackathon vencedor: projetos web e mobile com React, React Native, Node.js e TypeScript. Coordenador do NúcleoTech FECAP e estagiário de TI na Deloitte.",

  ogImage: {
    path: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Vinícius Nishimura Reis, desenvolvedor full stack web e mobile: React, React Native, Next.js, Node.js e TypeScript",
  },

  keywords: [
    "Vinícius Nishimura Reis",
    "Vinicius Nishimura Reis",
    "Vinishireis",
    "Vinícius Nishimura",
    "desenvolvedor full stack",
    "desenvolvedor full stack São Paulo",
    "desenvolvedor web",
    "desenvolvedor mobile",
    "desenvolvedor React",
    "desenvolvedor React Native",
    "programador São Paulo",
    "portfólio desenvolvedor",
    "React",
    "React Native",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Supabase",
    "Python",
    "Expo",
    "FECAP",
    "Ciência da Computação",
    "NúcleoTech FECAP",
    "Deloitte",
    "hackathon",
    "full stack developer Brazil",
    "React developer",
  ],
};
