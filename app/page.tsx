"use client";
import { Droplets, Leaf, Sprout, X, Recycle, MapPinCheck } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import banner from "../public/icons/sprout-svgrepo-com.svg";
import step1Icon from "../public/icons/grain-veg-svgrepo-com.svg";
import step2Icon from "../public/icons/wheelbarrow-construction-svgrepo-com.svg";
import step3Icon from "../public/icons/microorganism-svgrepo-com.svg";
import step4Icon from "../public/icons/sprout-svgrepo-com (2).svg";
import card2Icon from "../public/icons/austria-svgrepo-com.svg";
import card1Icon from "../public/icons/recycle-4-svgrepo-com.svg";
import card3Icon from "../public/icons/earth-svgrepo-com.svg";
import logo1 from "../public/logos/Donaulandkompost.svg";
import logo2 from "../public/logos/AWS.svg";
import logo3 from "../public/logos/Smartup.png";
import logo4 from "../public/logos/1-Egger.png";
import logo5 from "../public/logos/Acent.png";
import logo6 from "../public/logos/6-WU.png";
import logo7 from "../public/logos/7-FH-WRN.png";
import logo8 from "../public/logos/Avenue.png";
import logo9 from "../public/logos/9-DC.png";
import EmailCapture from "@/components/common/EmailCapture";
import { useState } from "react";
import { incrementClick } from "./actions";

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
};

