import FlavourWheel from "./FlavourWheel";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { firestore } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Container,
  InfoSection,
  PageLink,
  WheelSection,
  Wrapper,
  OrganizedEventsSection,
  ParticipatedEventsSection,
  EventCard,
  PictureDiv,
  Picture,
  InfoText,
  InfoDiv,
  SectionTitle,
  SectionDivider,
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
  const [organizedEventsData, setOrganizedEventsData] = useState<
    Array<EventData>
  >([]);

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

  const fetchOrganizedEventsData = async (userUid: string) => {
    try {
      const organizedEventsRef = collection(db, "Events");
      const q = query(organizedEventsRef, where("organizerUid", "==", userUid));
      const querySnapshot = await getDocs(q);

      const newData = querySnapshot.docs.map((doc) => {
        const eventDataFromFirestore = doc.data() as EventData;
        return eventDataFromFirestore;
      });
      setOrganizedEventsData(newData);
    } catch (err: any) {
      console.error("Error when fetching organized events : ", err.message);
    }
  };

  useEffect(() => {
    const user = getAuth();

    const unsubscribe = onAuthStateChanged(user, (user) => {
      if (user) {
        fetchUserData(user.uid);
        fetchWheelData(user.uid);
        fetchEventsData(user.uid);
        fetchOrganizedEventsData(user.uid);
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
          <InfoSection>
            <PictureDiv>
              <Picture />
            </PictureDiv>
            <InfoDiv>
              <InfoText>{userData?.userName}</InfoText>
              <InfoText>{userData?.email}</InfoText>
              <InfoText>{userData?.userUid}</InfoText>
            </InfoDiv>
          </InfoSection>

          <OrganizedEventsSection>
            <SectionTitle>Organized Events</SectionTitle>
            <SectionDivider />
            {organizedEventsData.map((event, index) => (
              <PageLink to={`/event/${event.eventUid}`} key={index}>
                <EventCard>
                  <InfoText className="eventCardText">{event.title}</InfoText>
                  <InfoText className="eventCardText">{event.date}</InfoText>
                  <InfoText className="eventCardText">
                    {event.location}
                  </InfoText>
                </EventCard>
              </PageLink>
            ))}
          </OrganizedEventsSection>

          <ParticipatedEventsSection>
            <SectionTitle>Participated Events</SectionTitle>
            <SectionDivider />
            {eventData.map((event, index) => (
              <PageLink to={`/event/${event.eventUid}`} key={index}>
                <EventCard>
                  <InfoText className="eventCardText">{event.title}</InfoText>
                  <InfoText className="eventCardText">{event.date}</InfoText>
                  <InfoText className="eventCardText">{event.time}</InfoText>
                  <InfoText className="eventCardText">
                    {event.location}
                  </InfoText>
                </EventCard>
              </PageLink>
            ))}
          </ParticipatedEventsSection>

          <WheelSection>
            <SectionTitle>FlavourWheel</SectionTitle>
            <SectionDivider />
            {wheelData ? <FlavourWheel data={wheelData} /> : null}
          </WheelSection>
        </Wrapper>
      </Container>
    </>
  );
};
export default Member;
