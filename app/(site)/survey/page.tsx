// app/survey/page.tsx
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { submitSurveyAnswers, updateSurveyWithEmail } from "../../actions";

import { QUESTIONS } from "@/lib/survey-config";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

type Step = "questions" | "email" | "done";

export default function SurveyPage() {
  const [step, setStep] = React.useState<Step>("questions");

  // answers are anonymous; collected on first step
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [notes, setNotes] = React.useState("");
  const [surveyId, setSurveyId] = React.useState<string | null>(null);

  // email collection step
  const [email, setEmail] = React.useState("");
  const [waitlistConsent, setWaitlistConsent] = React.useState(false);
  const [contactMeConsent, setContactMeConsent] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const answeredCount = Object.keys(answers).length;
  const total = QUESTIONS.length;
  const progress = Math.round((answeredCount / total) * 100);

  const canProceedToEmail = answeredCount === total; // no consent needed here
  const emailOk = isValidEmail(email);
  const canFinish = emailOk && waitlistConsent;

  function setAnswer(qid: string, optionId: string) {
    setAnswers((prev) => ({ ...prev, [qid]: optionId }));
  }

  async function handleGoToEmail() {
    setIsSubmitting(true);
    try {
      const result = await submitSurveyAnswers({ answers, notes });
      if (result.success && result.surveyId) {
        setSurveyId(result.surveyId);
        setStep("email");
      } else {
        alert(result.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleFinish() {
    setIsSubmitting(true);
    try {
      if (!surveyId) throw new Error("No survey ID found.");

      const result = await updateSurveyWithEmail({
        surveyId: surveyId,
        email: email.trim(),
        waitlistConsent,
        contactMeConsent,
      });

      if (result.success) {
        setStep("done");
      } else {
        alert(result.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  function reset() {
    setStep("questions");
    setAnswers({});
    setNotes("");
    setSurveyId(null);
    setEmail("");
    setWaitlistConsent(false);
    setContactMeConsent(false);
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-3">
        <Badge className="bg-[#1F6F50]/10 mb-5 text-[#1F6F50] border-[#1F6F50]/20 px-4 py-1.5 text-sm font-medium hover:bg-[#1F6F50]/15 transition-colors uppercase tracking-[0.2em] rounded-full">
          Umfrage
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Hilf uns, Brewcycle zu verbessern
        </h1>
        <p className="text-muted-foreground">
          Beantworte ein paar kurze Fragen – dauert nur 1–2 Minuten.
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-lg">
              {step === "questions"
                ? "Fragen"
                : step === "email"
                  ? "Warteliste"
                  : "Fertig"}
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {Math.min(answeredCount, total)}/{total}
            </span>
          </div>
          <Progress value={progress} />
        </CardHeader>

        <CardContent className="space-y-8">
          {step === "done" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">
                  Danke für das Interesse! 🎉
                </h2>
                <p className="text-muted-foreground">
                  Wir melden uns, sobald die erste Charge bereitsteht.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className="rounded-xl bg-[#1F6F50] text-white hover:opacity-90"
                  onClick={reset}
                >
                  Neues Formular
                </Button>
                <Button variant="outline" className="rounded-xl" asChild>
                  <a href="/">Zurück zur Startseite</a>
                </Button>
              </div>
            </div>
          ) : step === "email" ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">
                  Jetzt Platz auf der Warteliste sichern
                </h2>
                <p className="text-muted-foreground">
                  Wir sind in den letzten Zügen der Entwicklung. Hinterlasse
                  deine E-Mail, um zum Start informiert zu werden.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="h-11 rounded-xl"
                  autoComplete="email"
                />
                {!emailOk && email.length > 0 ? (
                  <p className="text-sm text-destructive">
                    Bitte gib eine gültige E-Mail-Adresse ein.
                  </p>
                ) : null}
              </div>

              <div className="space-y-3 rounded-xl border p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="waitlist_consent"
                    checked={waitlistConsent}
                    onCheckedChange={(v) => setWaitlistConsent(Boolean(v))}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="waitlist_consent"
                      className="cursor-pointer"
                    >
                      Ich stimme den Datenschutzbestimmungen zu und möchte
                      informiert werden, sobald Loop verfügbar ist.
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      (Link zur Datenschutzerklärung)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="contactme_consent"
                    checked={contactMeConsent}
                    onCheckedChange={(v) => setContactMeConsent(Boolean(v))}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="contactme_consent"
                      className="cursor-pointer"
                    >
                      Ich möchte mein Feedback schon jetzt geben und ihr dürft
                      mich zu diesem Zweck kontaktieren. (optional)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {!waitlistConsent
                    ? "Bitte bestätige die Datenschutz-Einwilligung, um fortzufahren."
                    : !emailOk
                      ? "Bitte gib eine gültige E-Mail-Adresse ein."
                      : "Alles bereit."}
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => setStep("questions")}
                  >
                    Zurück
                  </Button>

                  <Button
                    className="rounded-xl bg-[#1F6F50] text-white hover:opacity-90"
                    disabled={!canFinish || isSubmitting}
                    onClick={handleFinish}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Warteliste beitreten"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {QUESTIONS.map((q: any, idx: number) => (
                <div key={q.id} className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Frage {idx + 1} von {total}
                    </p>
                    <h3 className="text-base font-semibold">{q.title}</h3>
                    {q.description ? (
                      <p className="text-sm text-muted-foreground">
                        {q.description}
                      </p>
                    ) : null}
                  </div>

                  <RadioGroup
                    value={answers[q.id] ?? ""}
                    onValueChange={(v) => setAnswer(q.id, v)}
                    className="grid gap-2"
                  >
                    {q.options.map((opt: any) => (
                      <div
                        key={opt.id}
                        className="flex items-center gap-3 rounded-xl border p-3 hover:bg-muted/40"
                      >
                        <RadioGroupItem
                          id={`${q.id}_${opt.id}`}
                          value={opt.id}
                        />
                        <Label
                          htmlFor={`${q.id}_${opt.id}`}
                          className="cursor-pointer"
                        >
                          {opt.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <Separator className="mt-6" />
                </div>
              ))}

              <div className="space-y-3">
                <h3 className="text-base font-semibold">
                  Optional: Noch etwas, das wir wissen sollten?
                </h3>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Dein Feedback…"
                  className="min-h-27.5 rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {answeredCount < total
                    ? "Bitte beantworte alle Multiple-Choice Fragen."
                    : "Alles fertig — weiter zur Warteliste."}
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="rounded-xl bg-white"
                    onClick={reset}
                  >
                    Zurücksetzen
                  </Button>

                  <Button
                    className="rounded-xl bg-[#3d571c] text-white hover:opacity-90"
                    disabled={!canProceedToEmail || isSubmitting}
                    onClick={handleGoToEmail}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Weiter"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
