import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import type { AuthSession } from "../types/auth";
import { storage } from "../utils/storage";

interface AuthContextValue {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(() => storage.getSession());

  const setSession = useCallback((next: AuthSession) => {
    storage.setSession(next);
    setSessionState(next);
  }, []);

  const logout = useCallback(() => {
    storage.clearSession();
    setSessionState(null);
  }, []);

  const value = useMemo(() => ({ session, setSession, logout }), [session, setSession, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
