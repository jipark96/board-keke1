import { styled } from "styled-components";

export interface LoginTextFieldStyleProps {
  isValid?: boolean;
}

export const LoginTextFieldWrap = styled.div`
  width: 600px;
  height: 52px;
`;

export const LoginTextFieldInput = styled.input<LoginTextFieldStyleProps>`
  padding: 18px 0px 18px 18px;
  width: calc(100% - 18px);
  height: 8px;
  border: 1px solid ${({ isValid }) => (isValid ? "#515151" : "#171717")};
  font-weight: 500;
  &:focus {
    outline: none;
    border: 1px solid #36f;
  }
`;
