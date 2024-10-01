import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Building2,
  Users,
  User,
  Calendar,
  Hash,
  AtSign,
  Mail,
} from "lucide-react";

import {
  getInitials,
  bgColorsByInitials,
  bgGradientByInitials,
} from "@/lib/helpers";

import { Organization } from "@/types/types";

interface OrganizationDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization | null;
}

const OrganizationDetailDialog: React.FC<OrganizationDetailDialogProps> = ({
  isOpen,
  onClose,
  organization,
}) => {
  if (!organization) return null;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[600px] m-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
        aria-describedby="organization-details"
        aria-description="Detailed information about the organization"
      >
        <DialogHeader>
          <DialogTitle
            className={`text-2xl font-bold items-center gap-2 ${bgGradientByInitials(
              getInitials(organization.name)
            )} text-transparent bg-clip-text`}
          >
            {organization.name}
          </DialogTitle>
          <DialogDescription
            aria-description="Details about the organization"
            id="organization-details"
          >
            Detailed information about {organization.name} organization.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Building2 className="h-10 w-10 text-gray-500" />
                <div>
                  <h3 className="text-lg font-semibold">{organization.name}</h3>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <AtSign className="h-4 w-4" aria-hidden="true" />
                    <span aria-label="Organization slug">
                      {organization.slug}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 text-sm cursor-help">
                        <Hash className="h-4 w-4" aria-hidden="true" />
                        <span aria-label="Organization ID">
                          ID: {organization._id}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Unique identifier for the organization</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  <span aria-label="Number of members">Members: </span>
                  <Badge variant="secondary">
                    {organization.members.length}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span aria-label="Owner">Owner: </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-medium cursor-help">
                          {organization.owner.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{organization.owner.email}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span aria-label="Creation date">
                    Created: {formatDate(organization.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span aria-label="Last update date">
                    Updated: {formatDate(organization.updatedAt)}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="members">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Members ({organization.members.length})
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {organization.members.map((member) => (
                        <div
                          key={member._id}
                          className="flex items-center gap-3 border p-2.5 rounded-md"
                        >
                          <Avatar>
                            <AvatarFallback
                              className={`h-10 w-10 font-bold ${bgColorsByInitials(
                                getInitials(member.name || "")
                              )}`}
                            >
                              {getInitials(member.name || "")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {member.email}
                            </p>
                          </div>
                          {member._id === organization.owner._id && (
                            <Badge variant="secondary" className="ml-auto">
                              Owner
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationDetailDialog;
