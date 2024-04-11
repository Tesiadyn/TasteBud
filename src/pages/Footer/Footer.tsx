import { Container, LogoDiv, LogoImg, SubTitle } from "./FooterStyle";
import LogoImage from "../../assets/Footer-logo.png";

const Footer = () => {
  return (
    <Container>
      <LogoDiv>
        <LogoImg src={LogoImage} />
      </LogoDiv>

      <SubTitle>TasteBud © 2024 All rights reserved</SubTitle>
    </Container>
  );
};
export default Footer;
