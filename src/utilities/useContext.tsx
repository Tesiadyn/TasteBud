import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { User } from "firebase/auth";

interface UserContextValue {
  user: User | null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  isLoading: true,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setisLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: UserContextValue = {
    user,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
