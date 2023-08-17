import React from "react";
import {
  CommentContent,
  CommentDate,
  CommentDateWrap,
  CommentUserName,
  StyledReply,
} from "./ReplyStyles";
import { formatDate } from "../../../../../utils/Utils";

interface ReplyProps {
  reply: {
    id: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
  };
}

const Reply: React.FC<ReplyProps> = ({ reply }) => {
  return (
    <StyledReply>
      <CommentDateWrap>
        <CommentDate>{formatDate(reply.createdAt)}</CommentDate>
      </CommentDateWrap>
      <CommentContent>{reply.content}</CommentContent>
      <CommentUserName>{reply.username}</CommentUserName>
    </StyledReply>
  );
};

export default Reply;
