"use client";
import {
  Leaf,
  Sprout,
  X,
  ChevronsDown,
  Wheat,
  Truck,
  CirclePile,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import banner from "../../public/team/bg.png";
import farm from "../../public/team/farm.png";
/* Steps */
import step1Icon from "../../public/icons/grain-veg-svgrepo-com.svg";
import step2Icon from "../../public/icons/wheelbarrow-construction-svgrepo-com.svg";
import step3Icon from "../../public/icons/microorganism-svgrepo-com.svg";
import step4Icon from "../../public/icons/sprout-svgrepo-com (2).svg";
/* Cards */
import card2Icon from "../../public/icons/circle-number-2-svgrepo-com.svg";
import card1Background from "../../public/icons/flat-design-circular-economy-infographic-template.png";
import card2Background from "../../public/icons/card2background.png";
import card3Background from "../../public/icons/flat-design-circular-economy-infographic-template.png";
import card1Icon from "../../public/icons/circle-number-1-svgrepo-com.svg";
import card3Icon from "../../public/icons/circle-number-3-svgrepo-com.svg";
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
import { useState } from "react";
import { incrementClick } from "../../actions";
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
const steps: Step[] = [
  {
    icon: step1Icon,
    title: "Ursprung ",
    desc: "Die Geschichte beginnt bei lokalen Brauereien und landwirtschaftlichen Partnern, bei denen wertvolle Nebenprodukte entstehen",
  },
  {
    icon: step2Icon,
    title: "Sammlung",
    desc: "Alle Zutaten werden dann direkt vor Ort gesammelt und für die Weiterverarbeitung vorbereitet",
  },
  {
    icon: step3Icon,
    title: "Natürliche Aufbereitung",
    desc: "Auf ganz natürlichem Weg werden diese Schätze der Natur zu einem nährstoffreichen Mix für den Garten verbunden.",
  },
  {
    icon: step4Icon,
    title: "Wachstum",
    desc: "Der fertige Dünger lässt Pflanzen gesund gedeihen. So findet alles seinen Weg zurück zur Erde und der Kreis der Natur schließt sich.",
  },
];

export default function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <main className="bg-[#F8F2E8]">
      <section className="bg-gradient-to-b from-[#ddc5a9] to-[#F8F2E8] relative flex flex-col sm:flex-row   justify-center min-h-svh items-center  w-full justify-center overflow-hidden">
        <div className=" z-20  px-10  text-center sm:text-left  sm:justify-start flex flex-col  ">
          <h1 className="text-6xl mt-10  text-[#9BAD21] font-semibold tracking-tight font-silly  sm:text-7xl">
            VON DER BRAUEREI ZUM <br />{" "}
            <span className="text-[#3d571c]"> BLÜHENDEN</span>
          </h1>

          <Card className=" sm:my-5 w-full relative bg-transparent backdrop-blur-[1px] border-none shadow-none mx-auto  ">
            <CardContent>
              <div className=" items-center justify-evenly  relative ">
                <p className="mt-5 max-w-xl  text-base font-sans  text-[#3d571c] leading-relaxed  sm:text-lg">
                  Premium Bio-Dünger aus Brauerei- Nebenprodukten. Gib deinem
                  Garten die Nährstoffe, die er braucht, und reduziere
                  gleichzeitig Abfall.
                </p>
                <p className="mt-2 text-black/70 ">
                  NACHHALTIGE & NATÜRLICHE PFLANZENERNÄHRUNG.
                </p>

                {/* CTA */}
                <div className="mt-8 flex  font-sans items-center gap-5 flex-col xl:flex-row lg:items-center">
                  <Button
                    asChild
                    className="h-11 rounded-xl  bg-[#3d571c] px-6 text-white hover:bg-[#3d571c]/90 "
                  >
                    <a href="/survey">Jetzt kaufen</a>
                  </Button>
                  <div className=" flex  gap-x-2 items-center justify-center  text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] text-[#6B6B6B] ">
                    <div className="w-fit px-2 bg-[#F8F2E8] rounded-lg  items-center gap-2">
                      <p>100% Bio</p>
                    </div>
                    <div className="w-fit px-2 bg-[#F8F2E8]  rounded-lg  items-center gap-2">
                      Made in Austria
                    </div>
                    <div className="w-fit px-2 bg-[#F8F2E8]  rounded-lg  items-center gap-2">
                      <p className="">Zero Waste</p>
                    </div>
                  </div>
                </div>

                {/* Badges */}
              </div>

              {/* Right */}
            </CardContent>
          </Card>
          <Button
            asChild
            variant="outline"
            className="mx-auto bg-inherit border-none w-fit text-[#9BAD21] shadow-none text-xl font-silly tracking-extrawider  z-20 hover:bg-white"
          >
            <a href="/learn-more">
              Mehr erfahren
              <ChevronsDown className="h-4 w-4 text-[#9BAD21]  " />
            </a>
          </Button>
        </div>

        <div className="">
          <Image
            src={banner}
            alt="Leaf"
            width={550}
            height={550}
            priority
            className="object-cover "
          />
        </div>
      </section>

      <section className="mx-auto py-20 bg-[#F8F2E8] bg-cover px-6   ">
        <div className=" items-center relative justify-center h-full  text-center flex flex-col">
          <h2 className="font-serif text-4xl  tracking-tight font-silly text-[#1f1f1f] sm:text-5xl">
            UNSER VERSPRECHEN AN DIE NATUR
          </h2>

          <div className="text-center font-sans text-[#6B6B6B] pb-10">
            Bei uns steht der Kreislauf der Natur im Mittelpunkt. Alles, was die
            Erde hervorbringt, soll zu ihr zurückkehren.
            <br />{" "}
            <p>
              Wir entwickeln Produkte, die den Garten stärken und die Umwelt
              schützen.
            </p>
          </div>
          <div className="flex flex-col  sm:flex-row gap-12 mb-20">
            {cards.map((c) => {
              const isOpen = activeId === c.id;

              return (
                <div
                  key={c.id}
                  className="
          relative w-full rounded-xl p-4 bg-white border border-[#E6E2D9] mb-5
          transition-transform duration-300 ease-out relative z-20 
          hover:-translate-y-0.5 
        "
                >
                  {/* Overlay Learn More*/}
                  <div
                    className={[
                      "absolute inset-0 z-20 rounded-xl border shadow-lg backdrop-blur-lg",
                      "transition-all duration-300 ease-out ",
                      isOpen
                        ? "opacity-100 scale-100 pointer-events-auto h-full"
                        : "opacity-0 scale-[0.65] pointer-events-none ",
                    ].join(" ")}
                  >
                    <div className="relative flex items-start justify-between p-4 gap-3">
                      <p
                        className={[
                          "text-sm text-muted-foreground",
                          "transition-all duration-300 ease-out delay-75",
                          isOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-1",
                        ].join(" ")}
                      >
                        {c.more}
                      </p>

                      <Button
                        variant="ghost"
                        className="h-8 absolute top-2 right-2"
                        onClick={() => setActiveId(null)}
                      >
                        <X />
                      </Button>
                    </div>
                  </div>

                  {/* Card content */}

                  <div
                    className={[
                      "flex flex-col justify-between relative w-full h-full items-start p-2 z-10",
                      "transition-all duration-300 ease-out ",
                      isOpen
                        ? "opacity-30 scale-[0.99]"
                        : "opacity-100 scale-100",
                    ].join(" ")}
                  >
                    <Image
                      src={c.icon}
                      alt={`${c.title} icon`}
                      width={40}
                      height={40}
                      className="absolute top-[-22px]  right-[-28px]"
                    />
                    <div className="  flex  rounded-md ">
                      <h2 className="text-[#3d571c] text-start font-bold tracking-tight font-sans">
                        {c.title}
                      </h2>
                    </div>

                    <p className="mt-2 text-sm z-10 font-sans text-start text-muted-foreground">
                      {c.desc}
                    </p>

                    <Button
                      onClick={() => {
                        setActiveId(c.id);
                        void incrementClick(`card-${c.id}`);
                      }}
                      variant="ghost"
                      className="mt-3 px-0 font-sans z-20"
                    >
                      Mehr erfahren
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center flex-col bg-[#F8F2E8] xl:flex-row ">
        <section className="w-full  relative  basis-1/3 ">
          <div className=" px-6 py-16 flex flex-col items-center">
            <div className="">
              <h2 className="font-serif text-black text-4xl leading-tight font-silly tracking-tight  sm:text-5xl">
                VOM BRAU ZUR BLÜTE
              </h2>

              <p className="mt-5 max-w-xl font-sans text-black/70 text-sm leading-6 ">
                Unser einfacher Vier-Schritte-Prozess schafft einen nachhaltigen
                Kreislauf , der allen zugute kommt
              </p>

              <div className="mt-10 space-y-4 ">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="flex items-start gap-4 rounded-2xl bg-white px-5 py-4"
                    >
                      <div className="flex p-2 items-center justify-center rounded-xl bg-white/10">
                        <Icon className="h-8 w-8 text-[#3d571c]" />
                      </div>

                      <div>
                        <h3 className="font-serif text-[#9BAD21]  font-silly text-lg ">
                          {f.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-black/70 font-sans ">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <div className=" flex  w-full xl:basis-1/3    ">
          <EmailCapture />
        </div>
      </div>
      <section className="flex w-full flex-col">
        <h2 className=" text-4xl xl:mx-auto  text-center xl:text-left py-10 tracking-tight font-silly text-[#1f1f1f] sm:text-5xl">
          UNSERE PARTNER
        </h2>
        <div className="grid-cols-2 sm:grid-cols-3 xl:grid-cols-9  gap-y-10 gap-x-10 xl:flex-row grid place-items-center flex w-full p-10">
          <Link href="https://egger-bier.at">
            <Image src={logo4} alt="something" width="180" height="180" />
          </Link>
          <Link href="https://www.aws.at">
            <Image src={logo2} alt="something" width="180" height="180" />
          </Link>
          <Link href="https://accent.at/">
            <Image src={logo5} alt="something" width="180" height="180" />
          </Link>
          <Link href="https://www.stp-smartup.at/">
            <Image src={logo3} alt="something" width="180" height="180" />
          </Link>
          <Link href="https://www.donaulandkompost.at/">
            <Image src={logo1} alt="something" width="180" height="180" />
          </Link>
          <Link href="https://www.wu.ac.at/">
            <Image src={logo6} alt="something" width="180" height="180" />
          </Link>
          <Link href="https://www.fhwn.ac.at/">
            <Image src={logo7} alt="something" width="180" height="180" />
          </Link>
          <Link href="https://entrepreneurshipavenue.com/">
            <Image src={logo8} alt="something" width="180" height="180" />
          </Link>
          <Link href="https://danubecup.eu/">
            <Image src={logo9} alt="something" width="180" height="180" />
          </Link>
        </div>
      </section>
    </main>
  );
}
