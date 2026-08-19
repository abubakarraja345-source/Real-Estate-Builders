"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, SITE_LOCATION } from "@/lib/constants/site";

function whatsappHref() {
  const digits = CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative -mt-20 flex min-h-screen items-center overflow-hidden bg-navy">
      {/* Abstract architectural backdrop — an original skyline motif, not a
          photograph, since no real property/site photography exists yet. */}
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-light" />
        <svg
          className="absolute inset-x-0 bottom-0 h-[70%] w-full opacity-[0.18]"
          viewBox="0 0 1440 700"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
        >
          <rect x="80" y="260" width="140" height="440" fill="#C8A96B" />
          <rect x="260" y="140" width="120" height="560" fill="#F7F4EE" />
          <rect x="420" y="320" width="160" height="380" fill="#C8A96B" />
          <rect x="640" y="80" width="130" height="620" fill="#F7F4EE" />
          <rect x="820" y="240" width="150" height="460" fill="#C8A96B" />
          <rect x="1020" y="360" width="120" height="340" fill="#F7F4EE" />
          <rect x="1180" y="180" width="160" height="520" fill="#C8A96B" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={280 + i * 8} y={170 + (i % 3) * 40} width="3" height="10" fill="#0B1F33" />
          ))}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/70" />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-20 lg:px-10">
        <div className="max-w-2xl">
          <motion.span
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-champagne uppercase"
          >
            <span className="h-px w-10 bg-champagne" />
            Real Estate &amp; Construction
          </motion.span>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-display text-5xl leading-[1.08] font-semibold text-ivory text-balance sm:text-6xl lg:text-[4.2rem]"
          >
            Find a Place Worth Calling Home.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/75"
          >
            Rayyan Real Estate &amp; Builders helps you buy, sell, rent, and build with
            confidence in {SITE_LOCATION.area}, {SITE_LOCATION.city} — backed by local
            knowledge and straightforward advice at every step.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/properties" tone="on-navy" variant="primary">
              Explore Properties
            </Button>
            <Button href="/contact" tone="on-navy" variant="outline">
              Talk to Us
            </Button>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ivory/70 underline decoration-champagne/60 decoration-2 underline-offset-4 transition-colors hover:text-champagne"
            >
              Message us on WhatsApp
            </a>
          </motion.div>
        </div>
      </motion.div>

      {!reduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-ivory/30 p-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
