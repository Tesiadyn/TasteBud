import { useEffect, useState } from "react";
import {
  Container,
  ProductImgDiv,
  ProductInfoSection,
  ProductInfoTitle,
  Wrapper,
  ProductImg,
  PostCommentBtn,
  IntroSection,
  ProductIntroTitleDiv,
  ProductInfoText,
  ProductInfosDiv,
  TabTogglerDiv,
  Toggler,
  CommentCard,
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
          <IntroSection>
            <ProductImgDiv>
              <ProductImg alt={productData?.title} src={productData?.picture} />
            </ProductImgDiv>
            <ProductIntroTitleDiv>
              <ProductInfoTitle>{productData?.title}</ProductInfoTitle>
              <ProductInfoText>{productData?.distillery}</ProductInfoText>
            </ProductIntroTitleDiv>
            <PostCommentBtn to={`./post`}>發表評論</PostCommentBtn>
          </IntroSection>
          <ProductInfoSection>
            <TabTogglerDiv>
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
            </TabTogglerDiv>
            {isCommentsShowing ? (
              <>
                {commentData.map((comment, index) => (
                  <CommentCard key={index}>
                    <div
                      dangerouslySetInnerHTML={{ __html: comment.quillValue }}
                    />
                    ---  {comment.authorName}
                    {comment.commentText}
                  </CommentCard>
                ))}
              </>
            ) : (
              <ProductInfosDiv>
                <ProductInfoText>桶型: {productData?.caskType}</ProductInfoText>
                <ProductInfoText>
                  廠商: {productData?.distillery}
                </ProductInfoText>
                <ProductInfoText>
                  裝瓶商: {productData?.bottler}
                </ProductInfoText>
                <ProductInfoText>
                  酒精度: {productData?.strength}%
                </ProductInfoText>
                <ProductInfoText>容量: {productData?.size} ml</ProductInfoText>
              </ProductInfosDiv>
            )}
          </ProductInfoSection>
        </Wrapper>
      </Container>
    </>
  );
};

export default Product;
