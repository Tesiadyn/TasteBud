import styled from "styled-components";
import SearchIcon from "../../assets/search.png";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  background-color: #7c7e80;
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const LogoDiv = styled.div`
  width: 200px;
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
  margin-left: 30px;
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
export const ProfileDiv = styled.div`
  cursor: pointer;
`;
export const ProfileImg = styled.img``;
