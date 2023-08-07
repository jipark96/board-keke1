import { styled } from "styled-components";

export interface ButtonStyleProps {
  size: "big" | "small";
  disabled?: boolean;
}

const buttonSize = {
  big: "600px",
  small: "100px",
};

export const ButtonWrap = styled.button<ButtonStyleProps>`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: ${({ size }) => buttonSize[size]};
  border: none;
  font-weight: 600;
  font-size: 20px;
  background-color: ${({ disabled }) => (disabled ? "#E5E5E5" : "#36f")};
  color: ${({ disabled }) => (disabled ? "#F2F2F2" : "#FFFFFF")};
`;
