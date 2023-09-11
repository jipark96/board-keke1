import React from "react";
import {
  Container,
  SidebarList,
  SidebarListItem,
  SidebarMenu,
  SidebarTitle,
  SidebarWrapper,
} from "./SiderbarStyles";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const userId = localStorage.getItem("userId");

  const navigation = useNavigate();

  const handleBoard = () => {
    navigation("/board");
  };

  const handleBoardWrite = () => {
    navigation("/board/write");
  };

  const handleUserBoard = () => {
    navigation(`/mypage/myboard/${userId}`);
  };

  return (
    <Container>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>MyPage</SidebarTitle>
          <SidebarList>
            <SidebarListItem onClick={handleBoard}>Home</SidebarListItem>
            <SidebarListItem onClick={handleBoardWrite}>글쓰기</SidebarListItem>
            <SidebarListItem onClick={handleUserBoard}>
              내 글 보기
            </SidebarListItem>
            <SidebarListItem>내 댓글 보기</SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </Container>
  );
};

export default Sidebar;
