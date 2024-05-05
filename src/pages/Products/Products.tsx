import {
  Container,
  Wrapper,
  Card,
  CardImgDiv,
  CardImg,
  CardInfoDiv,
  CardInfos,
  CardInfoTitle,
  Cards,
  SectionTitle,
  CardImgBg,
} from "./ProductsStyle.tsx";
import { firestore } from "../../utilities/firebase.tsx";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
// import TestImg from "../../assets/test.png";
interface ProductsData {
  bottler: string;
  caskType: string;
  distillery: string;
  picture: string;
  size: string;
  strength: string;
  title: string;
  productUid: string;
}

const Products = () => {
  const [productsData, setProductsData] = useState<Array<ProductsData>>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const db = firestore;
      try {
        const q = query(collection(db, "Products"));
        const querySnapShot = await getDocs(q);
        const newData = querySnapShot.docs.map((doc) => {
          const eventDataFromDoc = doc.data() as ProductsData;
          return eventDataFromDoc;
        });
        setProductsData(newData);
      } catch (err) {
        console.error("Error when fetch Products data : ", err);
      }
    };
    fetchProductsData();
  }, []);
  console.log(productsData);

  return (
    <Container elevation={10} sx={{ bgcolor: "#f7f7f7" }}>
      <Wrapper>
        <SectionTitle>Comments</SectionTitle>
        <Cards>
          {productsData.map((product, index) => (
            <Card key={index} to={`/product/${product.productUid}`}>
              <CardImgDiv>
                <CardImgBg />
                <CardImg src={product.picture} />
              </CardImgDiv>
              <CardInfoDiv>
                <CardInfos>
                  <CardInfoTitle>{product.title}</CardInfoTitle>
                </CardInfos>
              </CardInfoDiv>
            </Card>
          ))}
        </Cards>
      </Wrapper>
    </Container>
  );
};

export default Products;
