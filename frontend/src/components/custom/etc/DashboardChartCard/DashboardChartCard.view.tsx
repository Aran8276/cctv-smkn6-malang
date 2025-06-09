import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardChartCardProps } from "./DashboardChartCard.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { chartConfig } from "./DashboardChartCard.data";

const DashboardChartCardView: React.FC<DashboardChartCardProps> = ({
  options,
  selected,
  setSelected,
  chartData,
}) => {
  return (
    <Card className="col-span-full md:col-span-3">
      <CardHeader className="flex justify-between">
        <section className="flex flex-col gap-2">
          <CardTitle>Aktivitas</CardTitle>
          <CardDescription>Laporan</CardDescription>
        </section>
        <section>
          <div className="flex items-center p-1 bg-slate-50 rounded-full">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selected === option
                    ? "bg-primary text-white"
                    : "text-slate-400 hover:text-slate-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 16,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="8" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              tickFormatter={(value) =>
                value === 0 ? "0" : `${value / 1000}k`
              }
              fontSize={12}
              stroke="hsl(var(--muted-foreground))"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => `${value}`}
                  formatter={(value, name) => {
                    if (name === "accuracy") {
                      return [`${value}%`, "Akurasi"];
                    }
                    return [value, " Nilai"];
                  }}
                />
              }
            />
            <Bar
              dataKey="value"
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardChartCardView;
