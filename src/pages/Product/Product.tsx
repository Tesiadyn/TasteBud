import { useEffect, useState } from "react";
import {
  Container,
  ProductImgDiv,
  ProductInfoTitle,
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
  DivDivider,
} from "./ProductStyle";
import { useParams } from "react-router-dom";
import { firestore } from "../../utilities/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";

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
interface CommentData {
  authorUid: string;
  commentText: string;
  productUid: string;
  wheelData: object;
  quillValue: string;
  authorName: string;
}

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [isCommentsShowing, setIsCommentsShowing] = useState(false);
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
                <ProductInfoTitle>{productData?.title}</ProductInfoTitle>
                <ProductIntroText>{productData?.introText}</ProductIntroText>
                <PostCommentBtn to={`./post`}>New Comment</PostCommentBtn>
              </ProductIntroTitleDiv>
            </IntroSection>

            <InfoDivDivider />

            <InfoSection>
              <ProductInfoText>
                CaskType: {productData?.caskType}
              </ProductInfoText>
              <ProductInfoText>
                Dilistilery: {productData?.distillery}
              </ProductInfoText>
              <ProductInfoText>
                Bottled By: {productData?.bottler}
              </ProductInfoText>
              <ProductInfoText>Alc: {productData?.strength}%</ProductInfoText>
              <ProductInfoText>Size: {productData?.size} ml</ProductInfoText>
            </InfoSection>
          </InfoDiv>

          <DivDivider />

          <CommentDiv>
            {commentData.map((comment, index) => (
              <CommentCard key={index}>
                <div dangerouslySetInnerHTML={{ __html: comment.quillValue }} />
                --- {comment.authorName}
                {comment.commentText}
              </CommentCard>
            ))}
          </CommentDiv>
        </Wrapper>
      </Container>
    </> /* <ProductInfoSection>

          </ProductInfoSection> */
    /* <TabTogglerDiv>
              <Toggler
                className="toggler-info"
                isActive={isCommentsShowing}
                onClick={() => setIsCommentsShowing(false)}
              >
                Info
              </Toggler>
              <Toggler
                className="toggler-comments"
                isActive={isCommentsShowing}
                onClick={() => setIsCommentsShowing(true)}
              >
                Comments
              </Toggler>
            </TabTogglerDiv> */

    /* {commentData.length > 0 ? (
                  
               */

    /*           
                    <NoCommentsHint>
                      No one has left comments here, wanna be the first one?
                    </NoCommentsHint>
                    <PostCommentBtn className="noCommentsBtn" to={`./post`}>
                      Post a new comment
                    </PostCommentBtn>
            
             */
  );
};

export default Product;
