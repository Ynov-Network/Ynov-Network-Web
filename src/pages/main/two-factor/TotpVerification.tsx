import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useLocation } from "react-router";
import { QRCodeSVG } from 'qrcode.react';
import { toast } from "sonner";

export function TotpVerification() {
  const [totpCode, setTotpCode] = useState("");
  const location = useLocation();

  const handleVerifyTotp = async () => {
    const { error } = await authClient.twoFactor.verifyTotp({
      code: totpCode
    })

    if (error) {
      toast.error(error.message);
      return;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Two-Factor Authentication</h1>
      <p className="text-muted-foreground mb-6">
        To enhance your account security, please set up Two-Factor Authentication.
      </p>
      <div>
        <QRCodeSVG value={location.state.totpURI} />,
      </div>
      <form onSubmit={handleVerifyTotp}>
        <Input type="text" onChange={(e) => setTotpCode(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
          Verify
        </button>
      </form>
    </div>
  );
}