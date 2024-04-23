import { useEffect, useState } from "react";
import {
  Container,
  ProductImgDiv,
  ProductInfoAlc,
  ProductInfoCategory,
  ProductInfoDiv,
  ProductInfoDivider,
  ProductInfoFactory,
  ProductInfoTitle,
  ProductInfoBottler,
  Wrapper,
  ProductInfoMl,
  ProductImg,
  PostCommentBtn,
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
          <ProductImgDiv>
            <ProductImg alt="Morlach" src={productData?.picture} />
          </ProductImgDiv>
          <ProductInfoDiv>
            <ProductInfoTitle>{productData?.title}</ProductInfoTitle>
            <ProductInfoDivider />
            <ProductInfoCategory>
              桶型: {productData?.caskType}
            </ProductInfoCategory>
            <ProductInfoFactory>
              廠商: {productData?.distillery}
            </ProductInfoFactory>
            <ProductInfoBottler>
              裝瓶商: {productData?.bottler}
            </ProductInfoBottler>
            <ProductInfoAlc>酒精度: {productData?.strength}</ProductInfoAlc>
            <ProductInfoMl>容量: {productData?.size} ml</ProductInfoMl>
            <PostCommentBtn to={`./post`}>發表評論</PostCommentBtn>
          </ProductInfoDiv>
        </Wrapper>
      </Container>
      <ProductInfoDivider />
      <div>
        {commentData.map((comment, index) => (
          <div key={index}>
            {comment.authorUid}
            {comment.productUid}
            {comment.commentText}
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