const cards: Cards[] = [
  {
    id: "1",
    icon: card1Icon,
    title: "Kreislaufwirtschaft & Nachhaltigkeit",
    desc: "Wir verwandeln Nebenprodukten in Premium-Pflanzennahrung.",
    more: "Jeder Sack BrewCycle-Dünger holt das Beste aus Brauerei-Nebenprodukten heraus. Unser Kreislaufsystem führt Treber und Hopfen regionaler Brauereien einer neuen Bestimmung zu: Als natürlicher, nährstoffreicher Dünger für gesundes Gedeihen im Garten. Nachhaltigkeit einfach gemacht.",
  },
  {
    id: "2",
    icon: card2Icon,
    title: "Regional aus Osterreich",
    desc: "100% heimische Rohstoffe für höchste Qualität",
    more: "Durch die exklusive Zusammenarbeit mit österreichischen Brauereien schaffen wir Mehrwert direkt vor Ort. So leisten wir einen wertvollen Beitrag zur Stärkung der heimischen Wirtschaft und unserer Gemeinschaft.",
  },
  {
    id: "3",
    icon: card3Icon,
    title: "Pflanzenbasiert & Vegan",
    desc: "100% heimische Rohstoffe für höchste Qualität",
    more: "Im Gegensatz zu vielen Düngern, die tierische Inhaltsstoffe enthalten, ist Brewcycle vollständig pflanzenbasiert. Die Rezeptur vereint verschiedene Nebenprodukte wie landwirtschaftliches Stroh und Melasse aus der Zuckerherstellung zu einem kraftvollen Mix. So entsteht ein nachhaltiges Kreislauf-Produkt aus unterschiedlichen Industrien, ideal für ökologisches und veganes Gärtnern",
  },
];
const features: Feature[] = [
  {
    icon: Droplets,
    title: "Slow-Release Formula",
    desc: "Nutrients release gradually over weeks, feeding plants steadily without burning",
  },
  {
    icon: Sprout,
    title: "Rich in Nitrogen",
    desc: "Essential for lush, green growth and strong plant development",
  },
  {
    icon: Leaf,
    title: "Improves Soil Health",
    desc: "Organic matter enriches soil structure and promotes beneficial microbes",
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
    <main className="bg-white">
      <section className="relative w-full overflow-hidden">
        <div className="relative max-h-svh">
          <Card className=" sm:my-5  border-none shadow-none mx-auto max-w-6xl px-6 py-6 sm:py-10">
            <CardContent className="grid gap-10  sm:p-10 lg:grid-cols-2 lg:items-center">
              {/* Left */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h1 className="text-4xl font-semibold tracking-tight  sm:text-5xl">
                  Von der Brauerei zum blühenden
                </h1>

                <p className="mt-5 max-w-xl text-base leading-relaxed  sm:text-lg">
                  Premium Bio-Dünger aus Brauerei-Nebenprodukten. Gib deinem
                  Garten die Nährstoffe, die er braucht, und reduziere
                  gleichzeitig Abfall.
                </p>
                <p className="mt-2 ">
                  Nachhaltige & natürliche Pflanzenernährung.
                </p>

                {/* CTA */}
                <div className="mt-8 flex  items-center gap-3 flex-row lg:items-start">
                  <Button
                    asChild
                    className="h-11 rounded-xl bg-[#1A4314] px-6 text-white hover:bg-[#05472A]/90 "
                  >
                    <a href="/survey">Jetzt kaufen</a>
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    className="h-11 rounded-xl px-6 text-black hover:bg-white/10"
                  >
                    <a href="/learn-more">Mehr erfahren</a>
                  </Button>
                </div>

                {/* Badges */}
                <div className="mt-6 flex items-center justify-between w-full gap-x-2 text-[12px] text-[#6B6B6B] lg:justify-start">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-[#2F6B25]" />
                    100% Bio
                  </div>
                  <div className="flex  items-center gap-2">
                    <MapPinCheck className="h-4 w-4 text-[#2F6B25]" />
                    Made in Austria
                  </div>
                  <div className="flex  items-center gap-2">
                    <Recycle className="h-4 w-4 text-[#2F6B25]" />
                    Zero Waste
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <AspectRatio
                  ratio={4 / 5}
                  className="overflow-hidden rounded-3xl  "
                >
                  <Image
                    src={banner}
                    alt="Leaf"
                    fill
                    priority
                    className="object-contain"
                  />
                </AspectRatio>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto  px-6 w-screen h-full  bg-[#F4F1E8] ">
        <div className=" items-center justify-center flex flex-col">
          <div className="text-center">
            <h2 className="font-serif text-3xl pb-10 tracking-tight text-[#1f1f1f] sm:text-4xl">
              Unser Versprechen an die Natur
            </h2>
          </div>
          <div className="text-center text-[#6B6B6B] pb-10">
            Bei uns steht der Kreislauf der Natur im Mittelpunkt. Alles, was die
            Erde hervorbringt, soll zu ihr zurückkehren. Wir entwickeln
            Produkte, die den Garten stärken und die Umwelt schützen.
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            {cards.map((c) => {
              const isOpen = activeId === c.id;

              return (
                <div
                  key={c.id}
                  className="
          relative w-full rounded-xl p-4 bg-[#FAF8F2] border border-[#E6E2D9]
          transition-transform duration-300 ease-out
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
                        : "opacity-0 scale-[0.98] pointer-events-none ",
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
                      "flex flex-col justify-between h-full items-center",
                      "transition-all duration-300 ease-out",
                      isOpen
                        ? "opacity-30 scale-[0.99]"
                        : "opacity-100 scale-100",
                    ].join(" ")}
                  >
                    <Image
                      src={c.icon}
                      alt={`${c.title} icon`}
                      width={24}
                      height={24}
                    />
                    <h2 className="mt-3 text-base font-semibold">{c.title}</h2>
                    <p className="mt-2 text-sm text-center text-muted-foreground">
                      {c.desc}
                    </p>

                    <Button
                      onClick={() => {
                        setActiveId(c.id);
                        void incrementClick(`card-${c.id}`);
                      }}
                      variant="ghost"
                      className="mt-3 px-0"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="w-full bg-[#F4F1E8] ">
        <div className="mx-auto max-w-6xl px-6 py-16">
          
          <div className="text-center">
            <h2 className="font-serif pb-10 text-3xl tracking-tight text-[#1f1f1f] sm:text-4xl">
              Vom Brau zur Blüte
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[#7a7a7a]">
              Unser einfacher Vier-Schritte-Prozess schafft einen nachhaltigen
              Kreislauf , der allen zugute kommt
            </p>
          </div>

          {/* Steps */}
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className=" p-2 flex flex-col items-center justify-center bg-white/70 rounded-xl py-2"
                >
                  <Image
                    className=" inset-0"
                    src={s.icon}
                    alt={s.title}
                    width={36}
                    height={36}
                  />

                  <h3 className="font-serif text-base text-[#1f1f1f]">
                    {s.title}
                  </h3>

                  <p className=" mt-2  text-center text-sm text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="flex items-center flex-col bg-[#F4F1E8] xl:flex-row ">
        <section className="w-full bg-[#1A4314]  basis-2/3 xl:rounded-r-4xl ">
          <div className="mx-auto max-w-6xl px-6 py-16 flex flex-col items-center">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                Why Gardeners Choose <br className="hidden sm:block" />
                Brewcycle
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/70">
                Professional-grade nutrition for the hobby gardener who refuses
                to compromise on quality or ethics.
              </p>

              <div className="mt-10 space-y-4">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="flex items-start gap-4 rounded-2xl bg-white/10 px-5 py-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                        <Icon className="h-5 w-5 text-white/90" />
                      </div>

                      <div>
                        <h3 className="font-serif text-lg text-white">
                          {f.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-white/70">
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
        <div className="w-full xl:basis-1/2  ">
          <EmailCapture />
        </div>
      </div>
      <section>
        <div className="grid xl:mx-20 grid-cols-3 xl:grid-cols-9 place-items-center gap-5 p-10">
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
