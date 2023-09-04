import React from "react";
import {
  Container,
  SidebarList,
  SidebarListItem,
  SidebarMenu,
  SidebarTitle,
  SidebarWrapper,
} from "./SiderbarStyles";

const Sidebar = () => {
  return (
    <Container>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarList>
            <SidebarListItem>Home</SidebarListItem>
            <SidebarListItem>글쓰기</SidebarListItem>
            <SidebarListItem>내 글 보기</SidebarListItem>
            <SidebarListItem>내 댓글 보기</SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>management</SidebarTitle>
          <SidebarList>
            <SidebarListItem>회원 관리</SidebarListItem>
            <SidebarListItem>글 관리</SidebarListItem>
            <SidebarListItem>댓글 관리</SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </Container>
  );
};

export default Sidebar;
