import {
  Container,
  TagsDiv,
  TagsSection,
  Wrapper,
  Tags,
  TagText,
  Tag,
  ArticlesSection,
  ArticleImgDiv,
  ArticleImg,
  ArticleInfoTags,
  ArticleCard,
  ArticleInfoDiv,
  ArticleInfoTitle,
  ArticleInfoText,
  PageTitle,
  PageSubtitle,
} from "./ArticlesStyle";
import ArticlePic from "../../assets/article-picture-1.jpg";

const Articles = () => {
  return (
    <Container>
      <Wrapper>
        <PageTitle>知識專欄</PageTitle>
        <PageSubtitle>這邊囊括了所有身為品飲者所需的知識!</PageSubtitle>
        <TagsSection>
          <TagsDiv>
            <Tags>
              <Tag>
                <TagText>Tag1</TagText>
              </Tag>
              <Tag>
                <TagText>Tag2</TagText>
              </Tag>
              <Tag>
                <TagText>Tag3</TagText>
              </Tag>
            </Tags>
          </TagsDiv>
        </TagsSection>
        <ArticlesSection>
          <ArticleCard>
            <ArticleImgDiv>
              <ArticleImg src={ArticlePic} />
            </ArticleImgDiv>
            <ArticleInfoDiv>
              <ArticleInfoTags>
                <ArticleInfoTags>4</ArticleInfoTags>
                <ArticleInfoTags>5</ArticleInfoTags>
                <ArticleInfoTags>6</ArticleInfoTags>
              </ArticleInfoTags>
              <ArticleInfoTitle>橡木桶對威士忌的重要性</ArticleInfoTitle>
              <ArticleInfoText>
                橡木桶的名字來自於再注入威士忌前本來所陳釀的究竟是什麼酒，本是釀製波本威士忌的稱為波本桶，本是釀製雪莉酒的稱作雪莉桶。
                使用波本桶所熟成的威士忌，即使超過十年還是淡淡的金黃色...(閱讀全文)
              </ArticleInfoText>
            </ArticleInfoDiv>
          </ArticleCard>
          <ArticleCard>
            <ArticleImgDiv>
              <ArticleImg src={ArticlePic} />
            </ArticleImgDiv>
            <ArticleInfoDiv>
              <ArticleInfoTags>
                <ArticleInfoTags>4</ArticleInfoTags>
                <ArticleInfoTags>5</ArticleInfoTags>
                <ArticleInfoTags>6</ArticleInfoTags>
              </ArticleInfoTags>
              <ArticleInfoTitle>橡木桶對威士忌的重要性</ArticleInfoTitle>
              <ArticleInfoText>
                橡木桶的名字來自於再注入威士忌前本來所陳釀的究竟是什麼酒，本是釀製波本威士忌的稱為波本桶，本是釀製雪莉酒的稱作雪莉桶。
                使用波本桶所熟成的威士忌，即使超過十年還是淡淡的金黃色...(閱讀全文)
              </ArticleInfoText>
            </ArticleInfoDiv>
          </ArticleCard>
          <ArticleCard>
            <ArticleImgDiv>
              <ArticleImg src={ArticlePic} />
            </ArticleImgDiv>
            <ArticleInfoDiv>
              <ArticleInfoTags>
                <ArticleInfoTags>4</ArticleInfoTags>
                <ArticleInfoTags>5</ArticleInfoTags>
                <ArticleInfoTags>6</ArticleInfoTags>
              </ArticleInfoTags>
              <ArticleInfoTitle>橡木桶對威士忌的重要性</ArticleInfoTitle>
              <ArticleInfoText>
                橡木桶的名字來自於再注入威士忌前本來所陳釀的究竟是什麼酒，本是釀製波本威士忌的稱為波本桶，本是釀製雪莉酒的稱作雪莉桶。
                使用波本桶所熟成的威士忌，即使超過十年還是淡淡的金黃色...(閱讀全文)
              </ArticleInfoText>
            </ArticleInfoDiv>
          </ArticleCard>
        </ArticlesSection>
      </Wrapper>
    </Container>
  );
};

export default Articles;
