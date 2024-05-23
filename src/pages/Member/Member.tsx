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
  EventsSection,
  EventCard,
  WheelDiv,
  InfoText,
  InfoDiv,
  SectionTitle,
  SectionDivider,
  NoEventDiv,
  BtnText,
  SectionTitleDiv,
  WheelWrapper,
} from "./MemberStyle";
import { pulsar } from "ldrs";
import {
  List,
  UserCrown,
  User,
  Lifebelt,
  HelpCircleSolid,
} from "iconoir-react";

import { Tooltip } from "react-tooltip";

pulsar.register();

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
      } 
      // else {
      //   navigate("/login");
      // }
    });
    return unsubscribe;
  }, [navigate]);

  const LoadingContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 270px)",
    width: "1440px",
    margin: "0 auto",
    padding: "50px",
    backgroundColor: "#dad8d6",
    borderRadius: "12px",
    boxShadow: "3px 3px 5px 2px rgba(89, 89, 89, 0.3)",
  };
  if (isLoading) {
    return (
      <div style={LoadingContainer}>
        <l-pulsar size="40" speed="1.75" color="black"></l-pulsar>
      </div>
    );
  }

  return (
    <>
      <Container>
        <Wrapper>
          <InfoDiv>
            <InfoSection>
              <InfoText className="infoSectionText">
                Hello! {userData?.userName}
              </InfoText>
              <InfoText>{userData?.email}</InfoText>
            </InfoSection>
            <EventsSection>
              <SectionTitleDiv>
                <UserCrown color="#5e3106" height={32} width={32} />
                <SectionTitle>Organized Events</SectionTitle>
              </SectionTitleDiv>
              <SectionDivider />

              {organizedEventsData.length > 0 ? (
                organizedEventsData.map((event, index) => (
                  <PageLink
                    to={`/event/${event.eventUid}`}
                    key={index}
                    className="eventLink"
                  >
                    <EventCard>
                      <InfoText className="eventCardText">
                        {event.title}
                      </InfoText>
                      <InfoText className="eventCardText">
                        {event.date}
                      </InfoText>
                      <InfoText className="eventCardText">
                        {event.time}
                      </InfoText>
                      <InfoText className="eventCardText">
                        {event.location}
                      </InfoText>
                    </EventCard>
                  </PageLink>
                ))
              ) : (
                <>
                  <NoEventDiv>
                    <InfoText>No events yet, go to </InfoText>
                    <PageLink className="noEventText" to="/events">
                      <List color="#f7f7f7" height={28} width={28} />
                      <BtnText>Events list</BtnText>
                    </PageLink>
                  </NoEventDiv>
                </>
              )}
            </EventsSection>

            <EventsSection>
              <SectionTitleDiv>
                <User color="#5e3106" height={32} width={32} />
                <SectionTitle>Participated Events</SectionTitle>
              </SectionTitleDiv>
              <SectionDivider />
              {eventData.length > 0 ? (
                eventData.map((event, index) => (
                  <PageLink
                    to={`/event/${event.eventUid}`}
                    key={index}
                    className="eventLink"
                  >
                    <EventCard>
                      <InfoText className="eventCardText">
                        {event.title}
                      </InfoText>
                      <InfoText className="eventCardText">
                        {event.date}
                      </InfoText>
                      <InfoText className="eventCardText">
                        {event.time}
                      </InfoText>
                      <InfoText className="eventCardText">
                        {event.location}
                      </InfoText>
                    </EventCard>
                  </PageLink>
                ))
              ) : (
                <>
                  <NoEventDiv>
                    <InfoText>No events yet, go to </InfoText>
                    <PageLink className="noEventText" to="/events">
                      <List color="#f7f7f7" height={28} width={28} />
                      <BtnText>Events list</BtnText>
                    </PageLink>
                  </NoEventDiv>
                </>
              )}
            </EventsSection>
          </InfoDiv>

          <WheelDiv>
            <WheelSection>
              <SectionTitleDiv>
                <Lifebelt color="#5e3106" height={32} width={32} />
                <SectionTitle>FlavourWheel</SectionTitle>
                <HelpCircleSolid
                  className="my-anchor-element"
                  color="#5e3106"
                  height={24}
                  width={24}
                />
                <Tooltip anchorSelect=".my-anchor-element" place="top">
                  <p>
                    After you post a comment about a whisky , your own flavour
                    wheel will shows up
                  </p>
                  <p>
                    Clicking on specific sections of the chart to magnify each
                    flavor category
                  </p>
                </Tooltip>
              </SectionTitleDiv>
              <SectionDivider />
              <InfoText className="smallScreenHint">
                Sorry , flavour wheel needs more screen size to display , please
                use device that having bigger resolution.
              </InfoText>
              <WheelWrapper>
                {wheelData ? (
                  <FlavourWheel data={wheelData} />
                ) : (
                  <NoEventDiv>
                    <InfoText>
                      No datas yet, share some comments to get your own flavour
                      wheel!
                    </InfoText>
                    <PageLink className="noEventText" to="/products">
                      products
                    </PageLink>
                  </NoEventDiv>
                )}
              </WheelWrapper>
            </WheelSection>
          </WheelDiv>
        </Wrapper>
      </Container>
    </>
  );
};
export default Member;
