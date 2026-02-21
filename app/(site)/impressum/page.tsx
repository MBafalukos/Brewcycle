// app/impressum/page.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#F8F2E8] font-sans py-16 sm:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex flex-col gap-3 mb-10">
          <Badge className="bg-[#1F6F50]/10 w-fit text-[#1F6F50] border-[#1F6F50]/20 px-4 py-1.5 text-sm font-medium hover:bg-[#1F6F50]/15 transition-colors uppercase tracking-[0.2em] rounded-full">
            Impressum
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-[#3d571c] sm:text-5xl">
            Rechtliche Hinweise
          </h1>
        </div>

        <Card className="border-0 bg-white/40 backdrop-blur-md shadow-xl shadow-black/5 ring-1 ring-black/5 rounded-[2.5rem]">
          <CardContent className="p-8 sm:p-12 space-y-8 text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1F6F50]">
                Für den Inhalt verantwortlich:
              </h2>
              <p className="text-foreground font-medium">
                Brewcycle GesbR; Filip Dvořáček & Angeliki Sitara
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1F6F50]">
                Anschrift:
              </h2>
              <p className="text-foreground font-medium">
                Sankt-Bartholomäus-Platz 3, 1170 Wien, Österreich
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1F6F50]">
                Kontakt:
              </h2>
              <div className="space-y-1">
                <p className="text-foreground font-medium">
                  Filip Dvořáček:{" "}
                  <a
                    href="mailto:filip@brewcycle.at"
                    className="hover:text-[#1F6F50] transition-colors"
                  >
                    filip@brewcycle.at
                  </a>
                </p>
                <p className="text-foreground font-medium">
                  Angeliki Sitara:{" "}
                  <a
                    href="mailto:angeliki@brewcycle.at"
                    className="hover:text-[#1F6F50] transition-colors"
                  >
                    angeliki@brewcycle.at
                  </a>
                </p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1F6F50]">
                Unternehmensgegenstand:
              </h2>
              <p className="text-foreground font-medium">
                Entwicklung und Vertrieb von nachhaltigem Dünger.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1F6F50]">
                Grundlegende Richtung der Website (Blattlinie):
              </h2>
              <p className="text-foreground font-medium">
                Der Zweck dieser Website besteht darin, das Bewusstsein für ein
                unter Brewcycle GesbR entwickeltes Produkt zu schärfen und die
                Nachfrage nach diesem Produkt zu validieren.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
