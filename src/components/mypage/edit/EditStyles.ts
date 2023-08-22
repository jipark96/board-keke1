import { styled } from "styled-components";

export const EditCotainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
`;

export const EditTitle = styled.div`
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  color: #171717;
  margin-bottom: 20px;
`;

export const EditWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const TextFieldWrap = styled.div`
  width: 600px;
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
export const LargeTextFieldTitle = styled.p`
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
`;
