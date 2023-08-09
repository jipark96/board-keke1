import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BoardHeader,
  BtnWrapper,
  Content,
  Cotainer,
  TitleMain,
  TitleNumber,
  TitleOther1,
  TitleOther2,
  Wrapper,
} from "./BoardListStyles";

import axios from "axios";
import Layout from "../../layout/Layout";
import Btn from "../common/btn/Btn";

interface Post {
  id: number;
  title: string;
  username: string;
  createdAt: string;
}

const List = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const navigation = useNavigate();

  const handleBtnClick = () => {
    navigation("/board/write");
  };
  //[날짜 변환]
  const formatDate = (input: string | any[]) => {
    let date: Date;

    if (typeof input === "string") {
      const correctedDateString = input.replace(" ", "T") + "Z";
      date = new Date(correctedDateString);
    } else if (Array.isArray(input) && input.length >= 3) {
      const year = input[0];
      const month = input[1] - 1;
      const day = input[2];
      const hours = input[3] || 0;
      const minutes = input[4] || 0;
      date = new Date(year, month, day, hours, minutes);
    } else {
      console.error("Invalid input:", input);
      return "";
    }

    const formatter = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return formatter.format(date);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/board?startPage=0"
        );
        const result = response.data.result;

        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Layout>
        <Wrapper>
          <BoardHeader>전체 게시물</BoardHeader>
          <Cotainer>
            <thead>
              <TitleNumber>글번호</TitleNumber>
              <TitleMain>제목</TitleMain>
              <TitleOther1>아이디</TitleOther1>
              <TitleOther2>등록일자</TitleOther2>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <Content>{post.id}</Content>
                  <Content>{post.title}</Content>
                  <Content>{post.username}</Content>
                  <Content>{formatDate(post.createdAt)}</Content>
                </tr>
              ))}
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
