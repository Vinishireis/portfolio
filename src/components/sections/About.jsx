import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const frontendSkills = [
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "React",
    "Next.js",
    "React Native",
    "Redux",
    "Vite",
    "Tailwind CSS",
    "Styled Components",
    "SCSS",
    "Figma"
  ];

  const backendSkills = [
    "Node.js",
    "Express",
    "REST APIs",
    "Git",
    "GitHub",
    "Virtualização (Oracle/KVM)",
    "Linux (Kali/Ubuntu)",
    "macOS"
  ];

  const softSkills = [
    "Trabalho em equipe",
    "Comunicação eficaz",
    "Resolução de problemas",
    "Raciocínio lógico",
    "Adaptabilidade",
    "Aprendizado contínuo"
  ];

  const cursosCerts = [
    "Bootcamp Santander Cibersegurança – DIO (2024–2025)",
    "Conceitos e Práticas de SO e VMs – DIO (2024–2025)",
    "Desvendando a Blockchain – SENAI (2025)",
    "Desvendando a Indústria 4.0 – SENAI (2025)"
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Sobre Mim
          </h2>

          <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-gray-300 mb-6">
              Olá! Eu sou <strong>Vinicius Nishimura Reis</strong>, desenvolvedor <strong>Web e Mobile</strong> com foco
              em criar interfaces <em>responsivas</em>, acessíveis e centradas no usuário. Tenho experiência sólida em
              <strong> HTML, CSS, JavaScript, React e React Native</strong>, além de práticas de UI/UX, prototipagem no{" "}
              <strong>Figma</strong> e boas práticas de usabilidade. Atuo em projetos que conectam tecnologia e impacto
              real, sempre buscando soluções eficientes e modernas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frontend */}
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">🚀 Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend & Ferramentas */}
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">⚙️ Backend & Ferramentas</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Educação e Experiência */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">🏫 Formação Acadêmica</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong>Bacharelado em Ciências da Computação</strong> – FECAP, São Paulo
                  <br />
                  <span className="text-gray-400">Set/2024 – Set/2028 (em andamento)</span>
                </li>
                <li>
                  <strong>Técnico em Informática para Internet</strong> – Etec Sebrae, São Paulo
                  <br />
                  <span className="text-gray-400">Jan/2023 – Nov/2024 (concluído)</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">💼 Perfil & Atuação</h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  Desenvolvedor Frontend com experiência em <strong>interfaces responsivas</strong> e foco em{" "}
                  <strong>UX</strong>. Perfil proativo, colaborativo e orientado a resultados, com aprendizado contínuo
                  e atenção a tendências do mercado.
                </p>
                <p>
                  Experiência com <strong>React</strong>, <strong>React Native</strong>, <strong>Next.js</strong>,{" "}
                  <strong>Tailwind</strong>, <strong>Node.js</strong> e integração com <strong>APIs REST</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Soft Skills e Cursos/Certificações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">🧩 Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">🎓 Cursos & Certificações</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {cursosCerts.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-200 mb-2">🌎 Idiomas</h4>
                <p className="text-gray-300">
                  Português (nativo) • Inglês (intermediário)
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
