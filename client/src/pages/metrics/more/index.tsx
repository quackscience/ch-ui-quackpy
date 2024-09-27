import React from "react";
import { metrics } from "@/lib/metricsConfig";
import MetricItemComponent from "@/components/metrics/MetricItemComponent";
import MetricsNavigationMenu from "@/components/metrics/MetricsNavigationMenu";

function MetricsMore() {
  const metric = metrics.find((m) => m.href === "/metrics/more");

  if (!metric) {
    return <div>Metric not found</div>;
  }

  return (
    <>
      <MetricsNavigationMenu />
      <div className="container">
        <div className="flex items-center space-x-4">
          {React.createElement(metric.icon)}
          <h1 className="text-2xl font-bold">{metric.title}</h1>
        </div>
        <p className="mt-2 text-primary/60 text-sm">{metric.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metric.items?.map((item) => (
            <MetricItemComponent key={item.title} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MetricsMore;
