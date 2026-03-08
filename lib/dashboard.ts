import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";

export const getCachedDashboardStats = unstable_cache(
  async () => {
    try {
      const [surveysResponse, waitlistResponse, clicksResponse] = await Promise.all([
        supabase.from("surveys").select("id", { count: "exact", head: true }),
        supabase.from("waitlist").select("id", { count: "exact", head: true }),
        supabase.from("button_clicks").select("slug, count"),
      ]);

      let totalClicks = 0;
      let buyNowClicks = 0;
      if (clicksResponse.data) {
        clicksResponse.data.forEach((curr) => {
          const count = Number(curr.count || 0);
          totalClicks += count;
          if (curr.slug === "buy-now") {
            buyNowClicks = count;
          }
        });
      }

      return {
        success: true,
        stats: {
          surveys: surveysResponse.count || 0,
          waitlist: waitlistResponse.count || 0,
          buttonClicks: totalClicks,
          buyNowClicks: buyNowClicks,
        },
      };
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
      return { success: false, error: "Failed to fetch dashboard stats" };
    }
  },
  ["dashboard-stats"],
  { tags: ["dashboard-stats"], revalidate: 60 }
);

export const getCachedSurveyAnalytics = unstable_cache(
  async () => {
    try {
      const { data: surveys, error } = await supabase.from("surveys").select("answers");
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
  },
  ["survey-analytics"],
  { tags: ["survey-analytics"], revalidate: 300 }
);
