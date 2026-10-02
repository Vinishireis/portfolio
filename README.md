# Portfólio — Vinícius Nishimura Reis

Portfólio pessoal de [Vinícius Nishimura Reis](https://www.linkedin.com/in/vinicius-nishimura-reis/), desenvolvedor Full Stack Web & Mobile, estudante de Ciência da Computação na FECAP, coordenador do NúcleoTech e estagiário de TI no Audit Delivery Center da Deloitte.

🔗 **Ao vivo:** https://portfolioreact-alpha-two.vercel.app

## ✨ Funcionalidades

- **Design estilo pôster** — dark `#0C0C0C`, tipografia gigante Kanit com gradiente prata, seção branca de serviços com cantos arredondados e mascote interativo que segue o ponteiro
- **Animações on-scroll** com GSAP + ScrollTrigger: marquee guiado pelo scroll, texto revelado caractere a caractere, cards de projeto empilhados com escala e reveals em todas as seções (com respeito a `prefers-reduced-motion`)
- **Integração automática com o GitHub** — os repositórios públicos de [@Vinishireis](https://github.com/Vinishireis) são carregados via API do GitHub, com cache local de 1h para evitar rate limit
- **Blog integrado** com artigos sobre conquistas e trajetória, com leitura em modal
- **Notícias de tecnologia** via [GNews](https://gnews.io/) — IA, tecnologia, desenvolvimento, web e mobile, com filtro por tema, servidas por uma função serverless (`/api/news`) que protege a chave e faz cache
- **Trajetória** em timeline (Deloitte, NúcleoTech, FECAP, Etec Sebrae)
- **Conquistas** em destaque (hackathons Ibracon, Semana de Inovação FECAP, CSBC)
- **Formulário de contato** via EmailJS, com fallback para `mailto:` quando não configurado
- Design responsivo, dark, com glassmorphism e SEO/Open Graph configurados

## 🛠️ Stack

| Camada | Tecnologias |
| --- | --- |
| UI | React 19, Tailwind CSS 4 |
| Animações | GSAP 3 (ScrollTrigger) |
| Build | Vite 8 |
| Ícones | react-icons |
| E-mail | @emailjs/browser |
| Lint | ESLint 10 (flat config) |

## 🚀 Rodando localmente

```bash
npm install
npm run dev        # http://localhost:5173
```

Outros scripts:

```bash
npm run build      # build de produção em dist/
npm run preview    # serve o build localmente
npm run lint       # ESLint
```

## ✉️ Configurando o formulário de contato (opcional)

Crie um `.env` na raiz com as chaves do [EmailJS](https://www.emailjs.com/):

```env
VITE_SERVICE_ID=seu_service_id
VITE_TEMPLATE_ID=seu_template_id
VITE_PUBLIC_KEY=sua_public_key
```

Sem essas variáveis, o formulário abre o cliente de e-mail do visitante via `mailto:`.

## 📰 Configurando as notícias (GNews)

As notícias do Blog vêm da [GNews API](https://gnews.io/) através da rota `/api/news` (função serverless em `api/news.js`). A chave fica só no servidor — o plano gratuito da GNews também não libera CORS fora de `localhost`, então o navegador nunca chama a API diretamente.

1. Crie uma conta em [gnews.io](https://gnews.io/) e copie a chave.
2. Localmente, adicione ao `.env` (sem prefixo `VITE_`):

   ```env
   GNEWS_API_KEY=sua_chave
   ```

   O `npm run dev` e o `npm run preview` já servem `/api/news` pelo próprio Vite.
3. Na Vercel, cadastre `GNEWS_API_KEY` em **Settings → Environment Variables** e faça um novo deploy.

Cada atualização faz 5 consultas (uma por tema) e fica em cache por 3h no servidor/CDN e 30 min no navegador, bem dentro das 100 requisições/dia do plano gratuito. As consultas de cada tema ficam em `api/_gnews.js`.

## 📁 Estrutura

```
src/
├── data/
│   ├── profile.js      # dados pessoais, projetos em destaque, timeline, skills
│   └── posts.js        # artigos do blog
├── hooks/
│   ├── useGitHubRepos.js  # integração com a API do GitHub (+ cache)
│   ├── useReveal.js       # animações on-scroll com GSAP
│   └── useTechNews.js     # notícias via /api/news (+ cache)
├── components/
│   ├── sections/       # Hero, About, Experience, Achievements, Projects, Blog, Contact
│   └── ...             # Navbar, MobileMenu, LoadingScreen, Footer, SectionHeading, NewsFeed
└── App.jsx
api/
├── news.js             # GET /api/news (função serverless da Vercel)
└── _gnews.js           # consultas à GNews por tema, deduplicação e cache
```

## 📬 Contato

- LinkedIn: [vinicius-nishimura-reis](https://www.linkedin.com/in/vinicius-nishimura-reis/)
- GitHub: [@Vinishireis](https://github.com/Vinishireis)
- E-mail: [nishimuravinicius28@gmail.com](mailto:nishimuravinicius28@gmail.com)
