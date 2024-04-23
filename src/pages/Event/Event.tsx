import { useParams } from "react-router-dom";
import { firestore } from "../../utilities/firebase";
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
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
interface EditEventFormProps {
  eventId?: string;
  initTitle?: string;
  initLocation?: string;
  initParticipants?: number;
  initText?: string;
  initDate?: string;
  onFormClose?: () => void;
}
const EditEventForm = ({
  initTitle = "",
  initLocation = "",
  initParticipants = 0,
  initText = "",
  initDate = "",
  onFormClose,
}: EditEventFormProps) => {
  const [title, setTitle] = useState(initTitle);
  const [location, setLocation] = useState(initLocation);
  const [maxParticipants, setMaxParticipants] =
    useState<number>(initParticipants);
  const [text, setText] = useState(initText);
  const [date, setDate] = useState(initDate);
  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!id) {
        console.error("Id is undefined.");
        return;
      }
      const eventRef = doc(firestore, "Events", id);
      await updateDoc(eventRef, {
        date: date,
        location: location,
        title: title,
        text: text,
        maxParticipants: maxParticipants,
      });
      console.log("Event data updated.");
      onFormClose && onFormClose();
    } catch (err) {
      console.error("Error when submitting edited event data");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">標題</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="location">地點</label>
      <input
        id="location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label htmlFor="maxParticipants">名額人數</label>
      <input
        id="maxParticipants"
        type="number"
        value={maxParticipants}
        onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
      />
      <label htmlFor="text">活動內容</label>
      <input
        id="text"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label htmlFor="edit-title">日期</label>
      <input
        id="edit-title"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">編輯完成</button>
    </form>
  );
};
const Event = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const { id } = useParams();
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
      if (!auth || !auth.currentUser || !id) {
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

  const handleClick = () => {
    const currentUser = auth.currentUser;
    if (!currentUser || !id) {
      console.error("Not logged in.");
      return;
    }
    const currentUserUid = currentUser.uid;
    const handleDeleteEvent = async () => {
      try {
        /* ---------------------------- delete event doc ---------------------------- */
        const eventRef = doc(firestore, "Events", id);
        const organizerRef = doc(firestore, "Members", currentUserUid);
        await deleteDoc(eventRef);
        console.log("Evnet deleted");
        /* -------------------------- update organizer doc -------------------------- */
        const organizerSnapshot = await getDoc(organizerRef);
        if (organizerSnapshot.exists()) {
          const organizerData = organizerSnapshot.data();
          const organizedEvents = organizerData.organizedEvents || [];
          const index = organizedEvents.indexOf(id);
          if (index !== -1) {
            organizedEvents.splice(index, 1);
          }
          await updateDoc(organizerRef, { organizedEvents: organizedEvents });
          console.log("Organizer event removed.");
        }
        /* ------------------------- update paticipants doc ------------------------- */
        const participantsCollectionRef = collection(firestore, "Member");
        const participantsQuery = query(
          participantsCollectionRef,
          where("attendedEvents", "array-contains", id)
        );
        const participantsSnapshot = await getDocs(participantsQuery);

        participantsSnapshot.forEach(async (participantDoc) => {
          const participantData = participantDoc.data();
          const participantEvents = participantData.participantEvents || [];

          const eventIndex = participantEvents.indexOf(id);
          if (eventIndex !== -1) {
            participantEvents.splice(eventIndex, 1);
            await updateDoc(participantDoc.ref, {
              participantEvents: participantEvents,
            });
            console.log(
              `Participant event removed successfully for user ${participantDoc.id}`
            );
          }
        });
      } catch (err: any) {
        console.error("Error when deleting event : ", err.message);
      }
    };
    handleDeleteEvent();
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCloseForm = () => {
    setIsEditing(false);
  };
  return (
    <Container>
      <Wrapper>
        <EventSection>
          {isAuthor ? (
            <>
              <button onClick={handleClick}>Delete</button>
              <h1>You are author</h1>
            </>
          ) : (
            <h1>You are not author</h1>
          )}
          {isAuthor && (
            <>
              <button onClick={handleEditClick}>編輯</button>
            </>
          )}
          {isEditing && (
            <>
              <EditEventForm
                eventId={id}
                initTitle={eventData?.title}
                initLocation={eventData?.location}
                initParticipants={eventData?.maxParticipants}
                initText={eventData?.text}
                initDate={eventData?.date}
                onFormClose={handleCloseForm}
              />
            </>
          )}
          <EventImgDiv>
            <EventImg src={eventData?.coverImage} />
          </EventImgDiv>
          <EventTitle>{eventData?.title}</EventTitle>
          <EventText>{eventData?.text}</EventText>
          <EventText className="location">{eventData?.location}</EventText>
          <EventText className="maxParticipants">
            {eventData?.maxParticipants}
          </EventText>
          <EventText>{eventData?.date}</EventText>
        </EventSection>
      </Wrapper>
    </Container>
  );
};
export default Event;
