import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    setUser(user);
    setLoading(false);
    return unsubscribe;
  }, []);
  return { user, loading };
};
