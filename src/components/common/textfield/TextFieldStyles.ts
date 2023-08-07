import { styled } from "styled-components";

export const TextFieldWrap = styled.div`
  width: 600px;
`;

export const TextFieldTitle = styled.p`
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
`;

export const TextFieldInput = styled.input`
  padding: 18px 0px 18px 18px;
  width: calc(100% - 18px);
  height: 8px;
  border: 1px solid #171717;
  font-weight: 500;
  font-size: 12px;

  &:focus {
    outline: none;
    border: 1px solid #36f;
  }
`;
