import {
  Container,
  PageLink,
  LinkItem,
  LinksDiv,
  LogoImg,
  LogoDiv,
  ProfileDiv,
  ProfileImg,
  SearchBar,
  SearchButton,
  SearchInput,
  Wrapper,
  LogOutBtn,
} from "./HeaderStyle";
import LogoImage from "../../assets/Logo.png";
import ProfileIcon from "../../assets/Profile.png";
import { auth } from "../../utilities/firebase";
import { signOut } from "firebase/auth";

const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("user logged out");
  } catch (err: any) {
    console.error("Error when logging out: ", err.message);
  }
};

const Header = () => {
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
        <SearchBar>
          <SearchInput />
          <SearchButton />
        </SearchBar>
        <LogOutBtn onClick={handleLogout}>登出</LogOutBtn>
        <PageLink to="/member">
          <ProfileDiv>
            <ProfileImg src={ProfileIcon} />
          </ProfileDiv>
        </PageLink>
      </Wrapper>
    </Container>
  );
};
export default Header;
