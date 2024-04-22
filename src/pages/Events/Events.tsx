import {
  Container,
  HeroboxDiv,
  HeroboxTitle,
  HeroboxSubtitle,
  SearchBox,
  SearchInput,
  SearchButton,
  Wrapper,
  EventCardsSection,
  EventCardSectionTitle,
  EventCard,
  EventCardTitle,
  EventCardImgDiv,
  EventCardImg,
  EventCardTags,
  EventCardTag,
  EventCardInfos,
  EventCardDateText,
  EventCardCapacityText,
  EventCardCapacityIcon,
  EventCardDateIcon,
  EventCardDateDiv,
  EventCardCapacityDiv,
  EventCards,
  PageLink,
  NewEventButton,
} from "./EventsStyle";
import CapacityIcon from "../../assets/capacityIcon.png";
import DateIcon from "../../assets/dateIcon.png";
import { firestore } from "../../utilities/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface EventData {
  coverImage: string;
  location: string;
  maxParticipants: number;
  organizerUid: string;
  text: string;
  title: string;
  date: string;
  eventUid: string;
}

const Events = () => {
  const [eventData, setEventData] = useState<Array<EventData>>([]);

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
  console.log(eventData);

  return (
    <Container>
      <HeroboxDiv>
        <HeroboxTitle>探索最有意思的品酒會</HeroboxTitle>
        <HeroboxSubtitle>探索、發現新的味蕾饗宴</HeroboxSubtitle>
        <SearchBox>
          <SearchInput />
          <SearchButton />
        </SearchBox>
      </HeroboxDiv>
      <Wrapper>
        <EventCardsSection>
          <PageLink to="/newEvent">
            <NewEventButton>新活動</NewEventButton>
          </PageLink>
          <EventCardSectionTitle>艾雷島</EventCardSectionTitle>
          <EventCards>  
            {eventData.map((data, index) => (
              <PageLink key={index} to={`/event/${data.eventUid}`}>
                <EventCard >
                  <EventCardImgDiv>
                    <EventCardImg src={data.coverImage} />
                  </EventCardImgDiv>
                  <EventCardTitle>{data.title}</EventCardTitle>
                  <EventCardTags>
                    <EventCardTag></EventCardTag>
                  </EventCardTags>
                  <EventCardInfos>
                    <EventCardDateDiv>
                      <EventCardDateIcon src={DateIcon}></EventCardDateIcon>
                      <EventCardDateText>6/1</EventCardDateText>
                    </EventCardDateDiv>
                    <EventCardCapacityDiv>
                      <EventCardCapacityIcon
                        src={CapacityIcon}
                      ></EventCardCapacityIcon>
                      <EventCardCapacityText>{data.text}</EventCardCapacityText>
                    </EventCardCapacityDiv>
                  </EventCardInfos>
                </EventCard>
              </PageLink>
            ))}
          </EventCards>
        </EventCardsSection>
      </Wrapper>
    </Container>
  );
};

export default Events;
