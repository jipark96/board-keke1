import { styled } from "styled-components";

export const HeaderWrapper = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 60px;
  color: #282c34;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  /* box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2); */
`;

export const HeaderTitle = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
`;

export const HeaderMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  flex-shrink: 0;
  margin: 0 16px;
  gap: 8px;
`;
