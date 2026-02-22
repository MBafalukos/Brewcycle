"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, getSurveyAnalytics } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MousePointerClick, Users, ClipboardList } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#1A4314", "#2E7D32", "#4CAF50", "#81C784", "#C8E6C9"];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    surveys: 0,
    waitlist: 0,
    buttonClicks: 0,
  });
  const [analytics, setAnalytics] = useState<
    Record<string, Record<string, number>>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsResult, analyticsResult] = await Promise.all([
          getDashboardStats(),
          getSurveyAnalytics(),
        ]);

        if (statsResult.success && statsResult.stats) {
          setStats(statsResult.stats);
        }
        if (analyticsResult.success && analyticsResult.analytics) {
          setAnalytics(analyticsResult.analytics);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground animate-pulse">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  // Format data for Recharts
  const interestData = Object.entries(analytics["interest_reason"] || {}).map(
    ([key, value]) => ({
      name:
        key === "sustainability"
          ? "Nachhaltigkeit"
          : key === "vegan"
            ? "Vegan"
            : key === "local_austria"
              ? "Regionale Herkunft"
              : key === "innovation"
                ? "Innovation"
                : "Sonstiges",
      value,
    }),
  );

  const purchaseChannelData = Object.entries(
    analytics["typical_purchase_channel"] || {},
  ).map(([key, value]) => ({
    name:
      key === "online_shop"
        ? "Online-Shop"
        : key === "diy_store"
          ? "Baumarkt"
          : key === "garden_center"
            ? "Gartencenter"
            : key === "local_specialist"
              ? "Fachhandel"
              : "Sonstiges",
    value,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          High-level metrics and survey responses.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.surveys}</div>
            <p className="text-xs text-muted-foreground">Responses submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waitlist Subs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.waitlist}</div>
            <p className="text-xs text-muted-foreground">
              Unique emails collected
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Button Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.buttonClicks}</div>
            <p className="text-xs text-muted-foreground">
              Learn more interactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Was interessiert dich am meisten?</CardTitle>
            <CardDescription>
              Primary reason for interest in Brewcycle
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {interestData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={interestData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#1A4314"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${((percent || 0) * 100).toFixed(0)}%`
                    }
                  >
                    {interestData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Einkaufsgewohnheiten</CardTitle>
            <CardDescription>
              Where users usually buy garden supplies
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {purchaseChannelData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purchaseChannelData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1A4314" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
