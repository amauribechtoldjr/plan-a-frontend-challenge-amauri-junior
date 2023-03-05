import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }

  return context;
}
