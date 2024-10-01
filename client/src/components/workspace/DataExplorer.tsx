import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCcw, Search, SearchX } from "lucide-react";
import useAppStore from "@/stores/appStore";
import TreeNode, { TreeNodeData } from "./TreeNode";

interface DatabaseNode {
  name: string;
  children: DatabaseNode[];
}

const DatabaseExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { databaseData, tabError, fetchDatabaseData, isLoadingDatabase } =
    useAppStore();

  const filteredData = useMemo(() => {
    if (!searchTerm) return databaseData;
    return databaseData.filter(
      (node: DatabaseNode) =>
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.children.some(
          (child: DatabaseNode) =>
            child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            child.children?.some((grandchild: DatabaseNode) =>
              grandchild.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    );
  }, [databaseData, searchTerm]);

  const refreshDatabases = useCallback(() => {
    fetchDatabaseData();
  }, [fetchDatabaseData]);

  useEffect(() => {
    if (databaseData.length === 0) {
      fetchDatabaseData();
    }
  }, [fetchDatabaseData, databaseData.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Explorer</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={refreshDatabases}
            className="flex items-center"
            disabled={isLoadingDatabase}
          >
            <RefreshCcw
              className={`w-4 h-4 ml-1 ${
                isLoadingDatabase ? "animate-spin" : ""
              }`}
            />
          </Button>
        </div>
        <div className="relative mb-2">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-9 py-2 w-full"
          />
          {searchTerm && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            >
              <SearchX className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <ScrollArea>
        <div className="p-3">
          {isLoadingDatabase ? (
            <div className="p-4 text-muted-foreground w-full flex flex-col items-center justify-center">
              <RefreshCcw className="w-8 h-8 mx-auto animate-spin" />
              <p className="text-center mt-2">Loading...</p>
            </div>
          ) : tabError ? (
            <div className="p-4 text-red-500 w-full flex flex-col items-center justify-center">
              <p className="text-center mt-2">{tabError}</p>
              <Button
                onClick={refreshDatabases}
                variant="outline"
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((node: DatabaseNode) => (
              <TreeNode
                node={{
                  ...node,
                  type: "database",
                  children: node.children.map((child) => ({
                    ...child,
                    type: "table", // or the appropriate type for child nodes
                    children: child.children?.map((grandchild) => ({
                      ...grandchild,
                      type: "view", // or the appropriate type for grandchild nodes
                      children: grandchild.children?.map((greatGrandchild) => ({
                        ...greatGrandchild,
                        type: "view", // or the appropriate type for great-grandchild nodes
                      })) as TreeNodeData[],
                    })) as TreeNodeData[],
                  })) as TreeNodeData[],
                }}
                level={0}
                searchTerm={searchTerm}
                parentDatabaseName={node.name}
                refreshData={refreshDatabases}
              />
            ))
          ) : (
            <div className="p-4 text-muted-foreground w-full flex flex-col items-center justify-center">
              <SearchX className="w-8 h-8 mx-auto" />
              <p className="text-center mt-2">No results found</p>
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm("")}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DatabaseExplorer;
