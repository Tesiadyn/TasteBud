import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 1440px;
    margin: 0 auto;
    background-color: #7c8c99;
`
export const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    margin: 0 auto;
    display: flex;
`
export const ProductImgDiv = styled.div`
    width: 40%;
    height: 100%;
    margin-left: 30px;
`
export const ProductImg = styled.img`
    height: 100%;
`
export const ProductInfoDiv = styled.div`
    width: 50%;
`
export const ProductInfoTitle = styled.h2`

`
export const ProductInfoDivider = styled.div`
    height: 1px;
    width: 100%;
    background-color: #000;
`
export const ProductInfoCategory = styled.p`

`
export const ProductInfoFactory = styled.p`

`

export const ProductInfoYear = styled.p`
`
export const ProductInfoAlc = styled.p`

`
export const ProductInfoMl = styled.p`

`
export const PostCommentBtn = styled(Link)`
    width: 80px;
    height: 40px;
    background-color: #f7f7f7;
    padding: 10px;
    text-decoration: none;
`
