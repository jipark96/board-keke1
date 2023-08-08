import React from "react";

import {
  BoardBody,
  BoardCard,
  BoardCardFooter,
  BoardHeader,
  BoardImg,
  BoardListCotainer,
  BoardListWrapper,
  BoardText,
  BoardTitle,
} from "./BoardListStyles";
import Layout from "../../layout/Layout";
const BoardList = () => {
  return (
    <Layout>
      <BoardListCotainer>
        <BoardListWrapper>
          <BoardHeader>전체 게시물</BoardHeader>
          <BoardBody>
            <BoardCard>
              <BoardImg>{/* <img src={} /> */}</BoardImg>
              <BoardText>
                <BoardTitle>제목</BoardTitle>
                <div>내용</div>
              </BoardText>
              <BoardCardFooter>
                <div>아이디</div>
                <div>날짜</div>
              </BoardCardFooter>
            </BoardCard>

            <BoardCard>
              <BoardImg>{/* <img src={} /> */}</BoardImg>
              <BoardText>
                <BoardTitle>제목</BoardTitle>
                <div>내용</div>
              </BoardText>
              <BoardCardFooter>
                <div>아이디</div>
                <div>날짜</div>
              </BoardCardFooter>
            </BoardCard>
          </BoardBody>
        </BoardListWrapper>
      </BoardListCotainer>
    </Layout>
  );
};

export default BoardList;
