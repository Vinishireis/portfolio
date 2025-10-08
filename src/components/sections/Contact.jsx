import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);     // "success" | "error" | null
  const [loading, setLoading] = useState(false);  // loading do botão

  const handleSubmit = async (e) => {
    e.preventDefault();

    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const PUBLIC_KEY  = import.meta.env.VITE_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      console.error("Env faltando: VITE_SERVICE_ID / VITE_TEMPLATE_ID / VITE_PUBLIC_KEY");
      return;
    }

    try {
      setLoading(true);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      e.target.reset(); // garante limpar inputs controlados e nativos
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="px-4 w-full min-w-[300px] md:w-[500px] sm:w-2/3 p-6">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Entre em Contato
          </h2>

          {/* Mensagem animada */}
          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className={`mb-6 p-4 rounded-lg text-center font-medium border ${
                  status === "success"
                    ? "bg-green-500/15 text-green-400 border-green-500/30"
                    : "bg-red-500/15 text-red-400 border-red-500/30"
                }`}
              >
                {status === "success"
                  ? "✅ Mensagem enviada com sucesso!"
                  : "❌ Ocorreu um erro ao enviar. Tente novamente."}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Se seu template no EmailJS usa outros names (ex: from_name, reply_to),
                ajuste os atributos name abaixo para casar 1:1. */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"            // altere para "from_name" se for esse o campo do template
                required
                value={formData.name}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Seu nome..."
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"           // altere para "reply_to" se o template espera esse nome
                required
                value={formData.email}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="seuemail@gmail.com"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"         // mantenha igual ao campo do template
                required
                rows={5}
                value={formData.message}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                placeholder="Sua mensagem..."
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Exemplo de campos extras se seu template tiver (opcionais):
            <input type="hidden" name="to_name" value="Vinicius" />
            <input type="hidden" name="subject" value="Contato via portfólio" />
            */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] cursor-pointer
                ${loading ? "opacity-70 pointer-events-none" : ""}`}
            >
              <span className={`${loading ? "opacity-0" : "opacity-100"} transition`}>
                Enviar Mensagem
              </span>

              {/* Loader simples */}
              {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                </span>
              )}
            </button>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};
