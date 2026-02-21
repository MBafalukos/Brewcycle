"use server";

import { supabase } from "@/lib/supabase";
import { z } from "zod";

// Schemas for validation
const surveyAnswersSchema = z.object({
    answers: z.record(z.string(), z.string()),
    notes: z.string().optional(),
});

const surveyEmailSchema = z.object({
    surveyId: z.string().uuid("Invalid survey ID"),
    email: z.string().email("Invalid email address"),
    waitlistConsent: z.boolean(),
    contactMeConsent: z.boolean().optional(),
});

const joinWaitlistSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type SurveyAnswersData = z.infer<typeof surveyAnswersSchema>;
export type SurveyEmailData = z.infer<typeof surveyEmailSchema>;

/**
 * Increments the click counter for a specific button slug.
 */
export async function incrementClick(slug: string) {
    try {
        const { error } = await supabase.rpc("increment_button_click", {
            button_slug: slug,
        });

        if (error) {
            console.error("RPC increment failed:", error);
            const { data: existing } = await supabase
                .from("button_clicks")
                .select("count")
                .eq("slug", slug)
                .single();

            if (existing) {
                await supabase
                    .from("button_clicks")
                    .update({ count: (existing.count || 0) + 1, updated_at: new Date().toISOString() })
                    .eq("slug", slug);
            } else {
                await supabase
                    .from("button_clicks")
                    .insert({ slug, count: 1 });
            }
        }
        return { success: true };
    } catch (err) {
        console.error("Error incrementing click:", err);
        return { success: false, error: "Failed to track click" };
    }
}

/**
 * Submits anonymous survey answers and returns the created record ID.
 */
export async function submitSurveyAnswers(data: SurveyAnswersData) {
    try {
        const validated = surveyAnswersSchema.parse(data);

        const { data: inserted, error } = await supabase
            .from("surveys")
            .insert([{ answers: { ...validated.answers, notes: validated.notes } }])
            .select("id")
            .single();

        if (error) throw error;
        return { success: true, surveyId: inserted.id };
    } catch (err) {
        if (err instanceof z.ZodError) return { success: false, error: err.issues[0].message };
        console.error("Error submitting survey answers:", err);
        return { success: false, error: "Failed to submit survey answers" };
    }
}

/**
 * Updates an existing survey record with email and consent. 
 * If waitlist consent is given, adds to the waitlist.
 */
export async function updateSurveyWithEmail(data: SurveyEmailData) {
    try {
        const validated = surveyEmailSchema.parse(data);

        const { error: updateError } = await supabase
            .from("surveys")
            .update({
                email: validated.email,
                waitlist_consent: validated.waitlistConsent,
                contact_me_consent: validated.contactMeConsent,
            })
            .eq("id", validated.surveyId);

        if (updateError) throw updateError;

        if (validated.waitlistConsent) {
            const { error: waitlistError } = await supabase.from("waitlist").upsert(
                {
                    email: validated.email,
                    source: "survey",
                    survey_id: validated.surveyId,
                },
                { onConflict: "email" }
            );
            if (waitlistError) throw waitlistError;
        }

        return { success: true };
    } catch (err) {
        if (err instanceof z.ZodError) return { success: false, error: err.issues[0].message };
        console.error("Error updating survey:", err);
        return { success: false, error: "Failed to update survey" };
    }
}

/**
 * Allows joining the waitlist directly from the landing page.
 */
export async function joinWaitlist(emailInput: string) {
    try {
        const validated = joinWaitlistSchema.parse({ email: emailInput });

        const { error } = await supabase.from("waitlist").upsert(
            {
                email: validated.email,
                source: "landing_page",
            },
            { onConflict: "email" }
        );

        if (error) throw error;
        return { success: true };
    } catch (err) {
        if (err instanceof z.ZodError) return { success: false, error: err.issues[0].message };
        console.error("Error joining waitlist:", err);
        return { success: false, error: "Failed to join waitlist" };
    }
}
