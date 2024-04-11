import { Container, ProductImgDiv, ProductInfoAlc, ProductInfoCategory, ProductInfoDiv, ProductInfoDivider, ProductInfoFactory, ProductInfoTitle, ProductInfoYear, Wrapper, ProductInfoMl, ProductImg } from "./ProductStyle";
import Morlach from "../../assets/Morlach-16y.png"

const Product = () => {
    return (
      <Container>
        <Wrapper>
          <ProductImgDiv>
            <ProductImg src={Morlach} alt="Morlach" />
            </ProductImgDiv>
          <ProductInfoDiv>
            <ProductInfoTitle>
            Probably Speyside's Finest 1964 DL
            </ProductInfoTitle>
            <ProductInfoDivider />
            <ProductInfoCategory>
              桶型:雪莉桶
            </ProductInfoCategory>
            <ProductInfoFactory>
              廠商:Morlach
            </ProductInfoFactory>
            <ProductInfoYear>
              年分: 2005
            </ProductInfoYear>
            <ProductInfoAlc>
              酒精度: 43%
            </ProductInfoAlc>
            <ProductInfoMl>
              容量: 700ml
            </ProductInfoMl>
          </ProductInfoDiv>
        </Wrapper>
      </Container>
    )
  };
  
  export default Product;
  