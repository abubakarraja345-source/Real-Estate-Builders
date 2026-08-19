import Image from "next/image";
import Link from "next/link";
import { SITE_BRAND } from "@/lib/constants/site";

// Placeholder brand mark (a generic stock template) — swap
// public/images/logo.png for the real Rayyan logo when it's ready, then
// regenerate the derived crops in public/images/ the same way: trim
// whitespace and the wordmark text to isolate the icon (logo-emblem.png),
// then key the white background out to transparency and invert the
// remaining colors (logo-emblem-inverted.png).
export function SiteLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Image
        src="/images/logo-emblem-inverted.png"
        alt=""
        width={44}
        height={40}
        className="h-9 w-auto"
        priority
      />
      <span>{SITE_BRAND}</span>
    </Link>
  );
}
