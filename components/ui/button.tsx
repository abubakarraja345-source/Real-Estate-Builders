import Link from "next/link";

type Variant = "primary" | "outline" | "text";
type Tone = "on-ivory" | "on-navy";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne";

const styles: Record<Tone, Record<Variant, string>> = {
  "on-ivory": {
    primary: "bg-navy text-ivory hover:bg-navy-light",
    outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy/[0.04]",
    text: "px-0 py-0 text-navy underline decoration-champagne decoration-2 underline-offset-4 hover:text-champagne",
  },
  "on-navy": {
    primary: "bg-champagne text-navy hover:bg-champagne-light",
    outline: "border border-ivory/30 text-ivory hover:border-champagne hover:text-champagne",
    text: "px-0 py-0 text-ivory underline decoration-champagne decoration-2 underline-offset-4 hover:text-champagne",
  },
};

export function Button({
  href,
  variant = "primary",
  tone = "on-ivory",
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={`${base} ${styles[tone][variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
