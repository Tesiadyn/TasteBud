import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 230px);
  background-color: #f7f7f7;
  box-shadow: -3px -3px 5px 2px rgba(89, 89, 89, 0.3);
  padding: 20px 0;
`;
export const InputSection = styled.section`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;
export const SectionTitle = styled.h2`
  color: #5e3106;
  text-align: center;
  margin: 30px 0;
  font-size: 36px;
`;
export const SectionSubTitle = styled.p`
  text-align: center;
  color: #5e3106;
`;
export const HelpCircleDiv = styled.div`
  text-align: center;
`;
export const FlavourForm = styled.form``;
export const CheckboxTreeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  gap: 30px;
`;
export const CheckboxTreeDiv = styled.div`
  width: 30%;
`;
/* ---------------------------------- tree ---------------------------------- */
export const TreeList = styled.ul`
  width: 100%;
  list-style: none;
  background-color: #f7f7f7;
  cursor: pointer;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  border: 1px solid #808080;
  padding: 10px;
  margin-bottom: 10px;
`;
export const CategoryDiv = styled.div``;
export const TreeListDiv = styled.div``;
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
  height: 40px;
  background-color: #a5550b;
  box-shadow: 2px 3px 6px 1px rgb(202, 91, 0, 0.55);
  color: #f7f7f7;
  border-radius: 12px;
  padding: 0 20px;
  cursor: pointer;
  margin: 20px 0;
  transition: all 0.2s;
  border: none;
  &:hover {
    background-color: #be722c;
  }
  &:active {
    box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
  }
`;
export const CommentInput = styled.textarea`
  width: 100%;
  resize: none;
  border-radius: 8px;
  &:valid {
    border: 2px solid #a5550b;
  }
`;
export const InputLabel = styled.label``;
export const SubmitDiv = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 50%;
`;
