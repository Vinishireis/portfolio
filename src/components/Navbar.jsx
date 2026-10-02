import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMenu } from "react-icons/fi";
import { profile } from "../data/profile";
import { navLinks } from "../data/nav";
import { TechButton } from "./ui/TechButton";

export const Navbar = ({ setMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-surface/85 shadow-lg shadow-black/30 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <a
          href="#home"
          className="text-sm font-black uppercase tracking-tight text-mist"
        >
          Vinishi<span className="text-gradient">Reis</span>
          <span className="font-light text-gray-500">.dev</span>
        </a>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wider text-mist transition-opacity duration-200 hover:opacity-70 lg:text-sm"
            >
              {link.label}
            </a>
          ))}
          <span className="h-5 w-px bg-line" aria-hidden="true" />
          <div className="-mx-2 flex items-center gap-1">
            <TechButton
              href={profile.links.github}
              size="icon"
              variant="ghost"
              icon={FiGithub}
              aria-label="GitHub"
            />
            <TechButton
              href={profile.links.linkedin}
              size="icon"
              variant="ghost"
              icon={FiLinkedin}
              aria-label="LinkedIn"
            />
          </div>
        </div>

        <TechButton
          size="icon"
          icon={FiMenu}
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
          className="md:hidden"
        />
      </div>
    </nav>
  );
};
