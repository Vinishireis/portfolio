import {
  SiDotnet,
  SiExpo,
  SiFigma,
  SiFlutter,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { ToolDock, ToolDockTile } from "./ui/techstack";

/** Logo da marca (Simple Icons) sobre um ícone estilo app. */
const tile = (label, Icon, bg, fg, fit = "54%") => ({
  label,
  icon: (
    <ToolDockTile style={{ background: bg }}>
      <Icon aria-hidden="true" style={{ color: fg, width: fit, height: fit }} />
    </ToolDockTile>
  ),
});

/* Ícones claros e escuros alternados ao longo da fileira */
const STACK = [
  tile("React", SiReact, "#20232a", "#61dafb", "60%"),
  tile("Next.js", SiNextdotjs, "#ffffff", "#000000"),
  tile("Node.js", SiNodedotjs, "#1b1f1a", "#5fa04e"),
  tile("TypeScript", SiTypescript, "#ffffff", "#3178c6", "58%"),
  tile("JavaScript", SiJavascript, "#111111", "#f7df1e", "58%"),
  tile("Python", SiPython, "#ffffff", "#3776ab"),
  tile("Supabase", SiSupabase, "#171717", "#3fcf8e"),
  tile("Tailwind CSS", SiTailwindcss, "#ffffff", "#06b6d4", "60%"),
  tile("React Native · Expo", SiExpo, "#000000", "#ffffff"),
  tile("Flutter", SiFlutter, "#ffffff", "#02569b", "50%"),
  tile("C# · .NET", SiDotnet, "#512bd4", "#ffffff", "62%"),
  tile("Figma", SiFigma, "#ffffff", "#f24e1e", "46%"),
];

export const TechStack = () => (
  <div className="flex w-full flex-col items-center">
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-400/70">
      {"// stack do dia a dia"}
    </p>
    {/* O dock reserva espaço acima para o tooltip, que vira o respiro sob o título */}
    <ToolDock items={STACK} size={60} label="Stack do dia a dia" />
  </div>
);
