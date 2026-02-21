"use server";

import { createClient } from "@/lib/supabase/server";
import { supabase } from "@/lib/supabase"; // Use the service role client for db admin tasks

/**
 * Ensures the caller is authenticated as an admin before running the query.
 */
async function requireAuth() {
    const authSupabase = await createClient();
    const { data: { user }, error } = await authSupabase.auth.getUser();
    if (error || !user) {
        throw new Error("Unauthorized");
    }
    return user;
}

export async function getDashboardStats() {
    await requireAuth();

    try {
        const [surveysResponse, waitlistResponse, clicksResponse] = await Promise.all([
            supabase.from("surveys").select("id", { count: "exact", head: true }),
            supabase.from("waitlist").select("id", { count: "exact", head: true }),
            supabase.from("button_clicks").select("count"),
        ]);

        // Sum button clicks
        let totalClicks = 0;
        if (clicksResponse.data) {
            totalClicks = clicksResponse.data.reduce(
                (acc, curr) => acc + Number(curr.count || 0),
                0
            );
        }

        return {
            success: true,
            stats: {
                surveys: surveysResponse.count || 0,
                waitlist: waitlistResponse.count || 0,
                buttonClicks: totalClicks,
            },
        };
    } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
        return { success: false, error: "Failed to fetch dashboard stats" };
    }
}

export async function getSurveyAnalytics() {
    await requireAuth();

    try {
        const { data: surveys, error } = await supabase
            .from("surveys")
            .select("answers");

        if (error) throw error;

        // Aggregate survey answers for charts
        const answerCounts: Record<string, Record<string, number>> = {};

        surveys?.forEach((survey) => {
            const answers = survey.answers as Record<string, string>;
            if (!answers) return;

            Object.entries(answers).forEach(([questionId, answerValue]) => {
                if (!answerCounts[questionId]) {
                    answerCounts[questionId] = {};
                }
                answerCounts[questionId][answerValue] =
                    (answerCounts[questionId][answerValue] || 0) + 1;
            });
        });

        return { success: true, analytics: answerCounts };
    } catch (error) {
        console.error("Failed to fetch survey analytics", error);
        return { success: false, error: "Failed to fetch survey analytics" };
    }
}

export async function getSurveys() {
    await requireAuth();

    try {
        const { data: surveys, error } = await supabase
            .from("surveys")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return { success: true, surveys };
    } catch (error) {
        console.error("Failed to fetch surveys", error);
        return { success: false, error: "Failed to fetch surveys" };
    }
}

export async function getWaitlist() {
    await requireAuth();

    try {
        const { data: waitlist, error } = await supabase
            .from("waitlist")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return { success: true, waitlist };
    } catch (error) {
        console.error("Failed to fetch waitlist", error);
        return { success: false, error: "Failed to fetch waitlist" };
    }
}
