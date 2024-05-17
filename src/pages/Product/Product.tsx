import { useEffect, useState } from "react";
import {
  Container,
  ProductImgDiv,
  ProductIntroTitle,
  Wrapper,
  ProductImg,
  PostCommentBtn,
  IntroSection,
  ProductIntroTitleDiv,
  ProductInfoText,
  CommentCard,
  NoCommentsHint,
  InfoDiv,
  InfoSection,
  CommentDiv,
  ProductIntroText,
  InfoDivDivider,
  WheelDiv,
  CommentWrapper,
  UserNameText,
  CommentTextDiv,
  CommentCardDivider,
  PageLink,
  BtnText,
  ProductInfoTitle,
  ProductInfoDiv,
  CommentTitleDiv,
  CommentTitle,
} from "./ProductStyle";
import { useParams } from "react-router-dom";
import { firestore } from "../../utilities/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import MiniFlavourWheel from "./MiniFlavourWheel";
import { DesignNib, InfoCircle } from "iconoir-react";
import { Tooltip } from "react-tooltip";

interface ProductData {
  bottler: string;
  caskType: string;
  distillery: string;
  picture: string;
  size: string;
  strength: string;
  title: string;
  productUid: string;
  introText: string;
}
interface WheelData {
  name: string;
  value?: number;
  children?: WheelData[];
}

interface CommentData {
  authorUid: string;
  commentText: string;
  productUid: string;
  quillValue: string;
  authorName: string;
  wheelData: WheelData | WheelData[];
}

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [commentData, setCommentData] = useState<CommentData[]>([]);

  const db = firestore;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productQuery = query(
          collection(db, "Products"),
          where("productUid", "==", id)
        );
        const commentQuery = query(
          collection(db, "Comments"),
          where("productUid", "==", id)
        );
        const commentQuerySnapshot = await getDocs(commentQuery);
        const productQuerySnapshot = await getDocs(productQuery);
        const productData = productQuerySnapshot.docs.map(
          (doc) => doc.data() as ProductData
        );
        setProductData(productData[0]);
        const commentData = commentQuerySnapshot.docs.map(
          (doc) => doc.data() as CommentData
        );

        setCommentData(commentData);
      } catch (err) {
        console.error("Error when fatching product data : ", err);
      }
    };
    fetchProductData();
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <InfoDiv>
            <IntroSection>
              <ProductImgDiv>
                <ProductImg
                  alt={productData?.title}
                  src={productData?.picture}
                />
              </ProductImgDiv>

              <ProductIntroTitleDiv>
                <ProductIntroTitle>{productData?.title}</ProductIntroTitle>
                <ProductIntroText>{productData?.introText}</ProductIntroText>
                <PostCommentBtn to={`./post`}>
                  <DesignNib color="#f7f7f7" />
                  <BtnText>New Comment</BtnText>
                </PostCommentBtn>
              </ProductIntroTitleDiv>
            </IntroSection>

            <InfoDivDivider />

            <InfoSection>
              <ProductInfoDiv>
                <ProductInfoTitle>CaskType:</ProductInfoTitle>

                <ProductInfoText>{productData?.caskType}</ProductInfoText>
              </ProductInfoDiv>
              <ProductInfoDiv>
                <ProductInfoTitle>Dilistilery:</ProductInfoTitle>

                <ProductInfoText>{productData?.distillery}</ProductInfoText>
              </ProductInfoDiv>
              <ProductInfoDiv>
                <ProductInfoTitle>Bottled By:</ProductInfoTitle>

                <ProductInfoText>{productData?.bottler}</ProductInfoText>
              </ProductInfoDiv>
              <ProductInfoDiv>
                <ProductInfoTitle>Alc:</ProductInfoTitle>
                <ProductInfoText>{productData?.strength}%</ProductInfoText>
              </ProductInfoDiv>
              <ProductInfoDiv>
                <ProductInfoTitle>Size:</ProductInfoTitle>
                <ProductInfoText>{productData?.size}ml</ProductInfoText>
              </ProductInfoDiv>
            </InfoSection>
            <InfoDivDivider />
            <PageLink to="/products">Back to Product List</PageLink>
          </InfoDiv>

          <CommentDiv>
            <CommentTitleDiv>
              <CommentTitle>Comments</CommentTitle>
              <InfoCircle
                className="anchor-element"
                color="#5e3106"
                height={24}
                width={24}
                strokeWidth={2}
              />
              <Tooltip anchorSelect=".anchor-element" place="top">
                <p>This is comments from other whisky lovers,</p>
                <p>
                  Every chart contains all the flavours that has been tasted by
                  this user,
                </p>
                <p>
                  you can click on sections of the chart to see more clearly!
                </p>
              </Tooltip>
            </CommentTitleDiv>
            {commentData.length > 0 ? (
              commentData.map((comment, index) => (
                <>
                  <CommentWrapper>
                    <WheelDiv>
                      <MiniFlavourWheel data={comment.wheelData as WheelData} />
                    </WheelDiv>
                    <CommentCard key={index}>
                      <UserNameText>{comment.authorName}</UserNameText>
                      <CommentCardDivider />
                      <CommentTextDiv>{comment.commentText}</CommentTextDiv>
                    </CommentCard>
                  </CommentWrapper>
                </>
              ))
            ) : (
              <>
                <NoCommentsHint>
                  No one has left comments here, wanna be the first one?
                </NoCommentsHint>
                {/* <PostCommentBtn className="noCommentsBtn" to={`./post`}>
                  Post a new comment
                </PostCommentBtn> */}
              </>
            )}
          </CommentDiv>
        </Wrapper>
      </Container>
    </>
  );
};

export default Product;
