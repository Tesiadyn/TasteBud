import { SunburstChart } from "./SunburstChart";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}

const Member = () => {
  const [data, setData] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWheelData = async () => {
      /* ----------------------------- firebase config ---------------------------- */
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      };
      /* ------------------------------ firebase init ----------------------------- */
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore();

      const email = "test@test.com";
      const password = "112233";

      try {
        const userIdent = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userIdent.user;
        console.log("logged in as :", user.email);

        const userUid = user.uid;

        const q = query(
          collection(db, "Members"),
          where("__name__", "==", userUid)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.docs.forEach((doc) => {
          console.log("Document Data:", doc.data().wheelData);
          const parsedData = JSON.parse(doc.data().wheelData);
          console.log(parsedData);

          setData(parsedData);
          setLoading(false);
        });
      } catch (err: any) {
        console.error("Login failed:", err.message);
        setLoading(false);
      }
    };

    fetchWheelData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <SunburstChart data={data} />;
};

export default Member;
