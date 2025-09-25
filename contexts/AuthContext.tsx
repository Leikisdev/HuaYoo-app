import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
  } from "react";
import { onAuthStateChanged } from "@/services/auth/firebase";
  
type AuthContextType = {
  user: any | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: Setting up auth listener');
    const subscriber = onAuthStateChanged((currentUser: any | null) => {
      console.log('AuthProvider: Auth state changed', { currentUser: currentUser });
      setUser(currentUser);
      setLoading(false);
    });

    return subscriber;
  }, []); 

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};