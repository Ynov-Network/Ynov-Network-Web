import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateGroup, useUpdateGroup } from "@/services/groups/mutation";
import { toast } from "sonner";
import type { Group } from "@/services/groups/api";

const groupFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  topic: z.enum(['Web Development', 'AI', 'CyberSecurity', 'Data Analytics', 'Games Development']),
  is_public: z.boolean(),
  cover_image_url: z.string().url().optional().or(z.literal('')),
});

type GroupFormValues = z.infer<typeof groupFormSchema>;

interface GroupFormDialogProps {
  group?: Group | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export const GroupFormDialog = ({ group, isOpen, onOpenChange, children }: GroupFormDialogProps) => {
  const queryClient = useQueryClient();
  const isEditMode = !!group;
  const createGroupMutation = useCreateGroup();
  const updateGroupMutation = useUpdateGroup();

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      topic: undefined,
      is_public: true,
      cover_image_url: "",
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && group) {
        form.reset({
          name: group.name,
          description: group.description,
          topic: group.topic,
          is_public: group.is_public,
          cover_image_url: group.cover_image_url ?? "",
        });
      } else {
        form.reset({
          name: "",
          description: "",
          topic: undefined,
          is_public: true,
          cover_image_url: "",
        });
      }
    }
  }, [group, isEditMode, form, isOpen]);

  const onSubmit = async (values: GroupFormValues) => {
    if (isEditMode && group) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, topic, ...updateData } = values;
      const payload = { ...updateData };

      if (!payload.cover_image_url) {
        delete (payload as Partial<typeof payload>).cover_image_url;
      }

      return await updateGroupMutation.mutateAsync({
        groupId: group._id,
        data: payload,
      }, {
        onSuccess: () => {
          toast.success("Group updated successfully!");
          queryClient.invalidateQueries({ queryKey: ["group", { groupId: group._id }] });
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(`Failed to update group: ${error.message}`);
        },
      });
    } else {
      const payload = { ...values };
      if (!payload.cover_image_url) {
        delete payload.cover_image_url;
      }
      return await createGroupMutation.mutateAsync(payload, {
        onSuccess: () => {
          toast.success("Group created successfully!");
          queryClient.invalidateQueries({ queryKey: ["groups"] });
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(`Failed to create event: ${error.message}`);
        },
      })
    }
  };

  const mutation = isEditMode ? updateGroupMutation : createGroupMutation;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Group" : "Create a new group"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the details of your group below." : "Connect with peers who share your interests. Fill out the details below to get started."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2 max-h-[70vh] overflow-y-auto pr-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isEditMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isEditMode}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="CyberSecurity">CyberSecurity</SelectItem>
                      <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                      <SelectItem value="Games Development">Games Development</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cover_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Public Group</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending
                  ? (isEditMode ? "Saving..." : "Creating...")
                  : (isEditMode ? "Save Changes" : "Create Group")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}; 