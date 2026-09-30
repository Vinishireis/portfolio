import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeading } from "../SectionHeading";
import { TechButton } from "../ui/TechButton";
import { profile } from "../../data/profile";

const contactLinks = [
  {
    icon: FiMail,
    label: "E-mail",
    value: profile.links.email,
    href: `mailto:${profile.links.email}`,
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "in/vinicius-nishimura-reis",
    href: profile.links.linkedin,
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "@Vinishireis",
    href: profile.links.github,
  },
];

export const Contact = () => {
  const scope = useReveal();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      // Sem EmailJS configurado, cai no cliente de e-mail do visitante
      window.location.href = `mailto:${profile.links.email}?subject=${encodeURIComponent(`Contato via portfólio: ${formData.name}`)}&body=${encodeURIComponent(formData.message)}`;
      return;
    }

    try {
      setLoading(true);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section ref={scope} id="contact" className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos conversar?"
          subtitle="Topo conversar sobre oportunidades, projetos e parcerias. Me chama em qualquer canal ou manda uma mensagem pelo formulário."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <div data-reveal="left" className="space-y-4 lg:col-span-2">
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="card-glass group flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5 hover:border-accent-500/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-400 transition-colors group-hover:bg-accent-500/20">
                  <Icon size={20} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-gray-500">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <form
            data-reveal="right"
            className="space-y-5 lg:col-span-3"
            onSubmit={handleSubmit}
          >
            {status && (
              <div
                role="status"
                className={`rounded-lg border p-4 text-center text-sm font-medium ${
                  status === "success"
                    ? "border-green-500/30 bg-green-500/15 text-green-400"
                    : "border-red-500/30 bg-red-500/15 text-red-400"
                }`}
              >
                {status === "success"
                  ? "✅ Mensagem enviada com sucesso!"
                  : "❌ Ocorreu um erro ao enviar. Tente novamente."}
              </div>
            )}

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              placeholder="Seu nome"
              aria-label="Seu nome"
              className="w-full rounded-lg border border-line bg-white/5 px-4 py-3 text-white transition-colors focus:border-accent-500 focus:bg-accent-500/5 focus:outline-none"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              placeholder="seuemail@exemplo.com"
              aria-label="Seu e-mail"
              className="w-full rounded-lg border border-line bg-white/5 px-4 py-3 text-white transition-colors focus:border-accent-500 focus:bg-accent-500/5 focus:outline-none"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              placeholder="Sua mensagem..."
              aria-label="Sua mensagem"
              className="w-full rounded-lg border border-line bg-white/5 px-4 py-3 text-white transition-colors focus:border-accent-500 focus:bg-accent-500/5 focus:outline-none"
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            <TechButton
              type="submit"
              variant="primary"
              size="lg"
              icon={FiSend}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
            </TechButton>
          </form>
        </div>
      </div>
    </section>
  );
};
