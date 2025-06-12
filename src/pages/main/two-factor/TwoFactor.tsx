import { useState } from "react"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function TwoFactor() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleEnable = async (e) => {
    e.preventDefault();
    const { data: qr } = await authClient.twoFactor.enable({
      password: password,
      issuer: "YNetwork",
      fetchOptions: {
        onSuccess(context) {
          console.log("Two-factor authentication enabled successfully:", context);
          toast.success("Two-factor authentication enabled successfully!");
        },
        onError(context) {
          console.error("Error enabling two-factor authentication:", context.error);
          toast.error(`Error enabling two-factor authentication: ${context.error.message}`);
        },
      }
    });

    if (qr) {
      console.log("Two-factor authentication enabled successfully:", qr);
      navigate("/two-factor/verify-totp", { replace: true, state: { totpURI: qr.totpURI } });
    }
  };

  return (
    <div>
      Do you wan to activate two-factor authentication?
      <form onSubmit={handleEnable}>
        <h1>Please enter your password once again</h1>
        <Input type="text" onChange={(e) => setPassword(e.target.value)}  />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )

  
}

export default TwoFactor