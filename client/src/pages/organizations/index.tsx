import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useAppStore from "@/stores/appStore";
import OrganizationList from "@/components/organizations/OrganizationList";
import AddOrganizationDialog from "@/components/AddOrganizationDialog";
import { Search, Plus, ArrowUpDown, Tally5, Info } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import InfoDialog from "@/components/InfoDialog";
import { Organization } from "@/types/types";

function OrganizationsPage() {
  const {
    organizations,
    fetchOrganizations,
    user,
    deleteOrganization,
    orgIsLoading,
    orgError,
  } = useAppStore();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "memberCount">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchOrganizationsHandler = useCallback(async () => {
    try {
      await fetchOrganizations();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch organizations");
      }
    }
  }, [fetchOrganizations]);

  useEffect(() => {
    fetchOrganizationsHandler();
  }, [fetchOrganizationsHandler]);

  useEffect(() => {
    if (orgError) {
      toast.error(orgError);
    }
  }, [orgError]);

  const userSelectedOrganization = user?.activeOrganization?._id;

  const filteredOrganizations = organizations
    .filter((org) => org.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc"
          ? a.members.length - b.members.length
          : b.members.length - a.members.length;
      }
    });

  const toggleSort = () => {
    if (sortBy === "name") {
      setSortBy("memberCount");
    } else {
      setSortBy("name");
    }
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDeleteOrganization = async (organizationId: string) => {
    try {
      await deleteOrganization(organizationId);
      toast.info(`Organization deleted successfully`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete organization");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-8xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          Organizations
          <Info
            className="h-6 w-6 text-blue-500 cursor-pointer ml-3"
            onClick={() => setIsInfoDialogOpen(true)}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <Button
            className="bg-orange-400/30 text-orange-600 hover:bg-orange-400/40"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Organization
          </Button>
          <div className="relative w-64">
            <Input
              className="pr-10"
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="right-3 top-2 absolute" />
          </div>
        </div>

        <div className="mb-4">
          <Button
            variant="outline"
            onClick={toggleSort}
            className="flex items-center"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort by {sortBy === "name" ? "Name" : "Member Count"} (
            {sortOrder === "asc" ? "Ascending" : "Descending"})
          </Button>
        </div>

        <div className="flex-grow overflow-hidden">
          {orgIsLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : filteredOrganizations.length > 0 ? (
            <OrganizationList
              organizations={filteredOrganizations}
              userSelectedOrganization={userSelectedOrganization ?? null}
              onDelete={(org: Organization) =>
                handleDeleteOrganization(org._id)
              }
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <Tally5 className="h-12 w-12 text-gray-500 mb-2" />
              <p className="text-sm text-gray-500 mb-4">
                No organizations found. Try adjusting your search or add a new
                organization.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Organization
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      <AddOrganizationDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <InfoDialog
        isOpen={isInfoDialogOpen}
        onClose={() => setIsInfoDialogOpen(false)}
        title="Organizations"
        description="Organizations are groups of users."
        steps={[
          "Create a new organization by clicking the 'Add Organization' button.",
          "View organization details by clicking on an organization card.",
          "Edit or delete an organization using the actions on the table",
          "Search for organizations using the search bar.",
          "Sort organizations by name or member count by clicking the 'Sort by' button.",
          "Add, or remove members from an organization using the actions",
          "Organizations have members and credentials assigned to it.",
        ]}
        docsUrl="https://ch-ui.caioricciuti.com/organizations"
      />
    </div>
  );
}

export default OrganizationsPage;