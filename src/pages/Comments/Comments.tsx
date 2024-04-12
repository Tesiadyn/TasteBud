import {
  Container,
  Wrapper,
  Card,
  CardImgDiv,
  CardInfoDiv,
  CardInfos,
  CardInfoTitle,
  CardInfoScore,
  CardInfoStar,
  CardInfoText,
  AuthorInfoDiv,
  AuthorInfoImg,
  AuthorInfoTitle,
  AuthorInfoRegion,
} from "./CommentsStyle.tsx";
import AuthorImage from "../../assets/Author1.png";
{
  /* <Card to={`/products/${id}`}> */
}
const Comments = () => {
  return (
    <Container>
      <Wrapper>
        <Card to={`/product/1`}>
          <CardImgDiv />
          <CardInfoDiv>
            <CardInfos>
              <CardInfoTitle>Morlach16</CardInfoTitle>
              <CardInfoScore>
                <CardInfoStar></CardInfoStar>
              </CardInfoScore>
              <CardInfoText>
                口感中後段及尾韻表現豐富，明顯喝得出高年份老酒的底蘊，加上恰到好處的煙燻味點綴，整體加分不少，能夠在調和威士忌喝出層次感，可說是....
                (閱讀全文)
              </CardInfoText>
            </CardInfos>
          </CardInfoDiv>
          <AuthorInfoDiv>
            <AuthorInfoImg src={AuthorImage} />
            <AuthorInfoTitle>Ronald Richards</AuthorInfoTitle>
            <AuthorInfoRegion>Pleasanton, CA</AuthorInfoRegion>
          </AuthorInfoDiv>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Comments;
