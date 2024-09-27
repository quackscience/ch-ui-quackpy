// src/lib/metricsConfig.ts
import { ChartConfig } from "@/components/ui/chart";
import {
  HomeIcon,
  TableIcon,
  CombineIcon,
  PlusCircle,
  TerminalSquareIcon,
  Settings2,
} from "lucide-react";

export interface Metrics {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  items?: MetricItem[];
}

export interface MetricItem {
  title: string;
  query: string;
  type: "card" | "table" | "chart";
  chartType?:
    | "area-chart"
    | "bar-chart"
    | "line-chart"
    | "pie-chart"
    | "radar-chart"
    | "radial-chart";
  description: string;
  chartConfig: ChartConfig;
}

export const metrics: Metrics[] = [
  {
    title: "Overview",
    href: "/metrics",
    description: "Overview of ClickHouse metrics.",
    icon: HomeIcon,
    items: [
      {
        title: "Running Queries",
        query: `SELECT * FROM system.processes WHERE is_cancelled = 0`,
        type: "table",
        description: "Currently running queries excluding system queries.",
      },
      {
        title: "Daily Query Count",
        description: "Number of queries per day",
        type: "chart",
        query: `SELECT count() as query_count, toStartOfDay(event_time) as day FROM system.query_log WHERE event_time > now() - INTERVAL 1 DAY GROUP BY day ORDER BY day`,
        chartConfig: {
          dataKey: "query_count",
          xAxisKey: "day",
          label: "Query Count",
          color: "hsl(var(--chart-1))",
        },
      },
    ],
  },
  {
    title: "Tables",
    description: "Metrics related to tables.",
    href: "/metrics/tables",
    icon: TableIcon,
    items: [
      // Define queries specific to Tables here
      {
        title: "Total Tables",
        query: `SELECT COUNT(*) AS total_tables FROM system.tables WHERE lower(database) NOT IN ('system', 'information_schema') AND is_temporary = 0 AND engine LIKE '%MergeTree%'`,
        type: "card",
        description: "Total number of user-defined tables.",
      },
      // Add more table-related queries
    ],
  },
  {
    title: "Queries",
    href: "/metrics/queries",
    description: "Metrics related to queries.",
    icon: TerminalSquareIcon,
    items: [
      // Define queries specific to Queries here
      {
        title: "Running Queries Count",
        query: `SELECT COUNT(*) AS running_queries FROM system.processes WHERE is_cancelled = 0 AND query NOT LIKE '%system%'`,
        type: "card",
        description: "Number of currently running queries.",
      },
      // Add more queries-related queries
    ],
  },
  {
    title: "Merges",
    href: "/metrics/merges",
    description: "Metrics related to merges.",
    icon: CombineIcon,
    items: [
      // Define queries specific to Merges here
      {
        title: "Total Merges",
        query: `SELECT COUNT(*) AS total_merges FROM system.merges WHERE 1 = 1`,
        type: "card",
        description: "Total number of ongoing merges.",
      },
      // Add more merges-related queries
    ],
  },
  {
    title: "More",
    href: "/metrics/more",
    description: "Miscellaneous metrics.",
    icon: PlusCircle,
    items: [
      // Define queries specific to More here
      {
        title: "Disk Usage",
        query: `SELECT name, total_space AS size FROM system.disks`,
        type: "table",
        description: "Disk usage details.",
      },
      // Add more miscellaneous queries
    ],
  },
  {
    title: "Settings & Config",
    href: "/metrics/settings",
    description: "Settings and configuration.",
    icon: Settings2,
    items: [
      // Define queries specific to More here
      {
        title: "Disk Usage",
        query: `SELECT name, total_space AS size FROM system.disks`,
        type: "table",
        description: "Disk usage details.",
        chartConfig: undefined,
      },
      // Add more miscellaneous queries
    ],
  },
];
