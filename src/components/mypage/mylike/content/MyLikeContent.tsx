import React, { useEffect, useState } from "react";
import { BoardListData } from "../../../../types/board.data";
import { useNavigate } from "react-router-dom";
import { getLikeBoard } from "../../../../api/userApi";
import { formatDate } from "../../../../utils/Utils";
import {
  BoardHeader,
  Container,
  Content,
  TitleMain,
  TitleNumber,
  TitleOther1,
  TitleOther2,
  TitleOther3,
  Wrapper,
} from "./MyLikeContentStyles";

const MyLikeContent = () => {
  const [posts, setPosts] = useState<BoardListData[]>([]);

  const userId = localStorage.getItem("userId");
  const navigation = useNavigate();

  //[게시물 조회]
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (userId) {
          const result = await getLikeBoard(userId);
          setPosts(result.boardList);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts(); // 컴포넌트가 마운트되었을 때 게시물 목록을 불러옴
  }, []);
  return (
    <>
      <Wrapper>
        <BoardHeader>내 게시물</BoardHeader>
        <Container>
          <thead>
            <TitleNumber>글번호</TitleNumber>
            <TitleMain>제목</TitleMain>
            <TitleOther1>아이디</TitleOther1>
            <TitleOther2>등록일자</TitleOther2>
            <TitleOther3>조회수</TitleOther3>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <Content>{post.id}</Content>
                <Content
                  onClick={() => navigation(`/board/${post.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {post.title}
                </Content>
                <Content>{post.username}</Content>
                <Content>{formatDate(post.createdAt)}</Content>
                <Content>
                  👁‍🗨{post.view} 👍🏻{post.likeCount} 💭
                  {post.commentList?.length || 0}
                </Content>
              </tr>
            ))}
          </tbody>
        </Container>
      </Wrapper>
    </>
  );
};

export default MyLikeContent;
