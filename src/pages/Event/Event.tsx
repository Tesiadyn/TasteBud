import { useParams } from "react-router-dom";
import { firestore } from "../../utilities/firebase";
import { query, where, getDocs, collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  Container,
  Wrapper,
  EventSection,
  EventImgDiv,
  EventImg,
  EventTitle,
  EventText,
} from "./EventStyle";
import { getAuth } from "firebase/auth";

interface EventData {
  coverImage: string;
  date: string;
  eventUid: string;
  location: string;
  maxParticipants: number;
  organizerUid: string;
  participantsUid: (string | null)[];
  text: string;
  title: string;
}

const Event = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const db = firestore;
  const auth = getAuth();
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const q = query(collection(db, "Events"), where("eventUid", "==", id));
        const querySnapshot = await getDocs(q);
        const eventData = querySnapshot.docs.map(
          (doc) => doc.data() as EventData
        );
        setEventData(eventData[0]);
      } catch (err) {
        console.error("Error when fatching product data : ", err);
      }
    };
    const checkIsAuthor = async () => {
      if (!auth || !auth.currentUser || !id){
        return;
      }
      try {
        const currentUserUid = auth.currentUser?.uid;
        const eventRef = doc(firestore, "Events", id);
        const eventDocSnapshot = await getDoc(eventRef);
        const eventData = eventDocSnapshot.data();
        if (eventData && eventData.organizerUid === currentUserUid) {
          setIsAuthor(true);
        }
      } catch (err: any) {
        console.error("Error when checking author : ", err.message);
      }
    };
    fetchEventData();
    checkIsAuthor();
  }, []);

  return (
    <Container>
      <Wrapper>
        <EventSection>
          {isAuthor ? (<h1>You are author</h1>): (<h1>You are not author</h1>)}
          <EventImgDiv>
            <EventImg src={eventData?.coverImage} />
          </EventImgDiv>
          <EventTitle>{eventData?.title}</EventTitle>
          <EventText>{eventData?.text}</EventText>
          <EventText className="location">{eventData?.location}</EventText>
          <EventText className="maxParticipants">
            {eventData?.maxParticipants}
          </EventText>
        </EventSection>
      </Wrapper>
    </Container>
  );
};
export default Event;
