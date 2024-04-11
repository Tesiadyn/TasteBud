import styled from "styled-components";
import SearchIcon from "../../assets/search.png";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #7c7e80;
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
  margin-left: 30px;
`;
export const SearchBar = styled.div``;
export const SearchInput = styled.input``;
export const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-image: url(${SearchIcon});
`;
export const ProfileDiv = styled.div`
  cursor: pointer;
`;
export const ProfileImg = styled.img``;
