import { type UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Lock } from "lucide-react";
import type { SignUpFormValues } from "./schema";
import { PasswordInput } from "@/components/password-input/password-input";
import { PasswordStrengthInput } from "@/components/password-input/password-strength-input";

interface PasswordSetupStepProps {
  form: UseFormReturn<SignUpFormValues>;
}

export function PasswordSetupStep({ form }: PasswordSetupStepProps) {
  return (
    <div className="space-y-4 animate-fade-in-up">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="password" className="text-sm font-medium">Password</FormLabel>
            <FormControl>
              <PasswordStrengthInput
                placeholder="Create a strong password"
                icon={Lock}
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</FormLabel>
            <FormControl>
              <PasswordInput
                className="transition-all duration-300"
                placeholder="Confirm your password"
                icon={Lock}
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