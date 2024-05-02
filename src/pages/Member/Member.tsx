import FlavourWheel from "./FlavourWheel";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { firestore } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Container,
  InfoSection,
  InfoText,
  PageLink,
  SectionTitle,
  WheelSection,
  Wrapper,
  InfoDiv,
  InfoTitle,
} from "./MemberStyle";

interface WheelData {
  name: string;
  value?: number;
  children?: WheelData[];
}
interface UserData {
  userUid: string;
  userName: string;
  email: string;
  organizedEvents: (string | null)[];
  attendedEvents: (string | null)[];
}
interface EventData {
  coverImage: string;
  date: string;
  eventUid: string;
  location: string;
  maxParticipants: number;
  organizerUid: string;
  participantsUid: (string | null)[];
  tags: (string | null)[];
  text: string;
  title: string;
  time: string;
}

const Member = () => {
  const [wheelData, setWheelData] = useState<WheelData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState<Array<EventData>>([]);

  const navigate = useNavigate();
  const db = firestore;

  const fetchUserData = async (userUid: string) => {
    try {
      const q = query(
        collection(db, "Members"),
        where("__name__", "==", userUid)
      );
      const querySnapshot = await getDocs(q);
      const doc = querySnapshot.docs[0];
      const docFromFirestore = doc.data() as UserData;
      setUserData(docFromFirestore);
    } catch (err: any) {
      console.error("Error when fetching user data : ", err.message);
    }
  };

  const fetchWheelData = async (userUid: string) => {
    setIsLoading(true);

    try {
      const q = query(
        collection(db, "Members"),
        where("__name__", "==", userUid)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const parsedData = JSON.parse(doc.data().wheelData);
        setWheelData(parsedData);
      }
      setIsLoading(false);
    } catch (err: any) {
      console.error("Login failed:", err.message);
      setIsLoading(false);
    }
  };
  const fetchEventsData = async (userUid: string) => {
    const eventsRef = collection(db, "Events");
    const q = query(
      eventsRef,
      where("participantsUid", "array-contains", userUid)
    );
    const querySnapshot = await getDocs(q);

    const newData = querySnapshot.docs.map((doc) => {
      const eventDataFromFirestore = doc.data() as EventData;
      return eventDataFromFirestore;
    });

    setEventData(newData);
  };
  useEffect(() => {
    const user = getAuth();

    const unsubscribe = onAuthStateChanged(user, (user) => {
      if (user) {
        fetchUserData(user.uid);
        fetchWheelData(user.uid);
        fetchEventsData(user.uid);
      } else {
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <Wrapper>
          <WheelSection>
            {wheelData ? <FlavourWheel data={wheelData} /> : null}
          </WheelSection>
          <SectionTitle>Hello! {userData?.userName}</SectionTitle>
          <InfoSection>
            <InfoDiv>
              <InfoTitle>Email</InfoTitle>
              <InfoText>{userData?.email}</InfoText>
            </InfoDiv>
            <InfoDiv>
              <InfoTitle>UID</InfoTitle>
              <InfoText>{userData?.userUid}</InfoText>
            </InfoDiv>
            <InfoDiv>
              <InfoTitle>我參加的活動</InfoTitle>
              {eventData.map((event, index) => (
                <PageLink to={`/event/${event.eventUid}`} key={index}>
                  <InfoText>活動標題{event.title}</InfoText>
                  <InfoText>活動日期{event.date}</InfoText>
                  <InfoText>活動日期{event.time}</InfoText>
                  <InfoText>活動地點{event.location}</InfoText>
                </PageLink>
              ))}
            </InfoDiv>
          </InfoSection>
        </Wrapper>
      </Container>
    </>
  );
};
export default Member;
