import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
  } from "react";
  import { onAuthStateChanged, FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";
  import { auth } from "../firebase"; // your firebase.ts config
  
  type AuthContextType = {
    user: FirebaseAuthTypes.User | null;
    loading: boolean;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const subscriber = onAuthStateChanged(getAuth(), (currentUser: FirebaseAuthTypes.User | null) => {
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