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
  const navigation = useNavigate();

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const handleBoard = () => {
    navigation("/board");
  };

  const handleBoardWrite = () => {
    navigation("/board/write");
  };

  const handleMyBoard = () => {
    navigation(`/mypage/myboard/${userId}`);
  };

  const handleMyComment = () => {
    navigation(`/mypage/mycomment/${userId}`);
  };

  const handleBoardManagement = () => {
    navigation("/admin/management/board");
  };

  const handleUserMangement = () => {
    navigation("/admin/management/user");
  };

  return (
    <Container>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>mypage</SidebarTitle>
          <SidebarList>
            <SidebarListItem onClick={handleBoard}>Home</SidebarListItem>
            <SidebarListItem onClick={handleBoardWrite}>글쓰기</SidebarListItem>
            <SidebarListItem onClick={handleMyBoard}>
              내 글 보기
            </SidebarListItem>
            <SidebarListItem onClick={handleMyComment}>
              내 댓글 보기
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        {role === "ADMIN" && (
          <SidebarMenu>
            <SidebarTitle>management</SidebarTitle>
            <SidebarList>
              <SidebarListItem onClick={handleUserMangement}>
                회원 관리
              </SidebarListItem>
              <SidebarListItem onClick={handleBoardManagement}>
                글 관리
              </SidebarListItem>
            </SidebarList>
          </SidebarMenu>
        )}
      </SidebarWrapper>
    </Container>
  );
};

export default Sidebar;
