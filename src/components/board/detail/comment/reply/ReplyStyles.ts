import { styled } from "styled-components";

export const StyledComment = styled.div`
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  margin: 16px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledReplies = styled.div`
  margin-left: 40px;
  padding-left: 20px;
`;

export const StyledReply = styled(StyledComment)`
  background-color: #f0f0f0;
  box-shadow: none;
  margin: 8px 0;
`;

export const Input = styled.input`
  height: 42px;
  width: 480px;
  margin-right: 16px;
`;

export const StyledReplyInput = styled(Input)`
  margin: 8px 0;
  width: 100%;
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
