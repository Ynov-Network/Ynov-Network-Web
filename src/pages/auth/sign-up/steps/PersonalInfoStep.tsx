import { type UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { AtSign, Mail, User } from "lucide-react";
import type { SignUpFormValues } from "./schema";
import { CustomInput } from "@/components/custom-input";

interface PersonalInfoStepProps {
  form: UseFormReturn<SignUpFormValues>;
}

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  return (
    <div className="space-y-4 animate-fade-in-up ">
      <FormField
        control={form.control}
        name="university_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={field.name} className="text-sm font-medium">University Email</FormLabel>
            <FormControl>
              <CustomInput
                type="email"
                placeholder="your.email@ynov.com"
                icon={Mail}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className="text-sm font-medium">First Name</FormLabel>
              <FormControl>
                <CustomInput
                  type="text"
                  placeholder="John"
                  icon={User}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className="text-sm font-medium">Last Name</FormLabel>
              <FormControl>
                <CustomInput
                  type="text"
                  placeholder="Doe"
                  icon={User} 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={field.name} className="text-sm font-medium">Username</FormLabel>
            <FormControl>
              <CustomInput
                type="text"
                placeholder="johndoe"
                icon={AtSign} 
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}