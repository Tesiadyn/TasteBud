import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser);
    return unsubscribe;
  }, []);
  return user;
};
