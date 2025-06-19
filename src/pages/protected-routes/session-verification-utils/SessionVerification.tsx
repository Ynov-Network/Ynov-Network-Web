import React, { type PropsWithChildren } from "react";
import {
    Navigate,
    useLocation,
} from "react-router";
import SessionProvider from "./useSessionStore";
import { Spinner } from "@/components/ui/spinner";
import type { BetterAuthResponse } from "../ProtectedRoute";

type SessionVerificationProps = PropsWithChildren & {
    queryData: BetterAuthResponse;
    redirectOnErrorPath?: string;
    errorComponent?: React.ReactNode;
};

export default function SessionVerification({
    children,
    queryData,
    redirectOnErrorPath = "/sign-in",
}: SessionVerificationProps) {
    const location = useLocation();

    // Handle loading state
    if (queryData.isPending) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    // Handle error state
    if (queryData.error) {
        return <Navigate to={redirectOnErrorPath} state={{ from: location }} replace />;
    }

    // Handle authenticated state
    if (queryData.data) {
        return (
            <SessionProvider isAuthenticated={true}>
                {children}
            </SessionProvider>
        );
    }

    // Handle unauthenticated state (data is null but no error)
    // This is your current case: { data: null, error: null, isPending: false }
    return <Navigate to={redirectOnErrorPath} state={{ from: location }} replace />;
};