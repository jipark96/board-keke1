import { styled } from "styled-components";

export interface ModalStyleProps {
  disabled?: boolean;
}

export const ModaleWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

export const ModalSection = styled.div`
  width: 445px;
  padding: 26px 0px 31px 0px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalTitle = styled.h1`
  color: #171717;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 70px;
`;

export const ModalText = styled.div`
  color: #8c8c8c;
  width: 300px;
  flex-flow: wrap;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;

export const ModalButton = styled.button`
  width: 180px;
  height: 52px;
  color: #ffffff;
  background-color: #f36;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  align-self: center;
`;

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  height: 180px;
`;
