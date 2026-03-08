// app/datenschutz/page.tsx
"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#F8F2E8] font-sans py-16 sm:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col gap-3 mb-10 text-center sm:text-left">
          <Badge className="bg-[#1F6F50]/10 w-fit mx-auto sm:mx-0 text-[#1F6F50] border-[#1F6F50]/20 px-4 py-1.5 text-sm font-medium hover:bg-[#1F6F50]/15 transition-colors uppercase tracking-[0.2em] rounded-full">
            Rechtliches
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-[#3d571c] sm:text-5xl font-silly">
            Datenschutzerklärung
          </h1>
          <p className="text-black/60 text-lg max-w-2xl">
            Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Hier
            erfährst du, wie wir mit deinen Informationen umgehen.
          </p>
        </div>

        <Card className="border-0 bg-white shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
          <CardContent className="p-8 sm:p-16 space-y-12 text-black/70 leading-relaxed font-sans">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#3d571c] font-silly border-b border-[#3d571c]/10 pb-2">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="text-lg font-semibold text-black/80">
                Allgemeine Hinweise
              </h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können. Ausführliche
                Informationen zum Thema Datenschutz entnehmen Sie unserer unter
                diesem Text aufgeführten Datenschutzerklärung.
              </p>
              <h3 className="text-lg font-semibold text-black/80">
                Datenerfassung auf dieser Website
              </h3>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
                dieser Website entnehmen.
              </p>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
                mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie
                in ein Kontaktformular eingeben. Andere Daten werden automatisch
                oder nach Ihrer Einwilligung beim Besuch der Website durch
                unsere IT-Systeme erfasst. Das sind vor allem technische Daten
                (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des
                Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
                sobald Sie diese Website betreten.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#3d571c] font-silly border-b border-[#3d571c]/10 pb-2">
                2. Hosting und Content Delivery Networks (CDN)
              </h2>
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              <h3 className="text-lg font-semibold text-black/80 tracking-tight">
                Vercel
              </h3>
              <p>
                Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA
                91789, USA. Vercel ist eine Cloud-Plattform, über die wir unsere
                Website bereitstellen. Bei der Nutzung von Vercel können
                personenbezogene Daten an Server in den USA übertragen werden.
                Vercel ist unter dem EU-US Data Privacy Framework zertifiziert.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#3d571c] font-silly border-b border-[#3d571c]/10 pb-2">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              <h3 className="text-lg font-semibold text-black/80">
                Datenschutz
              </h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
                Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
                vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <p>
                Wenn Sie diese Website benutzen, werden verschiedene
                personenbezogene Daten erhoben. Personenbezogene Daten sind
                Daten, mit denen Sie persönlich identifiziert werden können. Die
                vorliegende Datenschutzerklärung erläutert, welche Daten wir
                erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu
                welchem Zweck das geschieht.
              </p>
              <h3 className="text-lg font-semibold text-black/80">
                Hinweis zur verantwortlichen Stelle
              </h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser
                Website ist:
              </p>
              <div className="bg-[#F8F2E8]/50 p-6 rounded-2xl border border-[#3d571c]/5 italic shadow-inner">
                Brewcycle - [DEINE FIRMEN- ODER PERSONENDATEN]
                <br />
                [STRASSE UND HAUSNUMMER]
                <br />
                [PLZ UND ORT]
                <br />
                E-Mail: [DEINE E-MAIL-ADRESSE]
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#3d571c] font-silly border-b border-[#3d571c]/10 pb-2">
                4. Datenerfassung auf dieser Website
              </h2>
              <h3 className="text-lg font-semibold text-black/80">
                Newsletterdaten / Email Capture
              </h3>
              <p>
                Wenn Sie den auf der Website angebotenen Newsletter oder
                Informationen beziehen möchten, benötigen wir von Ihnen eine
                E-Mail-Adresse sowie Informationen, welche uns die Überprüfung
                gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse
                sind und mit dem Empfang einverstanden sind.
              </p>
              <p>
                Die Verarbeitung der in das Anmeldeformular eingegebenen Daten
                erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6
                Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung
                der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand
                können Sie jederzeit widerrufen. Die Rechtmäßigkeit der bereits
                erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf
                unberührt.
              </p>
              <h3 className="text-lg font-semibold text-black/80">
                Survey / Umfragen
              </h3>
              <p>
                Im Rahmen unserer Umfragen erfassen wir Ihre Antworten sowie
                (optional) Ihre Kontaktdaten. Diese Daten verwenden wir
                ausschließlich zur Verbesserung unserer Produkte und – sofern
                eingewilligt – zur Kontaktaufnahme oder Aufnahme in unsere
                Warteliste.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#3d571c] font-silly border-b border-[#3d571c]/10 pb-2">
                5. Ihre Rechte
              </h2>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
                jederzeit das Recht auf unentgeltliche Auskunft über Ihre
                gespeicherten personenbezogenen Daten, deren Herkunft und
                Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht
                auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu
                weiteren Fragen zum Thema personenbezogene Daten können Sie sich
                jederzeit unter der im Impressum angegebenen Adresse an uns
                wenden.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>
                  Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
                </li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerruf (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#3d571c] font-silly border-b border-[#3d571c]/10 pb-2">
                6. Plugins und Tools
              </h2>
              <h3 className="text-lg font-semibold text-black/80">
                Google Fonts
              </h3>
              <p>
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten
                so genannte Web Fonts. Diese werden lokal bereitgestellt, sodass
                keine Verbindung zu Servern von Google aufgebaut wird und somit
                keine Daten an Google übertragen werden.
              </p>
              <h3 className="text-lg font-semibold text-black/80">
                Lucide Icons
              </h3>
              <p>
                Wir verwenden Icons der Lucide-Bibliothek. Diese werden lokal
                eingebunden, wodurch ebenfalls keine Nutzerdaten an externe
                Server übertragen werden.
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="mt-12 text-center text-black/40 text-sm">
          Stand: März 2026
        </div>
      </div>
    </main>
  );
}
