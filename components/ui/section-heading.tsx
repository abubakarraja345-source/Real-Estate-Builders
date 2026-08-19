import { RevealItem } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "navy",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "navy" | "ivory";
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const titleColor = tone === "navy" ? "text-navy" : "text-ivory";
  const bodyColor = tone === "navy" ? "text-site-slate" : "text-ivory-dim";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <RevealItem>
          <span
            className={`flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase ${
              tone === "navy" ? "text-champagne" : "text-champagne-light"
            } ${align === "center" ? "justify-center" : ""}`}
          >
            <span className="h-px w-8 bg-champagne" aria-hidden="true" />
            {eyebrow}
          </span>
        </RevealItem>
      )}
      <RevealItem>
        <h2 className={`font-display text-3xl leading-[1.15] font-semibold text-balance sm:text-4xl ${titleColor}`}>
          {title}
        </h2>
      </RevealItem>
      {description && (
        <RevealItem>
          <p className={`text-base leading-relaxed sm:text-lg ${bodyColor}`}>{description}</p>
        </RevealItem>
      )}
    </div>
  );
}
