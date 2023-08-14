import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 80px;
`;

export const Input1 = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
`;

export const Input2 = styled.textarea`
  width: 100%;
  margin-top: 20px;
  min-height: 300px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  padding-top: 10px;
  background-color: rgb(233, 233, 233);
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const TextFieldWrap = styled.div`
  width: 600px;
`;

export const LargeTextFieldTitle = styled.p`
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
`;

export const LargeTextFieldInput = styled.textarea`
  padding: 18px 0px 18px 18px;
  width: calc(100% - 18px);
  height: 200px;
  border: 1px solid #171717;
  font-weight: 500;
  font-size: 12px;

  &:focus {
    outline: none;
    border: 1px solid #36f;
  }
`;
