import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BoardHeader,
  BtnWrapper,
  Content,
  Cotainer,
  Input,
  PageArrow,
  PageNumber,
  PageWrap,
  SearchWrap,
  TitleMain,
  TitleNumber,
  TitleOther1,
  TitleOther2,
  Wrapper,
} from "./BoardListStyles";

import Layout from "../../../layout/Layout";
import Btn from "../../common/btn/Btn";
import { formatDate } from "../../../utils/Utils";
import { BoardListData } from "../../../types/board.data";
import { getBoardList } from "../../../api/boardApi";

const BoardList = () => {
  const [posts, setPosts] = useState<BoardListData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const navigation = useNavigate();

  const handleBtnClick = () => {
    navigation("/board/write");
  };

  //[현재 페이지]
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //[페이지 버튼]
  const PageButton = ({ page }: { page: number }) => (
    <PageNumber
      onClick={() => handlePageClick(page)}
      active={currentPage === page}
    >
      {page + 1}
    </PageNumber>
  );

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  //[검색]
  const handleSearch = async () => {
    try {
      const result = await getBoardList(currentPage, 8, searchKeyword);
      setPosts(result.boardList);
      // 전체 페이지 수 계산
      const totalCount = result.totalCount;
      const totalPages = Math.ceil(totalCount / 8);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getBoardList(currentPage, 8);
        setPosts(result.boardList);

        // 전체 페이지 수 계산
        const totalCount = result.totalCount;
        const totalPages = Math.ceil(totalCount / 8);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // 컴포넌트가 마운트되었을 때 게시물 목록을 불러옴
  }, [currentPage]);
  return (
    <>
      <Wrapper>
        <BoardHeader>전체 게시물</BoardHeader>
        <Cotainer>
          <thead>
            <TitleNumber>글번호</TitleNumber>
            <TitleMain>제목</TitleMain>
            <TitleOther1>아이디</TitleOther1>
            <TitleOther2>등록일자</TitleOther2>
            <TitleNumber>조회수</TitleNumber>
          </thead>
          <tbody>
            {posts.map((post, i) => (
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
                <Content>{post.view}</Content>
              </tr>
            ))}
          </tbody>
        </Cotainer>
        <SearchWrap>
          <Input
            placeholder="키워드를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Btn text="검색" size="small" onClick={handleSearch} />
          <BtnWrapper>
            <Btn
              text="글쓰기"
              size="small"
              disabled={false}
              onClick={handleBtnClick}
            />
          </BtnWrapper>
        </SearchWrap>
        <PageWrap>
          <PageArrow onClick={handlePrevPage}>{"<"}</PageArrow>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton key={index} page={index} />
          ))}
          <PageArrow onClick={handleNextPage}>{">"}</PageArrow>
        </PageWrap>
      </Wrapper>
    </>
  );
};

export default BoardList;
