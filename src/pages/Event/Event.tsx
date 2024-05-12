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
  arrayUnion,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  Container,
  Wrapper,
  EventSection,
  EventImgDiv,
  EventTitle,
  EventText,
  EventInfoDiv,
  EditForm,
  EventSubTitle,
  EventSubDiv,
  EventActButton,
  EditFormInputDiv,
  EditFormInput,
  EditFormLabel,
} from "./EventStyle";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";

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
  time: string;
}
interface EditEventFormProps {
  eventId?: string;
  initTitle?: string;
  initLocation?: string;
  initParticipants?: number;
  initText?: string;
  initDate?: string;
  initTime?: string;
  onFormClose?: () => void;
}
const EditEventForm = ({
  initTitle = "",
  initLocation = "",
  initParticipants = 0,
  initText = "",
  initDate = "",
  initTime = "",
  onFormClose,
}: EditEventFormProps) => {
  const [title, setTitle] = useState(initTitle);
  const [location, setLocation] = useState(initLocation);
  const [maxParticipants, setMaxParticipants] =
    useState<number>(initParticipants);
  const [text, setText] = useState(initText);
  const [date, setDate] = useState(initDate);
  const [time, setTime] = useState(initTime);
  const { id } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
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
        time: time,
        location: location,
        title: title,
        text: text,
        maxParticipants: maxParticipants,
      });
      console.log("Event data updated.");
      onFormClose && onFormClose();
      navigate("/events");
    } catch (err) {
      console.error("Error when submitting edited event data");
    }
  };
  return (
    <EditForm onSubmit={handleSubmit}>
      <EditFormInputDiv>
        <EditFormLabel htmlFor="title">Event Title</EditFormLabel>
        <EditFormInput
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={150}
        />
      </EditFormInputDiv>
      <EditFormInputDiv>
        <EditFormLabel htmlFor="location">Location</EditFormLabel>
        <EditFormInput
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={150}
        />
      </EditFormInputDiv>
      <EditFormInputDiv>
        <EditFormLabel htmlFor="maxParticipants">Maximum Guests</EditFormLabel>
        <EditFormInput
          id="maxParticipants"
          type="number"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
          max={200}
        />
      </EditFormInputDiv>
      <EditFormInputDiv>
        <EditFormLabel htmlFor="text">Event Content</EditFormLabel>
        <EditFormInput
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={250}
        />
      </EditFormInputDiv>
      <EditFormInputDiv>
        <EditFormLabel htmlFor="edit-title">Event Date</EditFormLabel>
        <EditFormInput
          id="edit-title"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
        />
      </EditFormInputDiv>
      <EditFormInputDiv>
        <EditFormLabel htmlFor="edit-time">Event Time</EditFormLabel>
        <EditFormInput
          id="edit-time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </EditFormInputDiv>
      <EventActButton type="submit" className="editFormBtn">
        Submit
      </EventActButton>
    </EditForm>
  );
};
const Event = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const { id } = useParams();
  const db = firestore;
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const currentUserUid = currentUser?.uid;
  const navigate = useNavigate();

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
    const checkIsGuest = async () => {
      if (!id) {
        return;
      }
      try {
        const currentUserUid = auth.currentUser?.uid;
        const eventRef = doc(firestore, "Events", id);
        const eventDoc = await getDoc(eventRef);
        if (eventDoc.exists()) {
          console.log("eventDoc exist");
          const eventData = eventDoc.data();
          if (eventData && eventData.participantsUid) {
            const participatedArray = eventDoc.data().participantsUid;
            console.log(participatedArray);

            if (participatedArray.includes(currentUserUid)) {
              console.log("isGuest");
              setIsGuest(true);
            }
          }
        }
      } catch (err: any) {
        console.error("Error when checking is guest or not : ", err.message);
      }
    };
    fetchEventData();
    checkIsAuthor();
    checkIsGuest();
  }, []);
  const handleCancelClick = () => {
    const confirmCancel: boolean = window.confirm(
      "Are you sure to cancel participate this event? This can not be undo."
    );
    if (confirmCancel) {
      const handleCancelEvent = async () => {
        if (!id || !currentUserUid) {
          console.error("Not logged in.");
          return;
        }
        /* ---------------------------- update member doc --------------------------- */
        const participaterRef = doc(firestore, "Members", currentUserUid);
        const participaterSnapshot = await getDoc(participaterRef);
        if (participaterSnapshot.exists()) {
          const participaterData = participaterSnapshot.data();
          const participatedEvents = participaterData.attendedEvents || [];
          const index = participatedEvents.indexOf(id);
          if (index !== -1) {
            participatedEvents.splice(index, 1);
          }
          await updateDoc(participaterRef, {
            attendedEvents: participatedEvents,
          });
          console.log("Member participated events updated.");
        }
        /* ---------------------------- update event doc ---------------------------- */
        const eventRef = doc(firestore, "Events", id);
        const eventSnapshot = await getDoc(eventRef);
        if (eventSnapshot.exists()) {
          const eventData = eventSnapshot.data();
          const guestsData = eventData.participantsUid || [];
          console.log(guestsData);

          const index = guestsData.indexOf(currentUserUid);
          console.log(index);

          if (index !== -1) {
            guestsData.splice(index, 1);
            console.log(guestsData);
          }
          await updateDoc(eventRef, {
            participantsUid: guestsData,
          });
          console.log("Event participants updated.");
        }
      };
      handleCancelEvent();
    }
  };
  const handleDeleteClick = () => {
    const confirmDelete: boolean = window.confirm(
      "Are you sure to delete this event? This can not be undo."
    );

    if (confirmDelete) {
      const handleDeleteEvent = async () => {
        if (!currentUserUid || !id || !firestore) {
          console.error("Not logged in.");
          return;
        }
        try {
          /* ---------------------------- delete event doc ---------------------------- */
          const eventRef = doc(firestore, "Events", id);
          const organizerRef = doc(firestore, "Members", currentUserUid);
          await deleteDoc(eventRef);
          console.log("Event deleted");
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
      navigate("/events");
      toaster.notify("Event deleted.");
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCloseForm = () => {
    setIsEditing(false);
  };
  const handleParticipateClick = () => {
    console.log("handleParticipateClick is running");

    const updateParticipateDoc = async () => {
      if (!firestore || !currentUserUid || !id) {
        console.error("firestore or currentUserUid is undefined.");
        return;
      }
      try {
        const userDocRef = doc(firestore, "Members", currentUserUid);
        await updateDoc(userDocRef, {
          attendedEvents: arrayUnion(id),
        });
        const eventDocRef = doc(firestore, "Events", id);
        await updateDoc(eventDocRef, {
          participantsUid: arrayUnion(currentUserUid),
        });
        toaster.success("Participate success!");
        navigate(`/member`);
      } catch (err: any) {
        console.error("Error when updating participate doc : ", err.message);
      }
    };
    updateParticipateDoc();
  };
  return (
    <Container>
      <Wrapper>
        <EventSection>
          <EventImgDiv
            $backgroundImageUrl={eventData?.coverImage as string}
          ></EventImgDiv>
          <EventInfoDiv>
            {isEditing ? (
              <>
                <EditEventForm
                  eventId={id}
                  initTitle={eventData?.title}
                  initLocation={eventData?.location}
                  initParticipants={eventData?.maxParticipants}
                  initText={eventData?.text}
                  initDate={eventData?.date}
                  initTime={eventData?.time}
                  onFormClose={handleCloseForm}
                />
              </>
            ) : (
              <>
                <EventTitle>{eventData?.title}</EventTitle>
                <EventSubDiv>
                  <EventSubTitle>Location</EventSubTitle>
                  <EventText>{eventData?.location}</EventText>
                </EventSubDiv>
                <EventSubDiv>
                  <EventSubTitle>Maximum guests</EventSubTitle>
                  <EventText>{eventData?.maxParticipants}人</EventText>
                </EventSubDiv>
                <EventSubDiv>
                  <EventSubTitle>Date</EventSubTitle>
                  <EventText>{eventData?.date}</EventText>
                </EventSubDiv>
                <EventSubDiv>
                  <EventSubTitle>Time</EventSubTitle>
                  <EventText>{eventData?.time}</EventText>
                </EventSubDiv>
                <EventSubDiv>
                  <EventSubTitle>Event content</EventSubTitle>
                  <EventText>{eventData?.text}</EventText>
                </EventSubDiv>
                {isAuthor ? (
                  <>
                    <EventActButton onClick={handleEditClick}>
                      Edit event
                    </EventActButton>
                    <EventActButton onClick={handleDeleteClick}>
                      Delete event
                    </EventActButton>
                  </>
                ) : (
                  <>
                    {isGuest ? (
                      <EventActButton onClick={handleCancelClick}>
                        Cancel Participation
                      </EventActButton>
                    ) : (
                      <EventActButton onClick={handleParticipateClick}>
                        Participate event
                      </EventActButton>
                    )}
                  </>
                )}
              </>
            )}
          </EventInfoDiv>
        </EventSection>
      </Wrapper>
    </Container>
  );
};
export default Event;
