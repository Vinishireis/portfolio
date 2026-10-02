export const profile = {
  name: "Vinícius Nishimura Reis",
  role: "Desenvolvedor Full Stack · Web & Mobile",
  headline:
    "Estudo Ciência da Computação na FECAP, coordeno o NúcleoTech e sou estagiário de TI na Deloitte. Gosto de pegar um problema real e transformar em produto.",
  /** Texto da seção "Sobre mim" (também usado no SEO e no llms.txt) */
  bio:
    "Estudo Ciência da Computação na FECAP, sou desenvolvedor full stack e coordeno o NúcleoTech. Já levei projetos de hackathon ao pódio nacional e hoje construo produtos próprios enquanto estagio na Deloitte. Bora construir algo incrível juntos?",
  location: { city: "São Paulo", region: "SP", country: "BR" },
  githubUser: "Vinishireis",
  links: {
    github: "https://github.com/Vinishireis",
    linkedin: "https://www.linkedin.com/in/vinicius-nishimura-reis/",
    email: "nishimuravinicius28@gmail.com",
    // Endereço canônico: usado no Open Graph, sitemap, robots, JSON-LD e llms.txt
    site: "https://www.vinishireis.dev.br",
  },
};

export const highlights = [
  {
    icon: "🏆",
    title: "1º lugar na Semana de Inovação FECAP 2026",
    description:
      "Vencemos com o FECAP Ágora, uma plataforma que reúne vagas, eventos e networking para os alunos. O projeto foi selecionado para um ano de incubação na FECAP.",
  },
  {
    icon: "🥇",
    title: "1º lugar no Hackathon Ibracon Nacional 2025",
    description:
      "Nosso time criou o Zeus Lightning, um ecossistema de IA que ajuda a tratar relatórios de sustentabilidade dentro dos padrões IFRS.",
  },
  {
    icon: "🥈",
    title: "2º lugar no Hackathon Ibracon Nacional 2026",
    description:
      "Ficamos em segundo com o Chronos Audit, uma plataforma de IA que analisa documentos de auditoria, aponta inconsistências e melhora a rastreabilidade dos relatórios.",
  },
  {
    icon: "🥉",
    title: "3º lugar na Maratona de Inverno do CSBC 2026",
    description:
      "Representei a FECAP na maratona de programação do maior congresso de computação do país, em dupla com o Mauricio Suster.",
  },
  {
    icon: "🧑‍💼",
    title: "Coordenador do NúcleoTech FECAP",
    description:
      "Lidero o núcleo de tecnologia da FECAP, organizando projetos, grupos de estudo e iniciativas junto à comunidade acadêmica.",
  },
];

export const featuredProjects = [
  {
    name: "GameFY",
    url: "https://www.gamefy.education/",
    description:
      "Plataforma gamificada para instituições de ensino, empresas e eventos, com gestão de projetos integradores, rankings e check-in por QR Code.",
    tags: ["Next.js", "Gamificação", "Dados", "Eventos"],
    status: "Em desenvolvimento",
  },
  {
    name: "TrocaTicket",
    url: "https://trocaticket.com.br/",
    description:
      "Plataforma de eventos que reúne compra de ingressos, revenda segura, acesso digital e ferramentas de gestão para organizadores.",
    tags: ["Marketplace", "Eventos", "Tickets digitais"],
    status: "Em desenvolvimento",
  },
  {
    name: "Nexo Finance",
    url: "https://www.nexoxapp.com.br/",
    description:
      "Aplicativo de finanças pessoais que centraliza contas, cartões, metas e orçamento, com Open Finance, Nexo IA e planejamento compartilhado.",
    tags: ["React Native", "Expo", "Open Finance", "IA"],
    status: "Em desenvolvimento",
  },
  {
    name: "FECAP Ágora",
    url: "https://www.linkedin.com/in/vinicius-nishimura-reis/",
    description:
      "Plataforma que conecta estudantes da FECAP a vagas, eventos e networking. Venceu a Semana de Inovação 2026 e está incubada pela faculdade.",
    tags: ["React Native", "Recomendação", "Teoria dos Grafos"],
    status: "Incubado pela FECAP",
  },
  {
    name: "Zeus Lightning",
    url: "https://www.fecap.br/2025/06/23/fecap-conquista-1o-lugar-no-hackathon-do-ibracon/",
    description:
      "Ecossistema de IA para tratar relatórios de sustentabilidade nos padrões IFRS. Primeiro lugar no Hackathon Ibracon Nacional 2025.",
    tags: ["IA", "Automação", "ESG", "Auditoria"],
    status: "1º lugar Ibracon 2025",
  },
  {
    name: "Chronos Audit",
    url: "https://www.linkedin.com/in/vinicius-nishimura-reis/",
    description:
      "Plataforma de IA que analisa documentos de auditoria, encontra inconsistências e melhora a rastreabilidade dos relatórios. Segundo lugar no Ibracon 2026.",
    tags: ["IA", "Automação", "Análise documental"],
    status: "2º lugar Ibracon 2026",
  },
];

export const timeline = [
  {
    period: "desde nov 2025",
    title: "Estagiário de Tecnologia da Informação",
    org: "Deloitte · Audit Delivery Center (ADC)",
    description:
      "Trabalho com soluções digitais para auditoria e gestão de dados, criando scripts e ferramentas internas e automatizando processos junto a times multidisciplinares.",
    tags: ["Python", "SQL", "Automação", "Análise de dados"],
  },
  {
    period: "atual",
    title: "Coordenador",
    org: "NúcleoTech FECAP",
    description:
      "Coordeno o núcleo de tecnologia da FECAP, aproximando estudantes por meio de projetos, eventos e iniciativas de inovação.",
    tags: ["Liderança", "Comunidade", "Inovação"],
  },
  {
    period: "em andamento",
    title: "Bacharelado em Ciência da Computação",
    org: "FECAP",
    description:
      "Curso com foco em desenvolvimento de software, algoritmos e projetos em equipe. É onde participo de maratonas de programação e hackathons.",
    tags: ["Algoritmos", "Programação competitiva", "Produtos"],
  },
  {
    period: "fev 2022 a jun 2023",
    title: "Tecnólogo em Tecnologia da Informação",
    org: "Etec Sebrae (Campos Elíseos)",
    description:
      "Formação técnica com base em desenvolvimento web, JavaScript, PHP e bancos de dados, além de noções de marketing digital e empreendedorismo.",
    tags: ["JavaScript", "PHP", "Banco de dados", "Web"],
  },
];

export const skills = {
  desenvolvimento: [
    "React",
    "React Native",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "C#",
    ".NET",
    "PHP",
    "Flutter",
    "Unity",
  ],
  produtoEDados: [
    "UI/UX",
    "Figma",
    "Supabase",
    "MySQL",
    "SQL",
    "APIs REST",
    "Automação de processos",
    "Análise de dados",
    "Git & GitHub",
    "Tailwind CSS",
  ],
};

export const services = [
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
