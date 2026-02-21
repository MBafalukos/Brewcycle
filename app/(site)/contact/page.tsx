// app/contact/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    if (!canSubmit) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFullName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setConsent(false);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-[#F8F2E8] px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6">
          <CheckCircle2 className="h-10 w-10 text-[#1F6F50]" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-[#1F6F50]">Vielen Dank!</h1>
        <p className="max-w-md text-muted-foreground">
          Deine Nachricht wurde erfolgreich versendet. Wir werden uns so schnell
          wie möglich bei dir melden.
        </p>
        <Button
          variant="outline"
          className="mt-8 border-[#1F6F50] text-[#1F6F50] hover:bg-[#1F6F50] hover:text-white"
          onClick={() => setStatus("idle")}
        >
          Zurück zum Formular
        </Button>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#F8F2E8] py-16 sm:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
          {/* Sidebar: Contact Info */}
          <div className="flex flex-col justify-between">
            <div>
              <Badge className="bg-[#1F6F50]/10 mb-5 text-[#1F6F50] border-[#1F6F50]/20 px-4 py-1.5 text-sm font-medium hover:bg-[#1F6F50]/15 transition-colors uppercase tracking-[0.2em] rounded-full">
                Kontakt
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-[#3d571c] sm:text-5xl lg:text-6xl">
                Lass uns <br />
                <span className="text-black/80">sprechen.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Stell hier gerne deine Fragen oder hinterlasse eine Nachricht.
                Wir freuen uns über jede Anfrage zu Brewcycle und unseren
                Produkten.
              </p>

              <div className="mt-12 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/30 shadow-sm ring-1 ring-[#1F6F50]/10">
                    <Mail className="h-6 w-6 text-[#3d571c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">E-Mail</h3>
                    <p className="text-sm text-muted-foreground">
                      hallo@brewcycle.de
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/30 shadow-sm ring-1 ring-[#1F6F50]/10">
                    <Phone className="h-6 w-6 text-[#3d571c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Telefon</h3>
                    <p className="text-sm text-muted-foreground">
                      +49 123 4567890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/30 shadow-sm ring-1 ring-[#1F6F50]/10">
                    <MapPin className="h-6 w-6 text-[#3d571c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Standort</h3>
                    <p className="text-sm text-muted-foreground">
                      Stuttgart, Deutschland
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <Card className="overflow-hidden border-0 bg-white/50 backdrop-blur-sm shadow-2xl shadow-black/5 ring-1 ring-black/5 rounded-[2.5rem]">
            <CardContent className="p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70 ml-1"
                    >
                      Vorname + Nachname
                    </Label>
                    <div className="relative group">
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Dein voller Name"
                        className="h-14 rounded-2xl border-white bg-white px-5 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#1F6F50]/20 group-hover:bg-white"
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70 ml-1"
                      >
                        E-Mail <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hallo@beispiel.de"
                        className={`h-14 rounded-2xl border-white bg-white px-5 shadow-sm transition-all focus-visible:ring-2 ${!emailOk && email.length > 0 ? "border-red-200 focus-visible:ring-red-100" : "focus-visible:ring-[#1F6F50]/20"}`}
                        autoComplete="email"
                      />
                      {!emailOk && email.length > 0 && (
                        <p className="flex items-center gap-1.5 px-1 text-xs text-red-500 font-medium">
                          <AlertCircle className="h-3.5 w-3.5" />
                          Bitte gib eine gültige E-Mail-Adresse ein.
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70 ml-1"
                      >
                        Telefon (optional)
                      </Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+49 ..."
                        className="h-14 rounded-2xl border-white bg-white px-5 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#1F6F50]/20"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70 ml-1"
                    >
                      Deine Nachricht
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Wie können wir dir helfen?"
                        className="min-h-[160px] resize-none rounded-2xl border-white bg-white p-5 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#1F6F50]/20"
                      />
                      <MessageSquare className="absolute bottom-4 right-4 h-5 w-5 text-muted-foreground/30 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-3 px-1">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(v) => setConsent(Boolean(v))}
                      className="mt-1 data-[state=checked]:bg-[#3d571c] data-[state=checked]:border-[#1F6F50] rounded-[6px]"
                    />
                    <Label
                      htmlFor="consent"
                      className="cursor-pointer text-sm leading-relaxed text-muted-foreground font-medium select-none"
                    >
                      Ich willige ein, dass Brewcycle meine übermittelten Daten
                      speichert, sodass meine Anfrage beantwortet werden kann
                      <span className="text-red-500 font-bold ml-0.5">*</span>
                    </Label>
                  </div>

                  <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-6">
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="h-14 w-full sm:w-auto min-w-[180px] rounded-2xl bg-[#3d571c] px-8 text-base font-semibold text-white transition-all hover:bg-[#16553d] hover:shadow-lg hover:shadow-[#1F6F50]/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {status === "submitting" ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sendet...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Absenden</span>
                          <Send className="h-4 w-4" />
                        </div>
                      )}
                    </Button>

                    {status === "error" && (
                      <p className="flex items-center gap-1.5 text-sm text-red-500 font-medium">
                        <AlertCircle className="h-4 w-4" />
                        Fehler beim Senden.
                      </p>
                    )}
                  </div>

                  {!consent && fullName.length > 0 && (
                    <p className="text-center sm:text-left text-xs text-muted-foreground/70">
                      Bitte bestätige die Einwilligung, um fortzufahren.
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
