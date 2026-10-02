/**
 * Botão padrão do site, estilo "dev tech" (estilos em index.css, .btn-tech).
 *
 * - variant: "primary" (prata sólido, CTA principal) | "outline" (padrão)
 *            | "ghost" (sem borda até o hover) | "link" (CTA inline em cards)
 * - size:    "sm" | "md" (padrão) | "lg" | "icon" (quadrado, só ícone:
 *            passe aria-label)
 * - icon:    componente de ícone (ex.: FiSend) exibido antes do texto
 * - prompt:  mostra o ">" e o cursor "_" (desligado no size="icon")
 *
 * Vira <a> quando recebe `href` (links http abrem em nova aba), <span> com
 * as="span" (dentro de um card já clicável) e <button type="button"> no resto.
 */
export const TechButton = ({
  as,
  href,
  type = "button",
  variant = "outline",
  size = "md",
  icon: Icon,
  prompt = true,
  className = "",
  children,
  ...props
}) => {
  const Tag = as ?? (href ? "a" : "button");
  const external = typeof href === "string" && href.startsWith("http");
  const showPrompt = prompt && size !== "icon";

  const tagProps =
    Tag === "a"
      ? { href, ...(external && { target: "_blank", rel: "noreferrer" }) }
      : Tag === "button"
        ? { type }
        : {};

  return (
    <Tag
      className={`btn-tech btn-tech-${variant} btn-tech-${size} ${className}`}
      {...tagProps}
      {...props}
    >
      {showPrompt && (
        <span aria-hidden="true" className="btn-tech-prompt">
          &gt;
        </span>
      )}
      {Icon && <Icon aria-hidden="true" className="shrink-0" />}
      {children}
      {showPrompt && (
        <span aria-hidden="true" className="btn-tech-caret">
          _
        </span>
      )}
    </Tag>
  );
};
