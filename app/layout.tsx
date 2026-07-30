import type { Metadata } from "next";
import { Exo_2, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { WhatsAppFloatingCTA } from "@/components/whatsapp/WhatsAppFloatingCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/structured-data";
import { SITE_URL } from "@/lib/site-config";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Restauración Láser — Limpieza láser industrial y franquicias en Costa Rica",
    template: "%s | Restauración Láser",
  },
  description:
    "Limpieza láser profesional para óxido, pintura, grafiti y más — y la oportunidad de franquicia de limpieza láser líder en Costa Rica y Latinoamérica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${exo2.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-brand focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
        >
          Saltar al contenido
        </a>
        <JsonLd data={organizationSchema()} />
        <SmoothScrollProvider>
          <Header />
          <div id="main-content" className="flex flex-1 flex-col">
            {children}
          </div>
          <Footer />
          <WhatsAppFloatingCTA />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
