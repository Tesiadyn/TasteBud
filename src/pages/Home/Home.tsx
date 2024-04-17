import { ArticlesSection } from "../Articles/ArticlesStyle";
import {
  Container,
  PromoBanner,
  PromoBannerTitle,
  PromoBannerBtn,
  ArticleSectionTitle,
  SectionTitleDivider,
  ArticleCardsWrapper,
  ArticleCard,
  ArticleCardInfoDiv,
  ArticleCardTitle,
  ArticleCardText,
  ArticleCardImg,
  CommentsSection,
  CommentsCardsWrapper,
  CommentsCard,
  CommentsCardAuthorId,
  CommentsCardAuthorImg,
  CommentsCardImg,
  CommentsCardAuthorImgDiv,
  CommentsCardImgDiv,
  CommentsCardInfoDiv,
  CommentsCardText,
  CommentsCardTitle,
  ArticleCardImgDiv,
  CommentsCardAuthorDiv,
} from "./HomeStyle";
import ArticlePic1 from "../../assets/article-picture-1.jpg";
import ArticlePic2 from "../../assets/article-picture-2.jpg";
import ArticlePic3 from "../../assets/article-picture-3.jpg";
import ArticlePic4 from "../../assets/article-picture-4.jpg";
import CommentsPic1 from "../../assets/event-picture-1.jpg";
import CommentsPic2 from "../../assets/event-picture-2.jpg";
import AuthorPic1 from "../../assets/Profile.png";

const Home = () => {
  return (
    <Container>
      <PromoBanner>
        <PromoBannerTitle>探索Woodford : 蜂蜜與橡木的完美結合</PromoBannerTitle>
        <PromoBannerBtn>閱讀更多</PromoBannerBtn>
      </PromoBanner>
      <ArticlesSection>
        <ArticleSectionTitle>知識專欄</ArticleSectionTitle>
        <SectionTitleDivider></SectionTitleDivider>
        <ArticleCardsWrapper>
          <ArticleCard>
            <ArticleCardImgDiv>
              <ArticleCardImg src={ArticlePic1} />
            </ArticleCardImgDiv>
            <ArticleCardInfoDiv>
              <ArticleCardTitle>標題</ArticleCardTitle>
              <ArticleCardText>內文</ArticleCardText>
            </ArticleCardInfoDiv>
          </ArticleCard>
          <ArticleCard>
            <ArticleCardImgDiv>
              <ArticleCardImg src={ArticlePic2} />
            </ArticleCardImgDiv>
            <ArticleCardInfoDiv>
              <ArticleCardTitle>標題</ArticleCardTitle>
              <ArticleCardText>內文</ArticleCardText>
            </ArticleCardInfoDiv>
          </ArticleCard>
          <ArticleCard>
            <ArticleCardImgDiv>
              <ArticleCardImg src={ArticlePic3} />
            </ArticleCardImgDiv>
            <ArticleCardInfoDiv>
              <ArticleCardTitle>標題</ArticleCardTitle>
              <ArticleCardText>內文</ArticleCardText>
            </ArticleCardInfoDiv>
          </ArticleCard>
          <ArticleCard>
            <ArticleCardImgDiv>
              <ArticleCardImg src={ArticlePic4} />
            </ArticleCardImgDiv>
            <ArticleCardInfoDiv>
              <ArticleCardTitle>標題</ArticleCardTitle>
              <ArticleCardText>內文</ArticleCardText>
            </ArticleCardInfoDiv>
          </ArticleCard>
        </ArticleCardsWrapper>
      </ArticlesSection>
      <CommentsSection>
        <CommentsCardsWrapper>
          <CommentsCard>
            <CommentsCardImgDiv>
              <CommentsCardImg src={CommentsPic1} />
            </CommentsCardImgDiv>
            <CommentsCardInfoDiv>
              <CommentsCardTitle>
                Laphroaig Cairdeas 2023 White Port & Madeira
              </CommentsCardTitle>
              <CommentsCardText>
                口感中後段及尾韻表現豐富，明顯喝得出高年份老酒的底蘊，加上恰到好處的煙燻味點綴，整體加分不少，能夠在調和威士忌喝出層次感，可說是....
                (閱讀全文)
              </CommentsCardText>
            </CommentsCardInfoDiv>
            <CommentsCardAuthorDiv>
              <CommentsCardAuthorImgDiv>
                <CommentsCardAuthorImg src={AuthorPic1} />
              </CommentsCardAuthorImgDiv>
              <CommentsCardAuthorId>123775+++</CommentsCardAuthorId>
            </CommentsCardAuthorDiv>
          </CommentsCard>
          <CommentsCard>
            <CommentsCardImgDiv>
              <CommentsCardImg src={CommentsPic2} />
            </CommentsCardImgDiv>
            <CommentsCardInfoDiv>
              <CommentsCardTitle>
                Laphroaig Cairdeas 2023 White Port & Madeira
              </CommentsCardTitle>
              <CommentsCardText>
                口感中後段及尾韻表現豐富，明顯喝得出高年份老酒的底蘊，加上恰到好處的煙燻味點綴，整體加分不少，能夠在調和威士忌喝出層次感，可說是....
                (閱讀全文)
              </CommentsCardText>
            </CommentsCardInfoDiv>
            <CommentsCardAuthorDiv>
              <CommentsCardAuthorImgDiv>
                <CommentsCardAuthorImg src={AuthorPic1} />
              </CommentsCardAuthorImgDiv>
              <CommentsCardAuthorId>123775+++</CommentsCardAuthorId>
            </CommentsCardAuthorDiv>
          </CommentsCard>
        </CommentsCardsWrapper>
      </CommentsSection>
    </Container>
  );
};
export default Home;
