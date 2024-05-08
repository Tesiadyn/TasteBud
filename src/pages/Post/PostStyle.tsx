import styled from "styled-components";

export const InputSection = styled.section`
  width: 100%;
  background-color: #f7f7f7;
  padding: 20px;
`;
export const SectionTitle = styled.h2`
  color: #5e3106;
  text-align: center;
  margin: 30px 0;
  font-size: 36px;
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
  /* width: 70px; */
  height: 40px;
  background-color: #a5550b;
  box-shadow: 2px 3px 6px 1px rgb(202, 91, 0, 0.55);
  color: #f7f7f7;
  border-radius: 12px;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  &:hover {
    background-color: #be722c;
  }
  &:active {
    box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
  }
`;
export const EditorDiv = styled.div`
  width: 350px;
  height: 200px;
`;
