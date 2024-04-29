import styled from "styled-components";
import SearchIcon from "../../assets/search.png";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 50px;
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  color: #0a0d0f;
  padding: 0 30px;
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
export const ProfileDiv = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: relative;
`;
export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const LogOutBtn = styled.button``;
export const DropDownMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100px;
  text-align: right;
  right: 0px;
  background-color: #9e620e;
  border-radius: 4px;
  padding: 8px;
`;
export const DropDownItem = styled.div`
  width: 100%;
  padding: 12px 0;
  color: #f7f7f7;
`;
