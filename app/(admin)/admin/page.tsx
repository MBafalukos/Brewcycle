import {
  getCachedDashboardStats,
  getCachedSurveyAnalytics,
} from "@/lib/dashboard";
import { requireAuth } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { MousePointerClick, Users, ClipboardList } from "lucide-react";
import { ChartCard } from "./ChartCard";

type AnalyticsKey =
  | "interest_reason"
  | "primary_use_area"
  | "typical_purchase_channel"
  | "age_group";

type Analytics = Partial<Record<AnalyticsKey, Record<string, number>>>;

export default async function AdminDashboardPage() {
  await requireAuth();

  const [statsResult, analyticsResult] = await Promise.all([
    getCachedDashboardStats(),
    getCachedSurveyAnalytics(),
  ]);

  const stats =
    statsResult.success && statsResult.stats
      ? statsResult.stats
      : {
          surveys: 0,
          waitlist: 0,
          buttonClicks: 0,
          buyNowClicks: 0,
        };

  const analytics: Analytics =
    analyticsResult.success && analyticsResult.analytics
      ? analyticsResult.analytics
      : {};

  const engagementRate =
    stats.buyNowClicks > 0 ? (stats.surveys / stats.buyNowClicks) * 100 : 0;

  // Format data for Recharts
  const formatData = (
    key: AnalyticsKey,
    mapping: Record<string, string>,
  ): { name: string; value: number }[] => {
    return Object.entries(analytics[key] || {}).map(([id, value]) => ({
      name: mapping[id] || id || "Sonstiges",
      value: Number(value),
    }));
  };

  const interestData = formatData("interest_reason", {
    sustainability: "Nachhaltigkeit",
    vegan: "Vegan",
    local_austria: "Regionale Herkunft",
    innovation: "Innovation",
  });

  const primaryUseAreaData = formatData("primary_use_area", {
    indoor_balcony: "Zimmerpflanzen",
    vegetables_raised_bed: "Gemüsebeet",
    lawn_ornamental: "Ziergarten",
    agriculture: "Landwirtschaft",
  });

  const purchaseChannelData = formatData("typical_purchase_channel", {
    online_shop: "Online-Shop",
    diy_store: "Baumarkt",
    garden_center: "Gartencenter",
    local_specialist: "Fachhandel",
  });

  const ageData = formatData("age_group", {
    under_25: "Unter 25",
    "25_35": "25-35",
    "36_45": "36-45",
    "46_55": "46-55",
    "56_65": "56-65",
    "65_plus": "65+",
  });

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-serif text-gray-900">Overview</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="./admin/surveys">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Surveys
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.surveys}</div>
              <p className="text-xs text-muted-foreground">
                Responses submitted
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="./admin/waitlist">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.waitlist}</div>
              <p className="text-xs text-muted-foreground">
                Unique emails collected
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Button Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.buttonClicks}</div>
            <p className="text-xs text-muted-foreground">Interactions</p>
          </CardContent>
        </Card>

        <Card className="text-black">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <MousePointerClick className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {engagementRate.toFixed(1)}%
            </div>
            <p className="text-xs text-white/70">Surveys / Buy Clicks</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Nutzung"
          description="Wofür würdest du Brewcycle nutzen?"
          data={primaryUseAreaData}
        />
        <ChartCard
          title="Interesse"
          description="Was interessiert dich am meisten?"
          data={interestData}
        />
        <ChartCard
          title="Einkaufsgewohnheiten"
          description="Where users usually buy garden supplies"
          data={purchaseChannelData}
        />
        <ChartCard
          title="Altersgruppen"
          description="Wie alt sind unsere Nutzer?"
          data={ageData}
        />
      </div>
    </div>
  );
}
