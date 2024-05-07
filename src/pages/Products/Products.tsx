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
  CardImgBg,
  BannerSection,
  PageTitle,
  PageSubtitle,
  CardWrapper,
} from "./ProductsStyle.tsx";
import { firestore } from "../../utilities/firebase.tsx";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

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

  useEffect(() => {
    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        gsap.fromTo(
          cardRef,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: cardRef,
              start: "top 80%",
            },
            delay: index * 0.2,
          }
        );
      }
    });
  }, [productsData]);

  return (
    <Container elevation={10} sx={{ bgcolor: "#f7f7f7" }}>
      <BannerSection>
        <PageTitle>Comments</PageTitle>
        <PageSubtitle>Rate and share your perspectives!</PageSubtitle>
      </BannerSection>
      <Wrapper>
        <Cards>
          {productsData.map((product, index) => (
            <CardWrapper ref={(el) => (cardRefs.current[index] = el)}>
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
            </CardWrapper>
          ))}
        </Cards>
      </Wrapper>
    </Container>
  );
};

export default Products;
