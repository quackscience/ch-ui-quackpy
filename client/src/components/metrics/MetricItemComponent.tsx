import React, { useState, useEffect } from "react";
import { MetricItem } from "@/lib/metricsConfig";
import useTabStore from "@/stores/tabs.store";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import CHUITable from "../CHUITable";

interface Props {
  item: MetricItem;
}

function MetricItemComponent({ item }: Props) {
  const { runQuery } = useTabStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await runQuery("", item.query);
        setData(result);
        setErrorMessage(null);
      } catch (err: any) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [item.query, runQuery]);

  if (loading) {
    return (
      <Card className="p-4">
        <CardContent>Loading {item.title}...</CardContent>
      </Card>
    );
  }

  if (errorMessage) {
    return (
      <Card className="p-4">
        <CardContent>
          Error loading {item.title}: {errorMessage}
        </CardContent>
      </Card>
    );
  }

  const formatKey = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderCardContent = () => {
    if (!data || !data.data || data.data.length === 0) {
      return "No data available";
    }
    return data.data.map((item: any, index: number) => (
      <div key={index} className="mb-2">
        {Object.entries(item).map(([key, value]) => (
          <div key={key}>
            <span className="font-semibold">{formatKey(key)}:</span>{" "}
            {value?.toString()}
          </div>
        ))}
      </div>
    ));
  };

  const renderChart = () => {
    if (!data || !data.data || data.data.length === 0) {
      return "No data available for chart";
    }

    const chartConfig = {
      [item.chartConfig.dataKey as string]: {
        label:
          typeof item.chartConfig.label === "string"
            ? item.chartConfig.label
            : formatKey(item.chartConfig.dataKey),
        color: item.chartConfig.color || "hsl(var(--chart-1))",
        theme: item.chartConfig.theme || {
          light: "hsl(var(--chart-1))",
          dark: "hsl(var(--chart-2))",
        },
      },
    };

    return (
      <ChartContainer config={chartConfig} className="mt-4 h-[300px]">
        <BarChart data={data.data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={(item.chartConfig.xAxisKey as string) || "day"}
            tickLine={false}
            axisLine={false}
          />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey={item.chartConfig.dataKey as string}
            fill={`var(--color-${item.chartConfig.dataKey})`}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    );
  };

  const renderTable = () => {
    if (!data || !data.data || data.data.length === 0) {
      return "No data available for table";
    }
    return (
      <CHUITable
        result={{
          meta: data.meta,
          data: data.data,
          statistics: {
            elapsed: data.statistics.time_ellapsed,
            rows_read: data.statistics.rows_read,
            bytes_read: JSON.stringify(data).length,
          },
        }}
      />
    );
  };

  const renderContent = () => {
    switch (item.type) {
      case "card":
        return renderCardContent();
      case "chart":
        return renderChart();
      case "table":
        return renderTable();
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}

export default MetricItemComponent;
