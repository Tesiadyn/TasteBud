import {
  Container,
  FormTitle,
  Wrapper,
  FormSection,
  InputForm,
  InputLabel,
  InputField,
  SubmitButton,
} from "./NewEventStyle";

const NewEvent = () => {
  return (
    <Container>
      <Wrapper>
        <FormSection>
          <FormTitle>新活動</FormTitle>
          <InputForm>
            <InputLabel>活動名稱</InputLabel>
            <InputField type="text" />
            <InputLabel>地點</InputLabel>
            <InputField type="text" />
            <InputLabel>最大人數</InputLabel>
            <InputField type="number" min={1}/>
            <InputLabel>封面照片</InputLabel>
            <InputField type="file" />
            <SubmitButton>舉辦新活動</SubmitButton>
          </InputForm>
        </FormSection>
      </Wrapper>
    </Container>
  );
};
export default NewEvent;
