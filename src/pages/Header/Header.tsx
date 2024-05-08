import {
  Container,
  PageLink,
  LinkItem,
  LinksDiv,
  LogoImg,
  LogoDiv,
  ProfileImgDiv,
  ProfileImg,
  Wrapper,
  LogBtn,
} from "./HeaderStyle";
import MemberIcon from "../../assets/memberSvg.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utilities/firebase";
import { signOut } from "firebase/auth";
import { toaster } from "evergreen-ui";

import HeaderLogo from "../../assets/header-logo.png";
const Header = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("user logged out");
      toaster.notify("Log out succeed!");
      navigate("/");
    } catch (err: any) {
      console.error("Error when logging out: ", err.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <PageLink to="/">
          <LogoDiv>
            <LogoImg src={HeaderLogo} />
          </LogoDiv>
        </PageLink>
        <LinksDiv>
          <PageLink to="/articles">
            <LinkItem>Articles</LinkItem>
          </PageLink>
          <PageLink to="/products">
            <LinkItem>Comments</LinkItem>
          </PageLink>
          <PageLink to="/events">
            <LinkItem>Events</LinkItem>
          </PageLink>
        </LinksDiv>
        {user ? (
          <>
            <LogBtn onClick={handleLogout}>Log out</LogBtn>
            <ProfileImgDiv onClick={() => navigate("./member")}>
              <ProfileImg src={MemberIcon} />
            </ProfileImgDiv>
          </>
        ) : (
          <LogBtn onClick={() => navigate("./login")}>Login</LogBtn>
        )}
      </Wrapper>
    </Container>
  );
};
export default Header;
