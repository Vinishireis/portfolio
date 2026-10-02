import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "<VinishiReis />";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface text-gray-100">
      <div className="mb-6 font-mono text-3xl font-bold sm:text-4xl">
        {text}
        <span className="ml-1 animate-blink text-accent-400">|</span>
      </div>
      <div className="relative h-0.5 w-52 overflow-hidden rounded bg-slate-800">
        <div className="h-full w-2/5 animate-loading-bar bg-linear-to-r from-accent-500 to-cyan-glow" />
      </div>
    </div>
  );
};
