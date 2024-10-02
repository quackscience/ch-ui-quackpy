import React, { useEffect, useState } from "react";
import SQLEditor from "./SqlEditor";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import useAppStore from "@/stores/appStore";
import CHUITable from "../CHUITable";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SqlTabProps {
  tabId: string;
}

interface QueryResults {
  meta: any[];
  data: any[];
  message: string | null;
  statistics: {
    elapsed: number;
    rows_read: number;
    bytes_read: number;
  };
  error: string | null;
  query_id?: string;
}

const SqlTab: React.FC<SqlTabProps> = ({ tabId }) => {
  const { getTabById, runQuery, fetchDatabaseData } = useAppStore();
  const tab = getTabById(tabId);
  const [timer, setTimer] = useState<number>(0);

  const [results, setResults] = useState<QueryResults | null>(null);



  const handleRunQuery = async (query: string) => {
    try {
      const shouldRefresh =
        /^\s*(CREATE|DROP|ALTER|TRUNCATE|RENAME|INSERT|UPDATE|DELETE)\s+/i.test(
          query
        );

      const queryResults = await runQuery(query, tabId);

      if (queryResults !== undefined && queryResults !== null) {
        setResults(queryResults);

        if (shouldRefresh) {
          await fetchDatabaseData();
          toast.success("Data Explorer refreshed due to schema change");
        }
      }
    } catch (error) {
      console.error("Error running query:", error);
      toast.error(
        "Failed to execute query. Please check the console for more details."
      );
      // The error is already set in the tab state by the runQuery function
    }
  };

  const renderResults = () => {
    if (tab?.isLoading) {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex items-center justify-center h-full space-x-4">
            <Loader2 size={24} className="animate-spin" />
            <p>Running query</p>
            <p>{timer.toFixed(1)}s</p>
          </div>
        </div>
      );
    }

    if (tab?.error) {
      return (
        <div className="overflow-auto text-sm p-2">
          <div className="p-4 border text-xs rounded-md text-red-600 bg-red-300/10 border-red-500">
            {tab.error}
          </div>
        </div>
      );
    }

    if (!results) {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <p>Run a query to see results here</p>
        </div>
      );
    }

    const tableResult = {
      meta: results.meta,
      data: results.data,
      statistics: results.statistics,
      message: results.message || results.error || undefined,
      query_id: results.query_id,
    };

    return (
      <div className="h-full w-full flex flex-col">
        <CHUITable result={tableResult} initialPageSize={20} />
      </div>
    );
  };

  if (!tab) return null;

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={50} minSize={0}>
          <SQLEditor tabId={tabId} onRunQuery={handleRunQuery} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={0}>
          <div className="h-full w-full flex flex-col">{renderResults()}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SqlTab;
