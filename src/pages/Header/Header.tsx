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
  MobileMenuDiv,
} from "./HeaderStyle";

import { useNavigate } from "react-router-dom";
import { auth } from "../../utilities/firebase";
import { signOut } from "firebase/auth";
import { toaster } from "evergreen-ui";
import { useState, useEffect, useContext } from "react";
import {
  User,
  Menu,
  TransitionLeft,
  TransitionRight,
  ChatLines,
  EditPencil,
  Community,
} from "iconoir-react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import HeaderLogo from "../../assets/header-logo.png";
import Divider from "@mui/material/Divider";
import { UserContext } from "../../utilities/useContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMemberIconHovered, setIsMemberIconHovered] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsMobileMenuOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
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

  const DrawerList = (
    <>
      <List>
        <ListItem onClick={() => navigate("/articles")}>
          <ListItemButton>
            <ListItemIcon>
              <EditPencil />
            </ListItemIcon>
            <ListItemText>Articles</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem onClick={() => navigate("/products")}>
          <ListItemButton>
            <ListItemIcon>
              <ChatLines />
            </ListItemIcon>
            <ListItemText>Comments</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem onClick={() => navigate("/events")}>
          <ListItemButton>
            <ListItemIcon>
              <Community />
            </ListItemIcon>
            <ListItemText>Events</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={() => navigate("/member")}>
          <ListItemButton>
            <ListItemIcon>
              <User />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      {user ? (
        <List>
          <ListItem onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <TransitionLeft />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem onClick={() => navigate("/login")}>
            <ListItemButton>
              <ListItemIcon>
                <TransitionRight />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </>
  );

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
        <MobileMenuDiv>
          <Menu color="#f7f7f7" strokeWidth={2} onClick={toggleDrawer(true)} />
          <Drawer open={isMobileMenuOpen} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </MobileMenuDiv>
      </Wrapper>
    </Container>
  );
};
export default Header;
