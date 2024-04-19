import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "../../assets/search.png";

export const Container = styled.div`
  width: 100%;
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
  margin: 0 auto;
  width: 1440px;
  background-color: #c3c3c3;
`;
export const EventCardsSection = styled.div`
  width: 100%;
  background-color: #fff0e5;
`;
export const EventCardSectionTitle = styled.h2`
  margin: 0;
  text-align: center;
`;
export const EventCards = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
export const EventCard = styled.div`
  width: 400px;
  height: 400px;
  background-color: #40759d;
  display: flex;
  flex-direction: column;
`;
export const EventCardImgDiv = styled.div`
  width: 100%;
`;
export const EventCardImg = styled.img`
  width: 100%;
`;
export const EventCardTitle = styled.h3`
  color: #f7f7f7;
`;
export const EventCardTags = styled.ul``;
export const EventCardTag = styled.li`
  list-style: none;
`;
export const EventCardInfos = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const EventCardDateDiv = styled.div`
  display: flex;
`;
export const EventCardDateIcon = styled.img``;
export const EventCardDateText = styled.p`
  margin: 0;
`;
export const EventCardCapacityDiv = styled.div`
  display: flex;
`;
export const EventCardCapacityIcon = styled.img``;
export const EventCardCapacityText = styled.p`
  margin: 0;
`;
export const PageLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;
export const NewEventButton = styled.button`
  cursor: pointer;
  display: block;
  margin-left: auto;
`;
