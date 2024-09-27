import { ChartConfig } from "@/components/ui/chart";
import {
  HomeIcon,
  TableIcon,
  CombineIcon,
  TerminalSquareIcon,
  Settings2,
  HardDriveIcon,
  NetworkIcon,
  CpuIcon,
  AlertTriangleIcon,
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
  chartType?: "bar" | "line" | "area" | "pie" | "radar" | "radial";
  description: string;
  chartConfig?: ChartConfig;
  tiles?: number;
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
        tiles: 4,
      },
      {
        title: "Daily Query Count",
        description: "Number of queries per day for the last 30 days.",
        type: "chart",
        chartType: "bar",
        query: `SELECT count() as query_count, toStartOfDay(event_time) as day 
                FROM system.query_log 
                WHERE event_time > now() - INTERVAL 30 DAY 
                GROUP BY day 
                ORDER BY day`,
        chartConfig: {
          indexBy: "day",
          query_count: {
            label: "Query Count",
            color: "hsl(var(--chart-1))",
          },
        },
        tiles: 4,
      },
      {
        title: "Server Uptime",
        query: `SELECT uptime() AS uptime`,
        type: "card",
        description: "Total time the server has been running.",
        tiles: 1,
      },
      {
        title: "Total Databases",
        query: `SELECT COUNT(*) AS total_databases FROM system.databases WHERE name NOT IN ('system', 'information_schema')`,
        type: "card",
        description: "Total number of databases excluding system databases.",
        tiles: 1,
      },
      {
        title: "Active Users",
        query: `SELECT COUNT(DISTINCT user) AS active_users FROM system.query_log WHERE event_time > now() - INTERVAL 1 DAY`,
        type: "card",
        description:
          "Number of users who have run queries in the last 24 hours.",
        tiles: 1,
      },
      {
        title: "Active Connections",
        query: `SELECT value AS active_connections FROM system.metrics WHERE metric = 'TCPConnection'`,
        type: "card",
        description: "Current number of active TCP connections.",
        tiles: 1,
      },
      {
        title: "Total Queries (Last 24h)",
        query: `SELECT COUNT(*) AS total_queries FROM system.query_log WHERE event_time > now() - INTERVAL 1 DAY AND type = 'QueryFinish'`,
        type: "card",
        description: "Total number of queries executed in the last 24 hours.",
        tiles: 1,
      },
    ],
  },
  {
    title: "Tables",
    description: "Metrics related to tables.",
    href: "/metrics/tables",
    icon: TableIcon,
    items: [
      {
        title: "Total Tables",
        query: `SELECT COUNT(*) AS total_tables FROM system.tables WHERE lower(database) NOT IN ('system', 'information_schema') AND is_temporary = 0 AND engine LIKE '%MergeTree%'`,
        type: "card",
        description: "Total number of user-defined tables.",
        tiles: 1,
      },
      {
        title: "Table Sizes",
        query: `SELECT name, total_bytes FROM system.tables WHERE database NOT IN ('system', 'information_schema') ORDER BY total_bytes DESC LIMIT 30`,
        type: "chart",
        chartType: "bar",
        description: "Size distribution of the top 30 largest tables.",
        chartConfig: {
          indexBy: "name",
          total_bytes: {
            label: "Size (bytes)",
            color: "hsl(var(--chart-2))",
          },
        },
        tiles: 4,
      },
      {
        title: "Table Row Counts",
        query: `SELECT database, name AS table, total_rows FROM system.tables WHERE database NOT IN ('system', 'information_schema') ORDER BY total_rows DESC LIMIT 10`,
        type: "table",
        description: "Number of rows in the top 10 tables.",
        tiles: 2,
      },
      {
        title: "Number of Parts per Table",
        query: `SELECT name AS table, COUNT(*) AS part_count FROM system.parts WHERE active AND database NOT IN ('system', 'information_schema') GROUP BY table ORDER BY part_count DESC LIMIT 10`,
        type: "chart",
        chartType: "bar",
        description: "Number of active parts in the top 10 tables.",
        chartConfig: {
          indexBy: "table",
          part_count: {
            label: "Part Count",
            color: "hsl(var(--chart-5))",
          },
        },
        tiles: 4,
      },
    ],
  },
  {
    title: "Queries",
    href: "/metrics/queries",
    description: "Metrics related to queries.",
    icon: TerminalSquareIcon,
    items: [
      {
        title: "Running Queries Count",
        query: `SELECT COUNT(*) AS running_queries FROM system.processes WHERE is_cancelled = 0 AND query NOT LIKE '%system%'`,
        type: "card",
        description: "Number of currently running queries.",
        tiles: 1,
      },
      {
        title: "Query Duration Distribution",
        query: `SELECT 
                  CASE 
                    WHEN query_duration_ms < 100 THEN '<100ms'
                    WHEN query_duration_ms < 1000 THEN '100ms-1s'
                    WHEN query_duration_ms < 10000 THEN '1s-10s'
                    WHEN query_duration_ms < 60000 THEN '10s-1m'
                    ELSE '>1m'
                  END AS duration_bucket,
                  COUNT(*) AS query_count
                FROM system.query_log
                WHERE type = 'QueryFinish'
                  AND event_time > now() - INTERVAL 1 DAY
                GROUP BY duration_bucket
                ORDER BY duration_bucket`,
        type: "chart",
        chartType: "bar",
        description: "Distribution of query durations over the last 24 hours.",
        chartConfig: {
          indexBy: "duration_bucket",
          query_count: {
            label: "Query Count",
            color: "hsl(var(--chart-3))",
          },
        },
        tiles: 4,
      },
      {
        title: "Top Slow Queries",
        query: `SELECT query, query_duration_ms FROM system.query_log WHERE type = 'QueryFinish' AND event_time > now() - INTERVAL 1 DAY ORDER BY query_duration_ms DESC LIMIT 10`,
        type: "table",
        description: "Top 10 slowest queries over the last 24 hours.",
        tiles: 2,
      },
      {
        title: "Query Error Rate",
        query: `SELECT 
                  round(100 * failed_queries / total_queries, 2) AS error_rate
                FROM
                (
                    SELECT 
                        (SELECT COUNT(*) FROM system.query_log WHERE type = 'QueryFinish' AND event_time > now() - INTERVAL 1 DAY) AS total_queries,
                        (SELECT COUNT(*) FROM system.query_log WHERE type LIKE 'Exception%' AND event_time > now() - INTERVAL 1 DAY) AS failed_queries
                )`,
        type: "card",
        description: "Percentage of failed queries over the last 24 hours.",
        tiles: 1,
      },
      {
        title: "Queries Per Second (QPS)",
        query: `SELECT 
                  toStartOfMinute(event_time) AS minute,
                  COUNT(*) AS qps
                FROM system.query_log
                WHERE type = 'QueryFinish' AND event_time > now() - INTERVAL 1 HOUR
                GROUP BY minute
                ORDER BY minute`,
        type: "chart",
        chartType: "area",
        description: "Queries per second over the last hour.",
        chartConfig: {
          indexBy: "minute",
          qps: {
            label: "QPS",
            color: "hsl(var(--chart-6))",
          },
        },
        tiles: 4,
      },
    ],
  },
  {
    title: "Merges",
    href: "/metrics/merges",
    description: "Metrics related to merges.",
    icon: CombineIcon,
    items: [
      {
        title: "Total Merges",
        query: `SELECT COUNT(*) AS total_merges FROM system.merges WHERE 1 = 1`,
        type: "card",
        description: "Total number of ongoing merges.",
        tiles: 1,
      },
      {
        title: "Merge Progress",
        query: `SELECT 
                  table,
                  round(100 * progress, 2) AS progress_percent,
                  round(total_size_bytes_compressed / 1024 / 1024, 2) AS size_mb
                FROM system.merges
                ORDER BY progress_percent DESC`,
        type: "chart",
        chartType: "radial",
        description: "Progress of ongoing merges.",
        chartConfig: {
          indexBy: "table",
          progress_percent: {
            label: "Progress",
            color: "hsl(var(--chart-4))",
          },
        },
        tiles: 2,
      },
    ],
  },
  {
    title: "Performance",
    href: "/metrics/performance",
    description: "Performance-related metrics.",
    icon: CpuIcon,
    items: [
      {
        title: "CPU Usage",
        query: `SELECT 
        toStartOfMinute(event_time) AS minute,
        avg(ProfileEvent_OSCPUVirtualTimeMicroseconds) AS cpu_usage
      FROM system.metric_log
      WHERE event_time > now() - INTERVAL 1 HOUR
      GROUP BY minute
      ORDER BY minute`,
        type: "chart",
        chartType: "line",
        description: "CPU usage over the last hour.",
        chartConfig: {
          indexBy: "minute",
          cpu_usage: {
            label: "CPU Usage",
            color: "hsl(var(--chart-5))",
          },
        },
        tiles: 4,
      },
      {
        title: "Memory Usage",
        query: `SELECT 
        toStartOfMinute(event_time) AS minute,
        avg(ProfileEvent_MemoryTracking) AS memory_usage
      FROM system.metric_log
      WHERE event_time > now() - INTERVAL 1 HOUR
      GROUP BY minute
      ORDER BY minute`,
        type: "chart",
        chartType: "area",
        description: "Memory usage over the last hour.",
        chartConfig: {
          indexBy: "minute",
          memory_usage: {
            label: "Memory Usage",
            color: "hsl(var(--chart-1))",
          },
        },
        tiles: 4,
      },
      {
        title: "Disk I/O",
        query: `SELECT 
                  toStartOfMinute(event_time) AS minute,
                  sum(ProfileEvent_ReadCompressedBytes) AS read_bytes,
                  sum(ProfileEvent_WriteCompressedBytes) AS write_bytes
                FROM system.metric_log
                WHERE event_time > now() - INTERVAL 1 HOUR
                GROUP BY minute
                ORDER BY minute`,
        type: "chart",
        chartType: "area",
        description: "Disk I/O over the last hour.",
        chartConfig: {
          indexBy: "minute",
          read_bytes: {
            label: "Read Bytes",
            color: "hsl(var(--chart-7))",
          },
          write_bytes: {
            label: "Write Bytes",
            color: "hsl(var(--chart-8))",
          },
        },
        tiles: 4,
      },
      {
        title: "Threads Usage",
        query: `SELECT 
                  toStartOfMinute(event_time) AS minute,
                  avg(ThreadsRunning) AS threads_running,
                  avg(ThreadsTotal) AS threads_total
                FROM system.metric_log
                WHERE event_time > now() - INTERVAL 1 HOUR
                GROUP BY minute
                ORDER BY minute`,
        type: "chart",
        chartType: "line",
        description: "Threads usage over the last hour.",
        chartConfig: {
          indexBy: "minute",
          threads_running: {
            label: "Threads Running",
            color: "hsl(var(--chart-9))",
          },
          threads_total: {
            label: "Threads Total",
            color: "hsl(var(--chart-10))",
          },
        },
        tiles: 4,
      },
    ],
  },
  {
    title: "Storage",
    href: "/metrics/storage",
    description: "Storage-related metrics.",
    icon: HardDriveIcon,
    items: [
      {
        title: "Disk Usage",
        query: `SELECT 
                  name,
                  round(total_space / 1024 / 1024 / 1024, 2) AS total_gb,
                  round(free_space / 1024 / 1024 / 1024, 2) AS free_gb,
                  round((1 - free_space / total_space) * 100, 2) AS used_percent
                FROM system.disks`,
        type: "table",
        description: "Detailed disk usage information.",
      },
      {
        title: "Database Sizes",
        query: `SELECT 
                  database,
                  round(sum(total_bytes) / 1024 / 1024 / 1024, 2) AS size_gb
                FROM system.tables
                GROUP BY database
                ORDER BY size_gb DESC`,
        type: "chart",
        chartType: "pie",
        description: "Size distribution of databases.",
        chartConfig: {
          indexBy: "database",
          size_gb: {
            label: "Size (GB)",
            color: "hsl(var(--chart-2))",
          },
        },
        tiles: 4,
      },
    ],
  },
  {
    title: "Network",
    href: "/metrics/network",
    description: "Network-related metrics.",
    icon: NetworkIcon,
    items: [
      {
        title: "Network Traffic",
        query: `SELECT 
                  toStartOfMinute(event_time) AS minute,
                  sum(ProfileEvent_NetworkSendBytes) AS send_bytes,
                  sum(ProfileEvent_NetworkReceiveBytes) AS receive_bytes
                FROM system.metric_log
                WHERE event_time > now() - INTERVAL 1 HOUR
                GROUP BY minute
                ORDER BY minute`,
        type: "chart",
        chartType: "area",
        description: "Network traffic over the last hour.",
        chartConfig: {
          indexBy: "minute",
          send_bytes: {
            label: "Send (bytes)",
            color: "hsl(var(--chart-3))",
          },
          receive_bytes: {
            label: "Receive (bytes)",
            color: "hsl(var(--chart-4))",
          },
        },
        tiles: 4,
      },
    ],
  },
  {
    title: "Settings & Config",
    href: "/metrics/settings",
    description: "Settings and configuration.",
    icon: Settings2,
    items: [
      {
        title: "Current Settings",
        query: `SELECT name, value, description FROM system.settings`,
        type: "table",
        description: "Current ClickHouse settings.",
        tiles: 2,
      },
      {
        title: "Users",
        query: `SELECT name, storage, authentication_type FROM system.users`,
        type: "table",
        description: "List of users and their authentication types.",
        tiles: 2,
      },
    ],
  },
  {
    title: "Errors & Logs",
    href: "/metrics/errors",
    description: "Error logs and exceptions.",
    icon: AlertTriangleIcon,
    items: [
      {
        title: "Recent Errors",
        query: `SELECT event_time, user, query, exception FROM system.query_log WHERE type LIKE 'Exception%' AND event_time > now() - INTERVAL 1 HOUR ORDER BY event_time DESC LIMIT 10`,
        type: "table",
        description: "Recent query errors in the last hour.",
        tiles: 2,
      },
    ],
  },
  {
    title: "Replication",
    href: "/metrics/replication",
    description: "Replication-related metrics.",
    icon: HomeIcon,
    items: [
      {
        title: "Replication Lag",
        query: `SELECT 
                  database,
                  table,
                  absolute_delay
                FROM system.replication_queue
                ORDER BY absolute_delay DESC LIMIT 10`,
        type: "table",
        description: "Replication lag for tables.",
        tiles: 2,
      },
    ],
  },
];
