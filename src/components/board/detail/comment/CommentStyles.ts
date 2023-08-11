import { styled } from "styled-components";

export const CommentHeader = styled.div`
  margin: 16px 0;
  display: flex;
`;

export const Input = styled.input`
  height: 42px;
  width: 480px;
  margin-right: 16px;
`;

export const Comment1 = styled.div`
  margin: 8px 0;
`;

export const CommentDateWrap = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const CommentDate = styled.div`
  color: lightgray;
`;

export const CommentContent = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  margin: 6px auto;
`;

export const CommentUserName = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: baseline;
  font-weight: 600;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
