import React from "react";
import {
  Cotainer,
  Content,
  Title,
  Wrapper,
  BtnWrapper,
} from "./BoardListStyles";
import Btn from "../common/btn/Btn";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";

const BoardList = () => {
  const navigation = useNavigate();

  const handleBtnClick = () => {
    navigation("/board/write");
  };
  return (
    <Layout>
      <Wrapper>
        <Cotainer>
          <thead>
            <Title>글번호</Title>
            <Title>제목</Title>
            <Title>아이디</Title>
          </thead>
          <tbody>
            <tr>
              <Content>1</Content>
              <Content>제목</Content>
              <Content>아이디</Content>
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
  );
};

export default BoardList;
