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
  const { getTabById } = useAppStore();
  const tab = getTabById(tabId);
  const [timer, setTimer] = useState<number>(0); // Timer state in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false); // To track the timer state

  if (!tab) return null;

  const results: QueryResults | undefined =
    tab.results as unknown as QueryResults;

  // Effect to handle timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (tab.isLoading) {
      setTimer(0); // Reset the timer when loading starts
      setIsRunning(true);
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 0.1); // Increment timer every 100ms
      }, 100);
    } else {
      setIsRunning(false); // Stop the timer when loading ends
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tab.isLoading]);

  const renderResults = () => {
    if (tab.isLoading) {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex items-center justify-center h-full space-x-4">
            <Loader2 size={24} className="animate-spin" />
            <p>Running query</p>
            <p>{timer.toFixed(1)}s</p> {/* Display the timer here */}
          </div>
        </div>
      );
    }

    if (tab.error) {
      return (
        <>
          <div className="overflow-auto text-sm p-2">
            <div className="p-4 border text-xs rounded-md text-red-600 bg-red-300/10 border-red-500">
              {tab.error}
            </div>
          </div>
        </>
      );
    }

    if (!results) {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <p>Run a query to see results here</p>
        </div>
      );
    }

    // Prepare the result object for CHUITable
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

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={50} minSize={0}>
          <SQLEditor tabId={tabId} />
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
