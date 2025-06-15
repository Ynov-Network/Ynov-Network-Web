import React, { createContext, useContext, type PropsWithChildren } from "react";
import { type StoreApi, useStore } from "zustand";
import { createStore } from "zustand";

export type SessionStore = {
    isAuthenticated: boolean;
    setIsAuthenticated: (state: boolean) => void;
    logout: () => void;
};

type SessionProviderProps = PropsWithChildren & {
    isAuthenticated: boolean;
};

const SessionContext = createContext<StoreApi<SessionStore> | undefined>(undefined);

// Store
// eslint-disable-next-line react-refresh/only-export-components
export function useSessionStore<T>(selector: (state: SessionStore) => T) {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("SessionContext.Provider is missing");
    }
    return useStore(context, selector);
}

// Provider
export default function SessionProvider({ children, isAuthenticated = false }: SessionProviderProps) {
    const [store] = React.useState(() =>
        createStore<SessionStore>((set) => ({
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: (authstate: boolean) => set({ isAuthenticated: authstate }),
            logout: () => set({ isAuthenticated: false }),
        }))
    );
    return (
        <SessionContext.Provider value={store}> {children} </SessionContext.Provider>
    );
}
