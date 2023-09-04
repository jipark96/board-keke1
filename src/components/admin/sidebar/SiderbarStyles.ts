import { styled } from "styled-components";

export const Container = styled.div`
  flex: 1;
  background-color: rgb(240, 239, 239);
  height: calc(100vh - 50px);
`;

export const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;

export const SidebarMenu = styled.div`
  margin-bottom: 32px;
`;

export const SidebarTitle = styled.div`
  font-size: 20px;
  color: rgb(197, 197, 197);
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 12px;
`;

export const SidebarListItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;

  &:hover {
    background-color: rgb(212, 209, 235);
  }

  &:active {
    background-color: rgb(212, 209, 235);
  }
`;
