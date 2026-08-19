import { Manrope, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${manrope.variable} flex min-h-screen flex-col bg-ivory font-body text-site-ink`}>
      <SiteHeader />
      <div className="flex-1 pt-20">{children}</div>
      <SiteFooter />
    </div>
  );
}
