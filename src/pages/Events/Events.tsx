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

const Events = () => {
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
          <PageLink to="/newEvents">
            <NewEventButton>新活動</NewEventButton>
          </PageLink>
          <EventCardSectionTitle>艾雷島</EventCardSectionTitle>
          <EventCards>
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
          </EventCards>
        </EventCardsSection>
      </Wrapper>
    </Container>
  );
};

export default Events;
