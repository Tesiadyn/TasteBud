import {
  Container,
  InfoDiv,
  InfoDivItem,
  LogoDiv,
  LogoImg,
  SubTitle,
  Wrapper,
  InfoDivTitle,
  SocialDiv,
  InfoDivWrapper,
} from "./FooterStyle";
import LogoImage from "../../assets/Footer-logo.png";
import { X, Facebook, Instagram } from "iconoir-react";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <LogoDiv>
          <LogoImg src={LogoImage} />
          <SubTitle>TasteBud © 2024 All rights reserved</SubTitle>
        </LogoDiv>
        <InfoDivWrapper>
          <InfoDiv>
            <InfoDivTitle>INSIDE</InfoDivTitle>
            <InfoDivItem>Social responsibility</InfoDivItem>
            <InfoDivItem>Stories</InfoDivItem>
            <InfoDivItem>Podcast</InfoDivItem>
          </InfoDiv>
          <InfoDiv>
            <InfoDivTitle>SUPPORT</InfoDivTitle>
            <InfoDivItem>Service terms</InfoDivItem>
            <InfoDivItem>Contact Us</InfoDivItem>
            <InfoDivItem>Customer Service</InfoDivItem>
          </InfoDiv>
          <InfoDiv>
            <InfoDivTitle>LEGAL</InfoDivTitle>
            <InfoDivItem>Privacy policy</InfoDivItem>
            <InfoDivItem>Cookie policy</InfoDivItem>
            <InfoDivItem>Podcast</InfoDivItem>
          </InfoDiv>
        </InfoDivWrapper>
        <SocialDiv>
          <Facebook />
          <X />
          <Instagram />
        </SocialDiv>
      </Wrapper>
    </Container>
  );
};
export default Footer;
