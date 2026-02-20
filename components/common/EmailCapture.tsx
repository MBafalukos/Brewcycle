"use client";
import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input"; // Adjust import path to where shadcn Input is
import { Button } from "@/components/ui/button"; // Adjust path similarly
import { Badge } from "@/components/ui/badge"; // Optional if you have shadcn badges
import { Lock, CheckCircle } from "lucide-react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      // You can integrate your submit logic here (API call, etc.)
    }
  }

  return (
    <div className="h-full w-full rounded-2xl   p-8 ">
      {submitted ? (
        <div className="text-center">
          <CheckCircle className="mx-auto mb-3 h-8 w-8 text-green-600" />
          <h3 className="text-xl font-semibold text-[#1E5F46]">
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
            className="bg-[#1E5F46]/10 text-[#1E5F46]  "
          >
            Newsletter
          </Badge>
          <h3 className="mt-4 font-serif text-2xl leading-tight text-[#0F172A]">
            Early access
          </h3>
          <p className="mt-2 text-sm leading-6 text-black/60">
            Get special information
          </p>

          <div className="mt-4 rounded-lg bg-white/70 p-3 text-sm text-[#1E5F46]">
            <CheckCircle className="mr-1 inline-block h-4 w-4 align-text-bottom" />
            10% off your first order when you join!
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
              className="bg-[#05472A] w-fit text-white hover:bg-[#15803D]"
            >
              Join the list
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-2 text-xs text-black/55">
            <Lock className="h-3.5 w-3.5" />
            No spam. Unsubscribe anytime.
          </div>
        </>
      )}
    </div>
  );
}
