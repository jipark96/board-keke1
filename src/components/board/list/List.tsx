import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout/Layout";
import {
  BtnWrapper,
  Content,
  Cotainer,
  TitleMain,
  TitleNumber,
  TitleOther,
  Wrapper,
} from "./ListStyles";
import Btn from "../../common/btn/Btn";

const List = () => {
  const navigation = useNavigate();

  const handleBtnClick = () => {
    navigation("/board/write");
  };

  return (
    <>
      <Layout>
        <Wrapper>
          <Cotainer>
            <thead>
              <TitleNumber>글번호</TitleNumber>
              <TitleMain>제목</TitleMain>
              <TitleOther>아이디</TitleOther>
              <TitleOther>등록일자</TitleOther>
            </thead>
            <tbody>
              <tr>
                <Content>1</Content>
                <Content>제목</Content>
                <Content>아이디</Content>
                <Content>날짜</Content>
              </tr>
            </tbody>
          </Cotainer>
          <BtnWrapper>
            <Btn
              text="글쓰기"
              size="small"
              disabled={false}
              onClick={handleBtnClick}
            />
          </BtnWrapper>
        </Wrapper>
      </Layout>
    </>
  );
};

export default List;
