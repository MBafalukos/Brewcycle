"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
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

const COLORS = ["#1A4314", "#B75922", "#9BAD21", "#FDC54B", "#F3DEC2"];

type ChartMode = "pie" | "chart";

export function ChartCard({
  title,
  description,
  data,
}: {
  title: string;
  description?: string;
  data: { name: string; value: number }[];
}) {
  const [mode, setMode] = useState<ChartMode>("pie");

  return (
    <Card className="col-span-1 relative">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex gap-2 justify-end items-center text-xs">
            <p className="text-muted-foreground">Pie</p>
            <Switch
              checked={mode === "chart"}
              onCheckedChange={(checked) => setMode(checked ? "chart" : "pie")}
              aria-label="Toggle between pie and chart"
            />
            <p className="text-muted-foreground">Bar</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[320px] pt-4">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            {mode === "pie" ? (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#1A4314"
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
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
            )}
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
