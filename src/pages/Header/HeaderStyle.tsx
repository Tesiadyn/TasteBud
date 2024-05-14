import styled from "styled-components";
import SearchIcon from "../../assets/search.png";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  
  z-index: 10;
  transition: all 0.3s;
  &.scrolled {
    box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
    background-color: #803f15da;
  }
`;
export const Wrapper = styled.div`
  width: 1280px;
  height: 80px;
  margin: 0 auto;
padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
export const LogoDiv = styled.div`
  width: 200px;
  cursor: pointer;
`;
export const LogoImg = styled.img`
  width: 100%;
`;
export const LinksDiv = styled.ul`
  display: flex;
`;
export const PageLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;
export const LinkItem = styled.li`
  list-style: none;
  color: #f7f7f7;
  padding: 0 30px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #9e620e;
  }
`;
export const SearchBar = styled.div`
  display: flex;
`;
export const SearchInput = styled.input``;
export const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 8px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  background-image: url(${SearchIcon});
`;
export const ProfileImgDiv = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: relative;
`;
export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const LogBtn = styled.div`
  /* width: 60px; */
  height: 25px;
  color: #f7f7f7;
  font-size: 18px;
  background-color: transparent;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #9e620e;
  }
`;
