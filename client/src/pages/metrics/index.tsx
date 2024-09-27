import React, { useEffect } from "react";
import { metrics } from "@/lib/metricsConfig";
import MetricItemComponent from "@/components/metrics/MetricItemComponent";
import MetricsNavigationMenu from "@/components/metrics/MetricsNavigationMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

function MetricsOverview() {
  const location = useLocation();
  const navigate = useNavigate();
  const scope = new URLSearchParams(location.search).get("scope");

  useEffect(() => {
    if (scope) {
      const metric = metrics.find((m) => m.href === `/metrics/${scope}`);
      if (!metric) {
        navigate("/metrics");
        toast.error("Invalid metric scope");
      }
    }
  }, [scope, navigate]);

  const currentMetric = scope
    ? metrics.find((m) => m.href === `/metrics/${scope}`)
    : metrics.find((m) => m.href === "/metrics");

  if (!currentMetric) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <MetricsNavigationMenu />
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4 mb-4">
              {React.createElement(currentMetric.icon, {
                className: "w-8 h-8 text-primary",
              })}
              <h1 className="text-3xl font-bold text-foreground">
                {currentMetric.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {currentMetric.description}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-4 gap-6">
          {currentMetric.items?.map((item) => (
            <MetricItemComponent key={item.title} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default MetricsOverview;
