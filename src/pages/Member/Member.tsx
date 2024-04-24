import { SunburstChart } from "./SunburstChart";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { firestore } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface WheelData {
  name: string;
  value?: number;
  children?: WheelData[];
}

const Member = () => {
  const [wheelData, setWheelData] = useState<WheelData | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchWheelData(user.uid);
      } else {
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [navigate]);

  const fetchWheelData = async (userUid: string) => {
    setLoading(true);
    const db = firestore;
    try {
      const q = query(
        collection(db, "Members"),
        where("__name__", "==", userUid)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.docs.forEach((doc) => {
        const parsedData = JSON.parse(doc.data().wheelData);

        setWheelData(parsedData);
        setLoading(false);
      });
    } catch (err: any) {
      console.error("Login failed:", err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return wheelData ? <SunburstChart data={wheelData} /> : null;
};

export default Member;
