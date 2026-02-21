// app/contact/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function ContactPage() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [consent, setConsent] = React.useState(false);

  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const emailOk = isValidEmail(email);

  const canSubmit =
    fullName.trim().length > 1 && emailOk && consent && status !== "submitting";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      // TODO: replace with your API endpoint (e.g. /api/contact)
      console.log("Contact form submitted:", {
        fullName,
        email,
        phone,
        message,
        consent,
      });

      setStatus("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setConsent(false);
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section className="w-full  bg-[#F8F2E8] font-sans">
      <main className="mx-auto w-full max-w-3xl bg-[#F8F2E8] px-6 py-14 sm:py-20">
        {/* Title / intro like screenshot */}
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#1F6F50] sm:text-4xl">
            Deine Anfrage
          </h1>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            Stell hier gerne deine Fragen oder hinterlasse eine Nachricht
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Wir freuen uns sehr, dass du Interesse an{" "}
            <span className="font-medium text-foreground">Brewcycle</span> und
            unseren Produkten hast. Gestalten wir gemeinsam eine nachhaltige
            Kreislaufwirtschaft!
          </p>
        </header>

        {/* Form card */}
        <Card className="mt-10 border-0 shadow-none bg-inherit">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Deine Daten */}
              <section className="space-y-4">
                <h2 className="text-sm font-semibold">
                  Deine Daten <span className="text-[#1F6F50]">*</span>
                </h2>

                {/* Underlined inputs like screenshot */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="sr-only">
                      Vorname + Nachname
                    </Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Vorname + Nachname"
                      className="h-11 rounded-none border-0 border-b border-[#1F6F50]/30 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      autoComplete="name"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="sr-only">
                        E-Mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-Mail"
                        className="h-11 rounded-none border-0 border-b border-[#1F6F50]/30 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        autoComplete="email"
                      />
                      {!emailOk && email.length > 0 ? (
                        <p className="text-sm text-destructive">
                          Bitte gib eine gültige E-Mail-Adresse ein.
                        </p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="sr-only">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Telefon"
                        className="h-11 rounded-none border-0 border-b border-[#1F6F50]/30 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Deine Nachricht */}
              <section className="space-y-4">
                <h2 className="text-sm font-semibold">Deine Nachricht</h2>

                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Schreibe uns gerne hier"
                  className="min-h-35 rounded-none border-0 border-b border-[#1F6F50]/30 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </section>

              {/* Consent (only checkbox row like screenshot) */}
              <section className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(v) => setConsent(Boolean(v))}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="consent"
                    className="cursor-pointer text-sm leading-relaxed"
                  >
                    Ich willige ein, dass Brewcycle meine übermittelten Daten
                    speichert, sodass meine Anfrage beantwortet werden kann
                    <span className="text-[#1F6F50]">*</span>
                  </Label>
                </div>
              </section>

              {/* Status */}
              {status === "success" ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm">
                  Danke! Deine Nachricht wurde gesendet.
                </div>
              ) : null}

              {status === "error" ? (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
                  Ups – das hat nicht geklappt. Bitte versuch es erneut.
                </div>
              ) : null}

              {/* Submit button aligned like screenshot (simple) */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="h-11 rounded-xl bg-[#1F6F50] px-6 text-white hover:bg-black/40"
                >
                  {status === "submitting" ? "Senden…" : "Senden"}
                </Button>

                {!consent ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Bitte bestätige die Einwilligung, um das Formular
                    abzusenden.
                  </p>
                ) : null}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
