import { styled } from "styled-components";

export const StyledReply = styled.div`
  padding: 10px;
  margin-left: 20px;
`;

export const CommentDateWrap = styled.div`
  display: flex;
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

export const Remove = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: gray;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

export const CommentHeader = styled.div`
  margin: 16px 0;
  display: flex;
`;

export const Input = styled.input`
  height: 42px;
  width: 480px;
  margin-right: 16px;
`;
