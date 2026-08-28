"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { MobileNav } from "@/components/layout/MobileNav";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/tecnologia", label: "Tecnología" },
  { href: "/franquicias", label: "Franquicias" },
  { href: "/sobre-nosotros", label: "Sobre Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const SCROLL_THRESHOLD = 80;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  const isHome = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col">
      {isHome && <AnnouncementBar />}
      <div
        className={cn(
          "w-full transition-[padding,background-color,box-shadow] duration-500 ease-out",
          scrolled ? "bg-bg/90 py-2 shadow-md shadow-black/5 backdrop-blur-md" : "bg-gradient-to-b from-black/10 to-transparent py-5",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link href="/" className="relative z-10 flex items-center" aria-label="Restauración Láser — Inicio">
            <motion.div
              className="relative"
              animate={{ height: scrolled ? 32 : 56, width: scrolled ? 56 : 170 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: scrolled ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image src="/logo/logo-full.png" alt="Restauración Láser" fill priority className="object-contain object-left" />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: scrolled ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image src="/logo/logo-shape.png" alt="Restauración Láser" fill className="object-contain object-left" />
              </motion.div>
            </motion.div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-sm text-sm font-semibold uppercase tracking-wide text-text/80 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                  pathname === link.href && "text-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
