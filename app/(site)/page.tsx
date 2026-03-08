"use client";
import {
  Sprout,
  X,
  Wheat,
  Truck,
  CirclePile,
  CornerRightDown,
  ArrowUpRight,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import banner from "../../public/team/bg.png";

/* Cards */
import card2Icon from "../../public/icons/pin-svgrepo-com.svg";
import card1Background from "../../public/icons/flat-design-circular-economy-infographic-template.png";
import card2Background from "../../public/icons/card2background.png";
import card3Background from "../../public/icons/flat-design-circular-economy-infographic-template.png";
import card1Icon from "../../public/icons/recycle.svg";
import card3Icon from "../../public/icons/leaf-svgrepo-com.svg";
/* Logos */
import logo1 from "../../public/logos/Donaulandkompost.svg";
import logo2 from "../../public/logos/AWS.svg";
import logo3 from "../../public/logos/Smartup.png";
import logo4 from "../../public/logos/1-Egger.png";
import logo5 from "../../public/logos/Acent.png";
import logo6 from "../../public/logos/6-WU.png";
import logo7 from "../../public/logos/7-FH-WRN.png";
import logo8 from "../../public/logos/Avenue.png";
import logo9 from "../../public/logos/9-DC.png";

import EmailCapture from "@/components/common/EmailCapture";
import { useState, useRef } from "react";
import { incrementClick } from "../actions";

// GSAP Imports
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Step = {
  icon: StaticImageData;
  title: string;
  desc: string;
};
type Feature = {
  icon: React.ElementType;
  title: string;
  desc: string;
};
type Cards = {
  icon: StaticImageData;
  id: string;
  title: string;
  desc: string;
  more: string;
  background: StaticImageData;
};

const cards: Cards[] = [
  {
    id: "1",
    icon: card1Icon,
    background: card1Background,
    title: "KREISLAUFWIRTSCHAFT & NACHHALTIGKEIT",
    desc: "Wir verwandeln Nebenprodukten in Premium-Pflanzennahrung.",
    more: "Jeder Sack BrewCycle-Dünger holt das Beste aus Brauerei- Nebenprodukten heraus. Unser Kreislaufsystem führt Treber und Hopfen regionaler Brauereien einer neuen Bestimmung zu: Als natürlicher, nährstoffreicher Dünger für gesundes Gedeihen im Garten. Nachhaltigkeit einfach gemacht.",
  },
  {
    id: "2",
    icon: card2Icon,
    background: card2Background,
    title: "REGIONAL AUS ÖSTERREICH",
    desc: "100% heimische Rohstoffe für höchste Qualität",
    more: "Durch die exklusive Zusammenarbeit mit österreichischen Brauereien schaffen wir Mehrwert direkt vor Ort. So leisten wir einen wertvollen Beitrag zur Stärkung der heimischen Wirtschaft und unserer Gemeinschaft.",
  },
  {
    id: "3",
    background: card3Background,
    icon: card3Icon,
    title: "PflANZENBASIERT & VEGAN",
    desc: "100% heimische Rohstoffe für höchste Qualität",
    more: "Im Gegensatz zu vielen Düngern, die tierische Inhaltsstoffe enthalten, ist Brewcycle vollständig pflanzenbasiert. Die Rezeptur vereint verschiedene Nebenprodukte wie landwirtschaftliches Stroh und Melasse aus der Zuckerherstellung zu einem kraftvollen Mix. So entsteht ein nachhaltiges Kreislauf-Produkt aus unterschiedlichen Industrien, ideal für ökologisches und veganes Gärtnern",
  },
];

const features: Feature[] = [
  {
    icon: Wheat,
    title: "URSPRUNG ",
    desc: "Die Geschichte beginnt bei lokalen Brauereien und landwirtschaftlichen Partnern, bei denen wertvolle Nebenprodukte entstehen",
  },
  {
    icon: Truck,
    title: "SAMMLUNG",
    desc: "Alle Zutaten werden dann direkt vor Ort gesammelt und für die Weiterverarbeitung vorbereitet",
  },
  {
    icon: CirclePile,
    title: "NATÜRLICHE AUFBEREITUNG",
    desc: "Auf ganz natürlichem Weg werden diese Schätze der Natur zu einem nährstoffreichen Mix für den Garten verbunden.",
  },
  {
    icon: Sprout,
    title: "WACHSTUM",
    desc: "Der fertige Dünger lässt Pflanzen gesund gedeihen. So findet alles seinen Weg zurück zur Erde und der Kreis der Natur schließt sich.",
  },
];

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Hero Animation
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.1,
        },
      );
      tl.fromTo(
        ".hero-image",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6",
      );

      // Promise Cards
      gsap.fromTo(
        ".promise-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".promise-section",
            start: "top 80%",
          },
        },
      );

      // Process Steps
      gsap.fromTo(
        ".process-step",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 75%",
          },
        },
      );

      // Partners section entrance
      gsap.fromTo(
        ".partner-logo",
        { scale: 0.8, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".partners-section",
            start: "top 85%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="bg-[#F8F2E8] text-black font-sans selection:bg-[#3d571c] selection:text-white"
    >
      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col xl:flex-row py-12 md:py-24 px-6 md:px-12 xl:px-24 mx-auto max-w-[1400px] justify-between items-center min-h-[85vh] gap-12 xl:gap-0">
        <div className="text-left flex flex-col xl:basis-1/2 w-full mt-10 xl:mt-0">
          <div className="hero-anim">
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-[#3d571c] font-semibold tracking-tight font-silly leading-[1.1]">
              VON DER BRAUEREI ZUM BLÜHENDEN
            </h1>
          </div>

          <div className="hero-anim mt-8 max-w-xl">
            <p className="text-lg md:text-xl font-sans text-black/70 leading-relaxed font-medium">
              Premium Bio-Dünger aus Brauerei- Nebenprodukten. Gib deinem Garten
              die Nährstoffe, die er braucht, und reduziere gleichzeitig Abfall.
            </p>
            <p className="mt-4 text-sm md:text-base tracking-[0.2em] text-[#B75922] font-semibold uppercase">
              NACHHALTIGE & NATÜRLICHE PFLANZENERNÄHRUNG.
            </p>
          </div>

          <div className="hero-anim flex flex-wrap gap-4 mt-10">
            <Button
              asChild
              onClick={() => void incrementClick("buy-now")}
              className="shadow-xl shadow-[#FD8602]/20 bg-[#3d571c] text-white hover:bg-[#2c4014] transition-all duration-300 hover:scale-105 hover:shadow-2xl px-8 py-6 text-lg "
            >
              <Link href="/survey">Jetzt kaufen</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="flex border-none backdrop-blur-sm items-center justify-center  transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white px-8 py-6 text-lg  gap-2 text-[#3d571c]"
            >
              <Link href="/">
                Mehr erfahren
                <CornerRightDown className="w-4 h-4 ml-1 opacity-70" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="hero-image relative flex flex-col xl:basis-1/2 items-center justify-center w-full max-w-[600px] xl:max-w-none">
          <div className="relative w-full aspect-square max-w-[550px]">
            <Image
              src={banner}
              alt="BrewCycle Bio-Dünger"
              fill
              priority
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover drop-shadow-2xl hover:scale-[1.03] transition-transform duration-700 ease-out z-10"
            />
          </div>
          <div className="flex  flex-wrap gap-3 mt-12 mb-4">
            <Badge className="bg-[#B75922]/20 border-[#B75922] mb-4 text-[#B75922]  px-2 py-1.5  font-medium  hover:bg-[#CDB38E]/30 transition-colors uppercase tracking-[0.2em] rounded-full">
              100% Bio
            </Badge>
            <Badge className="bg-[#B75922]/20 border-[#B75922] mb-4 text-[#B75922]  px-2 py-1.5  font-medium  hover:bg-[#CDB38E]/30 transition-colors uppercase tracking-[0.2em] rounded-full">
              Zero Waste
            </Badge>
            <Badge className="bg-[#B75922]/20 border-[#B75922] mb-4 text-[#B75922]  px-2 py-1.5  font-medium  hover:bg-[#CDB38E]/30 transition-colors uppercase tracking-[0.2em] rounded-full">
              Made in Austria
            </Badge>
          </div>
        </div>
      </section>

      {/* PROMISE SECTION */}
      <section className="promise-section relative mx-auto py-24 px-6 md:px-12 max-w-[1400px] z-10">
        <div className="items-center justify-center text-center flex flex-col mb-16">
          <Badge className="mb-2 bg-[#3d571c]/10 text-[#3d571c] border-[#3d571c]/20  px-2 py-1.5  font-medium hover:bg-[#1F6F50]/15 transition-colors uppercase tracking-[0.2em] rounded-full">
            Werte
          </Badge>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight font-silly text-[#3d571c] mb-6 max-w-3xl">
            UNSER VERSPRECHEN AN DIE NATUR
          </h2>
          <div className="text-center font-sans text-black/60 text-lg md:text-lg max-w-2xl leading-relaxed">
            <p className="mb-2">
              Bei uns steht der Kreislauf der Natur im Mittelpunkt. Alles, was
              die Erde hervorbringt, soll zu ihr zurückkehren.
            </p>
            <p>
              Wir entwickeln Produkte, die den Garten stärken und die Umwelt
              schützen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {cards.map((c) => {
            const isOpen = activeId === c.id;

            return (
              <div
                key={c.id}
                className="promise-card group relative w-full h-[350px] flex flex-col rounded-2xl bg-white shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-[#3d571c]/10 transition-all duration-500 ease-out border border-white/50 overflow-hidden"
              >
                {/* Overlay Hover Effect BG */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8F2E8]/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

                {/* Learn More Overlay (When Open) */}
                <div
                  className={[
                    "absolute inset-0 z-30 flex flex-col rounded-[2rem] p-8 border border-white/20 bg-white/95 backdrop-blur-xl",
                    "transition-all duration-500 ease-out shadow-inner",
                    isOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none",
                  ].join(" ")}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full bg-black/5 hover:bg-black/10 text-black/70 hover:text-black transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveId(null);
                    }}
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  <Image
                    src={c.icon}
                    alt={c.title}
                    width={150}
                    height={150}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] grayscale pointer-events-none filter drop-shadow-md mix-blend-multiply"
                  />

                  <div className="relative flex flex-col h-full z-10 mt-6 overflow-y-auto pr-2">
                    <h3 className="font-silly text-xl text-[#3d571c] mb-4">
                      {c.title}
                    </h3>
                    <p
                      className={[
                        "text-base font-sans leading-relaxed text-black/80",
                        "transition-all text-start duration-500 delay-100",
                        isOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4",
                      ].join(" ")}
                    >
                      {c.more}
                    </p>
                  </div>
                </div>

                {/* Card Content (Default State) */}
                <div
                  className={[
                    "relative flex flex-col h-full z-10 p-6",
                    "transition-all duration-500 ease-out",
                    isOpen
                      ? "opacity-0 scale-95 blur-sm"
                      : "opacity-100 scale-100",
                  ].join(" ")}
                >
                  <div className="flex bg-[#F8F2E8] w-16 h-16 rounded-2xl items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#3d571c]/10">
                    <Image
                      src={c.icon}
                      alt={`${c.title} icon`}
                      width={32}
                      height={32}
                      className="opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-[#3d571c] font-silly text-2xl text-start font-bold tracking-tight font-sans leading-snug mb-4 group-hover:text-[#2c4014] transition-colors">
                      {c.title}
                    </h2>
                    <p className="text-base z-10 font-sans text-start text-black/60 leading-relaxed font-medium">
                      {c.desc}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={() => {
                        setActiveId(c.id);
                        void incrementClick(`card-${c.id}`);
                      }}
                      variant="ghost"
                      className="group/btn flex items-center gap-2 border-b-2 border-transparent hover:border-[#3d571c] rounded-none p-0 font-sans z-20 hover:bg-transparent text-[#B75922] hover:text-[#3d571c] transition-all font-semibold"
                    >
                      Mehr erfahren
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="relative z-10 process-section">
        <div className="bg-[#3d571c] text-white my-12 rounded-2xl mx-4 md:mx-12 xl:mx-24 overflow-hidden shadow-2xl relative">
          <div className="flex flex-col xl:flex-row relative z-10 w-full">
            <div className="w-full relative xl:basis-7/12 p-8 md:p-16 lg:p-20">
              <div className="flex flex-col h-full justify-center">
                <Badge className="bg-white/10 text-white border-white/20  px-2 py-1.5  font-medium hover:bg-[#1F6F50]/15 transition-colors uppercase tracking-[0.2em] rounded-full">
                  Der Prozess
                </Badge>

                <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-tight font-silly tracking-tight mb-8 max-w-2xl">
                  VOM BRAU ZUR BLÜTE
                </h2>

                <p className="max-w-xl font-sans text-white/80 text-lg md:text-xl leading-relaxed mb-12 font-light">
                  Unser einfacher Vier-Schritte-Prozess schafft einen
                  nachhaltigen Kreislauf, der allen zugute kommt.
                </p>

                <div className="space-y-4 md:space-y-6">
                  {features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={f.title}
                        className="process-step flex relative items-start p-6 gap-6  rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group"
                      >
                        <span className=" absolute left-1/2 top-1/2 text-[#FDC54B] -translate-y-1/2 -translate-x-1/2 text-8xl font-bold opacity-15 font-sans ">
                          0{i + 1}
                        </span>
                        <div className="flex gap-1 shrink-0 w-14 h-14 items-center justify-center rounded-2xl bg-white/10 shadow-inner group-hover:scale-110 group-hover:bg-[#B75922] transition-all duration-500">
                          <Icon
                            strokeWidth={1.5}
                            className="h-7 w-7 text-[#FDC54B] group-hover:text-white transition-colors duration-500"
                          />
                        </div>

                        <div className="flex-1 mt-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-serif text-white font-silly text-2xl tracking-wide">
                              {f.title}
                            </h3>
                          </div>
                          <p className="text-base md:text-lg leading-relaxed text-white/70 font-sans font-light">
                            {f.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex w-full xl:basis-5/12 justify-center items-center p-8 md:p-16 lg:p-20 bg-white  ">
              <div className="w-full max-w-md">
                <EmailCapture />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="partners-section flex w-full flex-col py-24 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
        <div className="text-center flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-silly text-[#3d571c] mb-6">
            UNSERE PARTNER
          </h2>

          <Badge className="bg-[#CDB38E]/20 border-[#CDB38E] mb-4 text-[#ab8c50]  px-2 py-1.5  font-medium  hover:bg-[#CDB38E]/30 transition-colors uppercase tracking-[0.2em] rounded-full">
            Der Prozess
          </Badge>

          <div className="w-16 h-1 bg-[#3d571c]/20 rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-20 max-w-5xl mx-auto">
          {[
            { src: logo4, link: "https://egger-bier.at" },
            { src: logo2, link: "https://www.aws.at" },
            { src: logo5, link: "https://accent.at/" },
            { src: logo3, link: "https://www.stp-smartup.at/" },
            { src: logo1, link: "https://www.donaulandkompost.at/" },
            { src: logo6, link: "https://www.wu.ac.at/" },
            { src: logo7, link: "https://www.fhwn.ac.at/" },
            { src: logo8, link: "https://entrepreneurshipavenue.com/" },
            { src: logo9, link: "https://danubecup.eu/" },
          ].map((partner, index) => (
            <Link
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-logo group relative flex items-center justify-center p-4 hover:scale-110 transition-transform duration-500 will-change-transform"
            >
              <Image
                src={partner.src}
                alt={`Partner ${index + 1}`}
                width={120}
                height={120}
                className="object-contain w-auto h-12 md:h-16 lg:h-20 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 mix-blend-multiply"
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
