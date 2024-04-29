import {
  Container,
  PageLink,
  LinkItem,
  LinksDiv,
  LogoImg,
  LogoDiv,
  ProfileDiv,
  ProfileImg,
  Wrapper,
  LogOutBtn,
  DropDownItem,
  DropDownMenu,
} from "./HeaderStyle";
import LogoImage from "../../assets/Logo.png";
import MemberIcon from "../../assets/member.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utilities/firebase";
import { signOut } from "firebase/auth";
import { toaster } from "evergreen-ui";
import { useState } from "react";

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
            <LogoImg src={LogoImage} />
          </LogoDiv>
        </PageLink>
        <LinksDiv>
          <PageLink to="/articles">
            <LinkItem>知識專欄</LinkItem>
          </PageLink>
          <PageLink to="/products">
            <LinkItem>酒款評鑑</LinkItem>
          </PageLink>
          <PageLink to="/events">
            <LinkItem>品酒會</LinkItem>
          </PageLink>
        </LinksDiv>
        {user ? <LogOutBtn onClick={handleLogout}>登出</LogOutBtn> : null}
        <PageLink to="/member">
          <ProfileDiv>
            <ProfileImg
              src={MemberIcon}
              onMouseLeave={() => setIsDropDownShows(false)}
              onMouseEnter={() => setIsDropDownShows(true)}
            />
            {isDropDownShows ? (
              <DropDownMenu>
                <PageLink to="/member">
                  <DropDownItem>個人主頁</DropDownItem>
                </PageLink>
                <PageLink to="/flavourWheel">
                  <DropDownItem>風味輪</DropDownItem>
                </PageLink>
              </DropDownMenu>
            ) : null}
          </ProfileDiv>
        </PageLink>
      </Wrapper>
    </Container>
  );
};
export default Header;
