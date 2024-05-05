import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "../../assets/search.png";
import { Button } from "evergreen-ui";
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
`;
export const PageSubtitle = styled.h3`
  font-size: 18px;
  text-align: center;
  color: #f7f7f7;
`;
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
  background-color: #c3c3c3;
`;
export const EventCardsSection = styled.div`
  width: 100%;
  background-color: #e0caba;
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
  height: 400px;
  width: 400px;
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
  width: 50%;
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
  margin-top: auto;
`;
export const EventCardDateDiv = styled.div`
  display: flex;
`;
export const EventCardDateIcon = styled.img``;
export const EventCardDateText = styled.p`
  margin: 0;
  color: #070707;
`;
export const EventCardCapacityDiv = styled.div`
  display: flex;
`;
export const EventCardCapacityIcon = styled.img``;
export const EventCardCapacityText = styled.p`
  margin: 0;
  color: #070707;
`;
export const PageLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;
export const NewEventButton = styled(Button)`
  cursor: pointer;
  margin: 50px;
`;
