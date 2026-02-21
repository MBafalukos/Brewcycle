// app/datenschutz/page.tsx
"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#F8F2E8] font-sans py-16 sm:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex flex-col gap-3 mb-10">
          <Badge className="bg-[#1F6F50]/10 w-fit text-[#1F6F50] border-[#1F6F50]/20 px-4 py-1.5 text-sm font-medium hover:bg-[#1F6F50]/15 transition-colors uppercase tracking-[0.2em] rounded-full">
            Datenschutz
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-[#3d571c] sm:text-5xl">
            Datenschutzerklärung
          </h1>
          <p className="text-muted-foreground">
            Informationen darüber, wie wir deine Daten schützen und verarbeiten.
          </p>
        </div>

        <Card className="border-0 bg-white/40 backdrop-blur-md shadow-xl shadow-black/5 ring-1 ring-black/5 rounded-[2.5rem]">
          <CardContent className="p-8 sm:p-12 space-y-8 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-foreground transition-colors group-hover:text-[#1F6F50]">
                Platzhalter für Datenschutzinhalte
              </h2>
              <p>
                Diese Seite wird basierend auf dem Survey-Layout erstellt. Bitte
                füge hier deine spezifischen Datenschutztexte ein.
              </p>
              <p>
                Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Wir
                behandeln deine personenbezogenen Daten vertraulich und
                entsprechend der gesetzlichen Datenschutzvorschriften sowie
                dieser Datenschutzerklärung.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
