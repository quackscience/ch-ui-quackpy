import React, { useState, useEffect } from "react";
import { MetricItem } from "@/lib/metricsConfig";
import useTabStore from "@/stores/tabs.store";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="p-4 col-span-1">
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
    if (!data || !data.data || data.data.length === 0 || !item.chartConfig) {
      return "No data available for chart";
    }

    let ChartComponent;
    let DataComponent;

    switch (item.chartType) {
      case "line":
        ChartComponent = LineChart;
        DataComponent = Line;
        break;
      case "area":
        ChartComponent = AreaChart;
        DataComponent = Area;
        break;
      case "pie":
        ChartComponent = PieChart;
        DataComponent = Pie;
        break;
      case "radar":
        ChartComponent = RadarChart;
        DataComponent = Radar;
        break;
      case "radial":
        ChartComponent = RadialBarChart;
        DataComponent = RadialBar;
        break;
      case "bar":
      default:
        ChartComponent = BarChart;
        DataComponent = Bar;
    }

    const dataKey = Object.keys(item.chartConfig).find(
      (key) => key !== "indexBy"
    );
    const maxValue = Math.max(
      ...data.data.map((d: any) => d[dataKey as string])
    );
    const yAxisMax = Math.ceil(maxValue * 1.1); // Add 10% padding to the top

    return (
      <ChartContainer
        config={item.chartConfig}
        className="mt-4 h-[300px] w-full"
      >
        <ChartComponent
          data={data.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {["bar", "line", "area"].includes(item.chartType as string) && (
            <>
              <CartesianGrid strokeDasharray="3 3" vertical={true} />
              <XAxis
                dataKey={item.chartConfig.indexBy as string}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.toString().slice(0, 10)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={40}
                domain={[0, yAxisMax]}
                allowDataOverflow={false}
              />
            </>
          )}
          {item.chartType === "radar" && (
            <>
              <PolarGrid />
              <PolarAngleAxis dataKey={item.chartConfig.indexBy as string} />
              <PolarRadiusAxis />
            </>
          )}
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {Object.keys(item.chartConfig)
            .filter((key) => key !== "indexBy")
            .map((key) => (
              <DataComponent
                key={key}
                dataKey={key}
                fill={`var(--color-${key})`}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={false}
                radius={item.chartType === "bar" ? [4, 4, 0, 0] : undefined}
                fillOpacity={item.chartType === "area" ? 0.3 : 1}
                {...(item.chartType === "pie" || item.chartType === "radial"
                  ? {
                      data: data.data,
                      nameKey: item.chartConfig?.indexBy as string,
                      label: true,
                    }
                  : {})}
              >
                {(item.chartType === "pie" || item.chartType === "radial") &&
                  data.data.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`var(--color-${index + 1})`}
                    />
                  ))}
              </DataComponent>
            ))}
        </ChartComponent>
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
    <Card className={`h-full col-span-${item.tiles || 4}`}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}

export default MetricItemComponent;
