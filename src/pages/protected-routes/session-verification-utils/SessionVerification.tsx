import React, { type PropsWithChildren } from "react";
import {
    Navigate,
    useLocation,
} from "react-router";
import SessionProvider from "./useSessionStore";
import { Spinner } from "@/components/ui/spinner";
import type { BetterAuthResponse } from "./ProtectedRoute";

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

    if (queryData.error || queryData.data === null) {
        return <Navigate to={redirectOnErrorPath} state={{ from: location }} replace />
    }

    if (queryData.isPending) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center" >
                <Spinner />
            </div>
        )
    };

    if (queryData.data) {
        return (
            <SessionProvider isAuthenticated={true}>
                {children}
            </SessionProvider >
        );
    }
    
    return null
};