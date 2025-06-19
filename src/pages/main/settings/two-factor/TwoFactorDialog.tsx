import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/password-input/password-input";

interface TwoFactorDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isEnabled: boolean;
}

const passwordSchema = z.object({
  password: z.string().min(1, "Password is required."),
});
type PasswordFormValues = z.infer<typeof passwordSchema>;

const totpSchema = z.object({
  code: z.string().length(6, "TOTP code must be 6 digits."),
});
type TotpFormValues = z.infer<typeof totpSchema>;

export const TwoFactorDialog = ({ isOpen, onOpenChange, isEnabled }: TwoFactorDialogProps) => {
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const [totpURI, setTotpURI] = useState<string | null>(null);

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const totpForm = useForm<TotpFormValues>({
    resolver: zodResolver(totpSchema),
  });

  const handlePasswordSubmit = async (values: PasswordFormValues) => {
    const { data, error } = await authClient.twoFactor.enable({ password: values.password });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data?.totpURI) {
      setTotpURI(data.totpURI);
      setStep(2);
    }
  };

  const handleTotpSubmit = async (values: TotpFormValues) => {
    const { error } = await authClient.twoFactor.verifyTotp({ code: values.code });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Two-factor authentication enabled successfully!");
    queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    onOpenChange(false);
    reset();
  };

  const handleDisable = async (values: PasswordFormValues) => {
    const { error } = await authClient.twoFactor.disable({ password: values.password });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Two-factor authentication disabled successfully!");
    queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    onOpenChange(false);
    reset();
  }

  const reset = () => {
    setStep(1);
    setTotpURI(null);
    passwordForm.reset();
    totpForm.reset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  const onSubmit = isEnabled ? handleDisable : handlePasswordSubmit;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEnabled ? "Disable" : "Enable"} Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            {isEnabled ? "Enter your password to disable 2FA." : "Complete the steps to enable 2FA."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                  {passwordForm.formState.isSubmitting ? "Verifying..." : "Continue"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}

        {step === 2 && totpURI && (
          <div className="flex flex-col items-center">
            <p className="text-center text-muted-foreground mb-4">
              Scan the QR code with your authenticator app, then enter the 6-digit code below.
            </p>
            <div className="p-4 bg-white rounded-lg">
              <QRCodeSVG value={totpURI} size={200} />
            </div>
            <Form {...totpForm}>
              <form onSubmit={totpForm.handleSubmit(handleTotpSubmit)} className="space-y-4 mt-4 w-full">
                <FormField
                  control={totpForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TOTP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" disabled={totpForm.formState.isSubmitting}>
                    {totpForm.formState.isSubmitting ? "Verifying..." : "Verify & Enable"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}; 