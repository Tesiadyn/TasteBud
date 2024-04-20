import { useParams } from "react-router-dom";
import { firestore } from "../../utilities/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
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
  const db = firestore;

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
    fetchEventData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <EventSection>
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
