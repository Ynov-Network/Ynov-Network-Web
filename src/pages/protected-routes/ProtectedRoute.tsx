import { Outlet } from "react-router";
import { authClient } from "@/lib/auth-client" // import the auth client
import SessionVerification from "./session-verification-utils/SessionVerification";
import type { BetterFetchError } from "better-auth/react";

export type BetterAuthSession = typeof authClient.$Infer.Session;

export type BetterAuthResponse = {
  data: BetterAuthSession | null;
  isPending: boolean;
  error: BetterFetchError | null;
  refetch: () => void;
}

export default function ProtectedRoute() {
  const queryData = authClient.useSession();

  return (
    <SessionVerification
      queryData={queryData}
      redirectOnErrorPath="/sign-in"
    >
      <Outlet />
    </SessionVerification>
  );
};