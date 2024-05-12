import { Container, LogoDiv, LogoImg, SubTitle, Wrapper } from "./FooterStyle";
import LogoImage from "../../assets/Footer-logo.png";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
      <LogoDiv>
        <LogoImg src={LogoImage} />
        <SubTitle>TasteBud © 2024 All rights reserved</SubTitle>
      </LogoDiv>
      
      </Wrapper>
    </Container>
  );
};
export default Footer;
