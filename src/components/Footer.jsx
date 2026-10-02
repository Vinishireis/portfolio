import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/profile";
import { TechButton } from "./ui/TechButton";

export const Footer = () => (
  <footer className="border-t border-line py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
      <p className="font-mono text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name} · Feito com React, Tailwind
        CSS e GSAP
      </p>
      <div className="flex items-center gap-3">
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
        <TechButton
          href={`mailto:${profile.links.email}`}
          size="icon"
          icon={FiMail}
          aria-label="E-mail"
        />
      </div>
    </div>
  </footer>
);
