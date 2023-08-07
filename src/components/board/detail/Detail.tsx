import React from "react";
import {
  BottomText,
  BtnWrapper,
  BtnWrapperLeft,
  BtnWrapperRight,
  TextWrapper,
  Wrapper,
} from "./DetailStyles";

const Detail = () => {
  return (
    <>
      <Wrapper>
        <TextWrapper>
          <h1>제목입니다.</h1>
          <p>내용이 들어갈 부분입니다.</p>
        </TextWrapper>
        <BtnWrapper>
          <BtnWrapperLeft>
            <BottomText>댓글</BottomText>
          </BtnWrapperLeft>
          <BtnWrapperRight>
            <BottomText>수정</BottomText>
            <BottomText>삭제</BottomText>
          </BtnWrapperRight>
        </BtnWrapper>
      </Wrapper>
    </>
  );
};

export default Detail;
