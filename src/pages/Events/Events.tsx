import {
  Container,
  Wrapper,
  EventCardsSection,
  EventCard,
  EventCardTitle,
  EventCardImgDiv,
  EventCardImg,
  EventCardTags,
  EventCardTag,
  EventCardInfos,
  EventCardInfoText,
  EventCardInfoIcon,
  EventCardInfoDiv,
  EventCards,
  PageLink,
  NewEventButton,
  BannerSection,
  PageTitle,
  PageSubtitle,
  EventCardInfoIconDiv,
  ButtonText,
} from "./EventsStyle";
import CapacityIcon from "../../assets/capacityIcon.png";
import DateIcon from "../../assets/dateIcon.png";
import { firestore } from "../../utilities/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Community } from "iconoir-react";
import Masonry from "@mui/lab/Masonry";
import { EventData } from "@/interface";

const Events = () => {
  const [eventData, setEventData] = useState<Array<EventData>>([]);
  const [masonryConfig, setMasonryConfig] = useState({
    columns: 4,
    spacing: 2,
  });

  useEffect(() => {
    const fetchEventsData = async () => {
      const db = firestore;
      try {
        const q = query(collection(db, "Events"));
        const querySnapShot = await getDocs(q);
        const newData = querySnapShot.docs.map((doc) => {
          const eventDataFromDoc = doc.data() as EventData;
          return eventDataFromDoc;
        });
        setEventData(newData);
      } catch (err) {
        console.error("Error when fetch events data : ", err);
      }
    };
    fetchEventsData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 616) {
        setMasonryConfig({ columns: 1, spacing: 2 });
      } else if (window.innerWidth < 1081) {
        setMasonryConfig({ columns: 2, spacing: 2 });
      } else if (window.innerWidth < 1235) {
        setMasonryConfig({ columns: 3, spacing: 2 });
      } else {
        setMasonryConfig({ columns: 4, spacing: 2 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <BannerSection>
        <PageTitle>Events</PageTitle>F
        <PageSubtitle>Be the part of community</PageSubtitle>
      </BannerSection>
      <Wrapper>
        <EventCardsSection>
          <PageLink to="/newEvent" className="newEventBtn">
            <NewEventButton>
              <Community color="#f7f7f7" />
              <ButtonText>New Event</ButtonText>
            </NewEventButton>
          </PageLink>

          <EventCards>
            <Masonry
              columns={masonryConfig.columns}
              spacing={masonryConfig.spacing}
            >
              {eventData.map((data, index) => (
                <PageLink key={index} to={`/event/${data.eventUid}`}>
                  <EventCard>
                    <EventCardImgDiv>
                      <EventCardImg src={data.coverImage} />
                    </EventCardImgDiv>
                    <EventCardTitle>{data.title}</EventCardTitle>
                    <EventCardTags>
                      {data.tags?.map((tag, index) => (
                        <EventCardTag key={index}>{tag}</EventCardTag>
                      ))}
                    </EventCardTags>
                    <EventCardInfos>
                      <EventCardInfoDiv>
                        <EventCardInfoIconDiv>
                          <EventCardInfoIcon src={DateIcon}></EventCardInfoIcon>
                        </EventCardInfoIconDiv>
                        <EventCardInfoText>{data.date}</EventCardInfoText>
                      </EventCardInfoDiv>
                      <EventCardInfoDiv>
                        <EventCardInfoIconDiv>
                          <EventCardInfoIcon
                            src={CapacityIcon}
                          ></EventCardInfoIcon>
                        </EventCardInfoIconDiv>
                        <EventCardInfoText>
                          {data.participantsUid.length} / {data.maxParticipants}
                        </EventCardInfoText>
                      </EventCardInfoDiv>
                    </EventCardInfos>
                  </EventCard>
                </PageLink>
              ))}
            </Masonry>
          </EventCards>
        </EventCardsSection>
      </Wrapper>
    </Container>
  );
};

export default Events;
