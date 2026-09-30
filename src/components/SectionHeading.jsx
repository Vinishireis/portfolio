export const SectionHeading = ({ eyebrow, title, subtitle, dark = false }) => (
  <div className="mb-14 text-center md:mb-20" data-reveal="up">
    {eyebrow && (
      <p
        className={`mb-3 font-mono text-xs uppercase tracking-[0.3em] ${
          dark ? "text-surface/50" : "text-accent-400/70"
        }`}
      >
        {eyebrow}
      </p>
    )}
    <h2
      className={`display-heading ${dark ? "text-surface" : "text-gradient"}`}
      style={{ fontSize: "clamp(2.75rem, 10vw, 9rem)" }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className={`mx-auto mt-5 max-w-2xl font-light ${
          dark ? "text-surface/60" : "text-gray-400"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);
