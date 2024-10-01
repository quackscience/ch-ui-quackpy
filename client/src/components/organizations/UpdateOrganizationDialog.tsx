import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Organization } from "@/types/types";

const formSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
});

interface UpdateOrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization | null;
  onUpdate: (id: string, name: string) => Promise<void>;
}

const UpdateOrganizationDialog: React.FC<UpdateOrganizationDialogProps> = ({
  isOpen,
  onClose,
  organization,
  onUpdate,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization?.name || "",
    },
  });

  useEffect(() => {
    if (organization) {
      form.reset({ name: organization.name });
    }
  }, [organization, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (organization) {
      try {
        await onUpdate(organization._id, values.name);
        toast.success(`Organization ${values.name} updated successfully`);
        onClose();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to update organization");
        }
      }
    }
  };

  if (!organization) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Organization</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Organization</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrganizationDialog;
