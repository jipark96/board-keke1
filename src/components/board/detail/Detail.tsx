import React from "react";
import {
  BoardBody,
  BoardContent,
  BoardHeader,
  BoardImg,
  BoardTitle,
  BoardWrapper,
  Date,
  EditDeleteButton,
  TitleWrap,
  UserName,
} from "./DetailStyles";
import Btn from "../../common/btn/Btn";
import Comment from "./comment/Comment";
import Layout from "../../../layout/Layout";

const Detail = () => {
  return (
    <Layout>
      <BoardWrapper>
        <EditDeleteButton>
          <Btn text="수정" size="small" />
          <Btn text="삭제" size="small" />
        </EditDeleteButton>
        <BoardHeader>
          <UserName>아이디</UserName>
          <Date>날짜</Date>
        </BoardHeader>
        <hr />
        <BoardBody>
          <BoardImg></BoardImg>
          <TitleWrap>
            <BoardTitle>제목</BoardTitle>
            <BoardContent>내용</BoardContent>
          </TitleWrap>
        </BoardBody>
        <hr />
        <Comment />
      </BoardWrapper>
    </Layout>
  );
};

export default Detail;
