import {
  Container,
  PageLink,
  LinkItem,
  LinksDiv,
  LogoImg,
  LogoDiv,
  ProfileImgDiv,
  Wrapper,
  LogBtn,
} from "./HeaderStyle";

import { useNavigate } from "react-router-dom";
import { auth } from "../../utilities/firebase";
import { signOut } from "firebase/auth";
import { toaster } from "evergreen-ui";
import { useState, useEffect } from "react";
import { User } from "iconoir-react";
import HeaderLogo from "../../assets/header-logo.png";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMemberIconHovered, setIsMemberIconHovered] = useState(false);
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

  useEffect(() => {
    function handleScroll() {
      const currentPosition = window.scrollY;
      if (currentPosition > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container className={scrolled ? "scrolled" : ""}>
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
            <ProfileImgDiv
              onClick={() => navigate("./member")}
              onMouseOver={() => setIsMemberIconHovered(true)}
              onMouseOut={() => setIsMemberIconHovered(false)}
            >
              <User
                color={isMemberIconHovered ? "#e6ad39" : "#f7f7f7"}
                height={28}
                width={28}
                strokeWidth={2}
                style={{
                  transition: "all 0.2s",
                }}
              />
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
