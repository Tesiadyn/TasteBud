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
  LogOutBtn,
  DropDownItem,
  DropDownMenu,
} from "./HeaderStyle";
import MemberIcon from "../../assets/memberSvg.svg";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utilities/firebase";
import { signOut } from "firebase/auth";
import { toaster } from "evergreen-ui";
import { useState } from "react";
import HeaderLogo from "../../assets/header-logo.png";
const Header = () => {
  const [isDropDownShows, setIsDropDownShows] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("user logged out");
      toaster.notify("您已成功登出");
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
        {user ? <LogOutBtn onClick={handleLogout}>Log out</LogOutBtn> : null}
        <ProfileImgDiv
          onMouseLeave={() => setIsDropDownShows(false)}
          onMouseEnter={() => setIsDropDownShows(true)}
        >
          <ProfileImg src={MemberIcon} />
          {isDropDownShows ? (
            <DropDownMenu isVisible={isDropDownShows}>
              <PageLink to="/member">
                <DropDownItem>Profile</DropDownItem>
              </PageLink>
              <PageLink to="/flavourWheel">
                <DropDownItem>FlavourWheel</DropDownItem>
              </PageLink>
            </DropDownMenu>
          ) : null}
        </ProfileImgDiv>
      </Wrapper>
    </Container>
  );
};
export default Header;
