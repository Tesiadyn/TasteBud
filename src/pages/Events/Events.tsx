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
import EventPic1 from "../../assets/event-picture-1.jpg";
import EventPic2 from "../../assets/event-picture-2.jpg";
import EventPic3 from "../../assets/event-picture-3.jpg";
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
            <PageLink to="/a">
              <EventCard>
                <EventCardImgDiv>
                  <EventCardImg src={EventPic1} />
                </EventCardImgDiv>
                <EventCardTitle>奧地利貴腐甜酒品飲會</EventCardTitle>
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
                    <EventCardCapacityText>75人</EventCardCapacityText>
                  </EventCardCapacityDiv>
                </EventCardInfos>
              </EventCard>
            </PageLink>
            <PageLink to="/a">
              <EventCard>
                <EventCardImgDiv>
                  <EventCardImg src={EventPic2} />
                </EventCardImgDiv>
                <EventCardTitle>蘇格蘭威士忌買桶入門 講座品酒會</EventCardTitle>
                <EventCardTags>
                  <EventCardTag></EventCardTag>
                </EventCardTags>
                <EventCardInfos>
                  <EventCardDateDiv>
                    <EventCardDateIcon src={DateIcon}></EventCardDateIcon>
                    <EventCardDateText>6/9</EventCardDateText>
                  </EventCardDateDiv>
                  <EventCardCapacityDiv>
                    <EventCardCapacityIcon
                      src={CapacityIcon}
                    ></EventCardCapacityIcon>
                    <EventCardCapacityText>50人</EventCardCapacityText>
                  </EventCardCapacityDiv>
                </EventCardInfos>
              </EventCard>
            </PageLink>
            <PageLink to="/a">
              <EventCard>
                <EventCardImgDiv>
                  <EventCardImg src={EventPic3} />
                </EventCardImgDiv>
                <EventCardTitle>J WOW Cafe/Bistro餐酒會</EventCardTitle>
                <EventCardTags>
                  <EventCardTag></EventCardTag>
                </EventCardTags>
                <EventCardInfos>
                  <EventCardDateDiv>
                    <EventCardDateIcon src={DateIcon}></EventCardDateIcon>
                    <EventCardDateText>6/15</EventCardDateText>
                  </EventCardDateDiv>
                  <EventCardCapacityDiv>
                    <EventCardCapacityIcon
                      src={CapacityIcon}
                    ></EventCardCapacityIcon>
                    <EventCardCapacityText>15人</EventCardCapacityText>
                  </EventCardCapacityDiv>
                </EventCardInfos>
              </EventCard>
            </PageLink>
            {eventData.map((data, index) => (
              <EventCard key={index}>
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
            ))}
          </EventCards>
        </EventCardsSection>
      </Wrapper>
    </Container>
  );
};

export default Events;
