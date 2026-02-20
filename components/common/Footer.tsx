import React from "react";
import { Sprout, Linkedin, Instagram, Facebook } from "lucide-react";
import Image from "next/image";

type LinkItem = { label: string; href: string };

type FooterProps = {
  variant?: "braugrun" | "both";
  year?: number;
};

const beansaverLinksLeft: LinkItem[] = [
  { label: "UNSERE PRODUKTE", href: "#" },
  { label: "KREISLAUFWIRTSCHAFT", href: "#" },
  { label: "ÜBER UNS", href: "#" },
];

const beansaverLinksRight: LinkItem[] = [
  { label: "UNSERE PARTNER", href: "#" },
  { label: "WERDE HÄNDLER", href: "#" },
  { label: "KONTAKT", href: "#" },
];

function Badge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}): React.ReactNode {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
      <span className="opacity-90">{icon}</span>
      {text}
    </span>
  );
}

function BrandMark({
  name,
  sub,
}: {
  name: string;
  sub?: string;
}): React.ReactNode {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
        <Sprout className="h-4 w-4 text-white/90" />
      </div>
      <div>
        <div className="font-serif text-lg text-white">{name}</div>
        {sub ? <div className="text-xs text-white/70">{sub}</div> : null}
      </div>
    </div>
  );
}

function BeanSaverFooter({ year }: { year: number }): React.ReactNode {
  return (
    <footer className="w-full bg-[#0d1220]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Logo */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              {/* Simple logo placeholder */}
              <Image
                width={150}
                height={150}
                alt="Picture of the author"
                src="./logos/LogoBrew.svg"
              />
            </div>
          </div>

          {/* Links left */}
          <div className="md:col-span-3">
            <ul className="space-y-3 text-xs uppercase tracking-wider text-white/70">
              {beansaverLinksLeft.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links right */}
          <div className="md:col-span-3">
            <ul className="space-y-3 text-xs uppercase tracking-wider text-white/70">
              {beansaverLinksRight.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2 md:text-right">
            <div className="text-xs uppercase tracking-wider text-white/70">
              Folge uns auf:
            </div>
            <div className="mt-4 flex items-center gap-3 md:justify-end">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0b5ea8] text-white shadow-sm transition hover:brightness-95"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500 to-amber-400 text-white shadow-sm transition hover:brightness-95"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition hover:brightness-95"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <div>Alle Rechte vorbehalten © {year}</div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-center">
              <a href="#" className="hover:text-white">
                Datenschutz
              </a>
              <span className="opacity-40">|</span>
              <a href="#" className="hover:text-white">
                Impressum
              </a>
            </div>
            <div className="sm:text-right">
              Erstellt von:{" "}
              <span className="text-white/70">WebseitenDesigner.at</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer({
  variant = "both",
  year = new Date().getFullYear(),
}: FooterProps): React.ReactNode {
  return (
    <>
      <BeanSaverFooter year={year} />
    </>
  );
}
