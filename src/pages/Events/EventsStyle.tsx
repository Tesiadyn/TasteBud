import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "../../assets/search.png";
import Banner from "../../assets/events-Banner.jpg";

export const BannerSection = styled.section`
  height: 300px;
  width: 100%;
  background-image: url(${Banner});
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const PageTitle = styled.h1`
  margin: 0;
  text-align: center;
  color: #f7f7f7;
  font-size: 44px;
`;
export const PageSubtitle = styled.h3`
  font-size: 18px;
  text-align: center;
  color: #f7f7f7;
`;
export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 270px);
`;
export const HeroboxDiv = styled.div`
  width: 100%;
  height: 250px;
  background-color: #9fc5e5;
`;
export const HeroboxTitle = styled.h1`
  color: #f7f7f7;
  margin: 0;
  font-weight: 400;
`;
export const HeroboxSubtitle = styled.h2`
  color: #f7f7f7;
  margin: 0;
  font-weight: 400;
`;
export const SearchBox = styled.div`
  width: 350px;
  background-color: #f7f7f7;
  position: relative;
`;
export const SearchInput = styled.input`
  width: 100%;
`;
export const SearchButton = styled.button`
  height: 100%;
  width: 30px;
  background-image: url(${SearchIcon});
  background-size: cover;
  background-color: #000;
  border: none;
  position: absolute;
  left: 95%;
`;
export const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #e0caba;
`;
export const EventCardsSection = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 50px 0;
`;
export const EventCardSectionTitle = styled.h2`
  margin: 30px 0;
  text-align: center;
`;
export const EventCards = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;
export const EventCard = styled.div`
  width: 300px;
  border-radius: 4px;
  background-color: #b9a79a;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
export const EventCardImgDiv = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 50%;
`;
export const EventCardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
export const EventCardTitle = styled.h3`
  color: #5e3106;
  font-size: 28px;
  margin: 20px 0 10px;
`;
export const EventCardTags = styled.ul`
  display: flex;
  padding-inline-start: initial;
  margin-bottom: 35px;
`;
export const EventCardTag = styled.li`
  list-style: none;
  color: #5e3106;
  margin-right: 10px;
  border: 1px solid #5e3106;
  padding: 4px;
  border-radius: 4px;
`;
export const EventCardInfos = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
`;
export const EventCardDateDiv = styled.div`
  display: flex;
`;
export const EventCardDateIcon = styled.img``;
export const EventCardCapacityDiv = styled.div`
  display: flex;
  align-items: center;
`;
export const EventCardCapacityIcon = styled.img``;
export const EventCardInfoText = styled.p`
  color: #5e3106;
  margin-bottom: 0;
  margin-left: 4px;
  height: 100%;
`;

export const PageLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;
export const NewEventButton = styled.button`
  border: none;
  background-color: #a5550b;
  padding: 12px;
  border-radius: 12px;
  color: #f7f7f7;
  box-shadow: 2px 3px 6px 1px rgb(202, 91, 0, 0.55);
  transition: all 0.2s;
  margin: 50px 0;
  cursor: pointer;
  &:hover {
    background-color: #be722c;
  }
  &:active {
    box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
  }
`;
