import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageLink = styled(Link)`
  text-decoration: none;
  &.eventLink {
    display: inline-block;
    width: 25%;
    margin-right: 25px;
  }
  &.noEventText {
    font-weight: 500;
    color: #f7f7f7;
    margin: 30px auto 0;
    display: block;
    width: 20%;
    background-color: #a5550b;
    box-shadow: 2px 3px 6px 1px rgb(202, 91, 0, 0.55);
    border-radius: 12px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background-color: #be722c;
    }
    &:active {
      box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
    }
  }
`;
export const Container = styled.div`
  width: 100%;
`;
export const Wrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 50px;
  background-color: #dad8d6;
  border-radius: 12px;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  display: flex;
`;
export const WheelSection = styled.section`
  width: 100%;
  margin: 100px auto 0;
  text-align: center;
`;
export const InfoSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 75px;
`;
export const PictureDiv = styled.div``;
export const Picture = styled.img``;
export const InfoDiv = styled.div`
  width: 50%;
  color: #5e3106;
`;
export const WheelDiv = styled.div`
  width: 50%;
`;
export const OrganizedEventsSection = styled.section`
  width: 100%;
  margin-bottom: 100px;
`;
export const ParticipatedEventsSection = styled.section`
  width: 100%;
`;
export const SectionTitle = styled.h2`
  color: #5e3106;
  text-align: center;
`;
export const EventCard = styled.div`
  padding: 10px 20px;
  text-align: left;
  background-color: #e9e7e0;
  color: #5e3106;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  border-radius: 8px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 1px 1px 2px 1px rgba(89, 89, 89, 0.7);
    background-color: #c4c2bc;
  }
`;
export const InfoText = styled.p`
  &.eventCardText {
    margin-left: 8px;
  }
  &.infoSectionText {
    font-size: 36px;
    font-weight: 600;
  }
`;
export const NoEventDiv = styled.div`
  text-align: center;
  margin: 0 auto;
`;
export const EventCards = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
`;
export const SectionDivider = styled.div`
  height: 2px;
  background-color: #5e3106;
  width: 70%;
  margin: 0 auto 40px;
  border-radius: 8px;
`;
