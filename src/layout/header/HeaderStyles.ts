import { styled } from "styled-components";

export const HeaderWrapper = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.2rem 4rem;
  color: #282c34;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const HeaderTitle = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  font-family: "Pacifico", cursive;
`;

export const HeaderMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  flex-shrink: 0;
  margin: 0 1rem;
  gap: 8px;
`;
