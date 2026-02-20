"use server";

import { supabase } from "@/lib/supabase";
import { z } from "zod";

// Schema for survey validation
const surveySchema = z.object({
    email: z.string().email("Invalid email address"),
    answers: z.record(z.string(), z.string()),
    notes: z.string().optional(),
    waitlistConsent: z.boolean().refine((val) => val === true, {
        message: "Consent is required",
    }),
    contactMeConsent: z.boolean().optional(),
});

export type SurveyData = z.infer<typeof surveySchema>;

/**
 * Increments the click counter for a specific button slug.
 * Uses an upsert logic: if slug exists, increment; else insert with count 1.
 */
export async function incrementClick(slug: string) {
    try {
        // We use a raw RPC call or a specific query pattern for atomic increment if possible.
        // However, for simplicity and production readiness in Supabase, we can use an RPC or a simple upsert if RLS allows.
        // For this example, we'll try to use a Supabase function if defined, or a standard upsert.

        // Note: Atomic increments in Supabase are best done via RPC.
        // CREATE OR REPLACE FUNCTION increment_button_click(button_slug TEXT)
        // RETURNS void AS $$
        // BEGIN
        //   INSERT INTO button_clicks (slug, count)
        //   VALUES (button_slug, 1)
        //   ON CONFLICT (slug)
        //   DO UPDATE SET count = button_clicks.count + 1, updated_at = now();
        // END;
        // $$ LANGUAGE plpgsql;

        const { error } = await supabase.rpc("increment_button_click", {
            button_slug: slug,
        });

        if (error) {
            // Fallback to manual if RPC is not set up yet (though RPC is recommended)
            console.error("RPC increment failed:", error);

            // Manual fallback (not atomic but works for basic tracking)
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
 * Submits survey data to the database.
 */
export async function submitSurvey(data: SurveyData) {
    try {
        // Validate input
        const validated = surveySchema.parse(data);

        const { error } = await supabase.from("surveys").insert([
            {
                email: validated.email,
                answers: { ...validated.answers, notes: validated.notes },
                waitlist_consent: validated.waitlistConsent,
                contact_me_consent: validated.contactMeConsent,
            },
        ]);

        if (error) throw error;

        return { success: true };
    } catch (err) {
        if (err instanceof z.ZodError) {
            return { success: false, error: err.issues[0].message };
        }
        console.error("Error submitting survey:", err);
        return { success: false, error: "Failed to submit survey" };
    }
}
