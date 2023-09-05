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

  const handleBoard = () => {
    navigation("/board");
  };

  const handleBoardWrite = () => {
    navigation("/board/write");
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
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarList>
            <SidebarListItem onClick={handleBoard}>Home</SidebarListItem>
            <SidebarListItem onClick={handleBoardWrite}>글쓰기</SidebarListItem>
            <SidebarListItem>내 글 보기</SidebarListItem>
            <SidebarListItem>내 댓글 보기</SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>management</SidebarTitle>
          <SidebarList>
            <SidebarListItem onClick={handleUserMangement}>
              회원 관리
            </SidebarListItem>
            <SidebarListItem onClick={handleBoardManagement}>
              글 관리
            </SidebarListItem>
            <SidebarListItem>댓글 관리</SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </Container>
  );
};

export default Sidebar;
