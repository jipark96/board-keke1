import { styled } from "styled-components";

export interface EmailFieldStyleProps {
  isValid: boolean;
}

export const EmailFieldWrap = styled.div`
  width: 600px;
`;

export const EmailFieldTitle = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
`;

export const EmailFieldInput = styled.input<EmailFieldStyleProps>`
  height: 8px;
  width: calc(100% - 18px);
  border: 1px solid ${({ isValid }) => (isValid ? "#515151" : "#171717")};
  font-weight: 500;
  font-size: 12px;
  padding: 18px 0px 18px 18px;

  &:focus {
    outline: none;
    border: 1px solid #36f;
  }
`;

export const EmailFieldRequired = styled.div`
  margin-top: 12px;
  font-size: 13px;
  font-weight: 500;
  line-height: 100%;
  color: red;
`;
