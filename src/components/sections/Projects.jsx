import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Projetos em Destaque
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* GameFy */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2">🎮 GameFy</h3>
              <p className="text-gray-400 mb-4">
                Plataforma acadêmica gamificada para gerenciamento de grupos de PI,
                avaliações e fluxos entre alunos e professores da FECAP.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Next.js", "React", "Supabase", "TailwindCSS"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/Vinishireis/GameFy_Web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Ver no GitHub →
                </a>
              </div>
            </div>

            {/* Comedoria da Tia */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2">🥗 Comedoria da Tia</h3>
              <p className="text-gray-400 mb-4">
                Sistema de pedidos mobile + web para o refeitório da FECAP,
                com gestão de produtos, cardápio e integração com Supabase.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["React Native", "Java (Android)", "Supabase", "Expo"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/Vinishireis/ComedoriaDaTia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Ver no GitHub →
                </a>
              </div>
            </div>

            {/* Núcleo Tech */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2">💡 Núcleo Tech</h3>
              <p className="text-gray-400 mb-4">
                Plataforma de eventos e agenda tecnológica do Núcleo Tech, com 
                interface moderna e gestão de atividades e palestras.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["React", "DevExtreme", "Supabase", "TailwindCSS"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/Vinishireis/NucleoTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Ver no GitHub →
                </a>
              </div>
            </div>

            {/* Outros projetos */}
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2">📂 Outros Projetos</h3>
              <p className="text-gray-400 mb-4">
                Explore mais repositórios que envolvem desafios de programação,
                estudos acadêmicos e soluções criativas que desenvolvi.
              </p>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/Vinishireis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  Ver Perfil no GitHub →
                </a>
              </div>
            </div>

          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
