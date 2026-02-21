"use client";
import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input"; // Adjust import path to where shadcn Input is
import { Button } from "@/components/ui/button"; // Adjust path similarly
import { Badge } from "@/components/ui/badge"; // Optional if you have shadcn badges
import { Lock, CheckCircle } from "lucide-react";
import { joinWaitlist } from "@/app/actions";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setIsLoading(true);
      try {
        const result = await joinWaitlist(email.trim());
        if (result.success) {
          setSubmitted(true);
        } else {
          alert(result.error || "Failed to join waitlist");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="h-full w-full rounded-2xl font-sans   p-8 ">
      {submitted ? (
        <div className="text-center">
          <CheckCircle className="mx-auto mb-3 h-8 w-8 text-green-600" />
          <h3 className="text-xl font-semibold text-[#3d571c]">
            Thank you for subscribing!
          </h3>
          <p className="mt-2 text-sm text-black/60">
            You’ll receive our next update in your inbox.
          </p>
        </div>
      ) : (
        <>
          <Badge
            variant="secondary"
            className="bg-[#3d571c]/10 text-[#3d571c] font-sans  "
          >
            Newsletter
          </Badge>
          <h3 className="mt-4 font-sans text-2xl leading-tight text-[#0F172A]">
            Frühzeitiger Zugang
          </h3>
          <p className="mt-2 text-sm leading-6 text-black/60">
            Erhalten Sie exklusive Informationen.
          </p>

          <div className="mt-4  rounded-lg bg-white/70 p-3 text-sm text-[#3d571c]">
            <CheckCircle className="mr-1 inline-block h-4 w-4 align-text-bottom" />
            10% Rabatt auf Ihre erste Bestellung!
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 ">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#3d571c] w-fit text-white hover:opacity-90"
            >
              {isLoading ? "Joining..." : "Treten Sie der Liste bei"}
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-2 text-xs text-black/55">
            <Lock className="h-3.5 w-3.5" />
            Jederzeit abbestellbar.
          </div>
        </>
      )}
    </div>
  );
}
