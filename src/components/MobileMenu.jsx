import { useEffect } from "react";
import { FiGithub, FiLinkedin, FiX } from "react-icons/fi";
import { navLinks } from "../data/nav";
import { profile } from "../data/profile";
import { TechButton } from "./ui/TechButton";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
        menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <TechButton
        size="icon"
        icon={FiX}
        aria-label="Fechar menu"
        onClick={() => setMenuOpen(false)}
        className="absolute right-6 top-3"
      />

      <nav className="flex flex-col items-center gap-5">
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
            className={`display-heading text-gradient text-3xl transition-all duration-300 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="mt-10 flex items-center gap-4">
        <TechButton
          href={profile.links.github}
          size="icon"
          icon={FiGithub}
          aria-label="GitHub"
        />
        <TechButton
          href={profile.links.linkedin}
          size="icon"
          icon={FiLinkedin}
          aria-label="LinkedIn"
        />
      </div>
    </div>
  );
};
