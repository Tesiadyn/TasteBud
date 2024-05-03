import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  background-color: #bd9f9f;
`;
export const FlavourForm = styled.form``;
export const CheckboxTreeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  gap: 50px;
`;
export const CheckboxTreeDiv = styled.div`
  width: 30%;
`;
/* ---------------------------------- tree ---------------------------------- */
export const TreeList = styled.ul`
  list-style: none;
  background-color: #f7f7f7;
  cursor: pointer;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  border: 1px solid #808080;
  padding: 10px;
  margin-bottom: 10px;
`;
export const TreeItem = styled.li`
  margin: 0;
  padding: 5px 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
export const SubmitButton = styled.button`
  width: 70px;
  height: 40px;
`;
