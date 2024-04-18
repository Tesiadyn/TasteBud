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
} from "./HeaderStyle";
import LogoImage from "../../assets/Logo.png";
import ProfileIcon from "../../assets/Profile.png";

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
          <PageLink to="/comments">
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
