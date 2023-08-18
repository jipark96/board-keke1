import React, { useState } from "react";

import { formatDate } from "../../../../../utils/Utils";
import {
  ButtonWrap,
  CommentContent,
  CommentDate,
  CommentDateWrap,
  CommentHeader,
  CommentUserName,
  Input,
  Remove,
} from "./ReplyStyles";
import Btn from "../../../../common/btn/Btn";

interface ReplyProps {
  reply: {
    id: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
  };
  handleDeleteComment: (commentId: number) => void;
  handleEditComment: (commentId: number, editedContent: string) => void;
}

const Reply: React.FC<ReplyProps> = ({
  reply,
  handleDeleteComment,
  handleEditComment,
}) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정 중인 대댓글의 ID
  const [editedContent, setEditedContent] = useState(""); // 수정 중인 대댓글의 내용

  const username = localStorage.getItem("username");

  return (
    <>
      <hr />
      <CommentDateWrap>
        <CommentDate>{formatDate(reply.createdAt)}</CommentDate>
      </CommentDateWrap>
      <CommentContent>{reply.content}</CommentContent>
      <CommentUserName>{reply.username}</CommentUserName>

      {editingCommentId === reply.id ? (
        <CommentHeader>
          <Input
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <Btn
            text="수정"
            size="small"
            onClick={() => {
              handleEditComment(reply.id, editedContent);
              setEditingCommentId(null);
            }}
          />
        </CommentHeader>
      ) : (
        <>
          {reply.username === username && (
            <ButtonWrap>
              <Remove onClick={() => setEditingCommentId(reply.id)}>
                수정
              </Remove>
              <Remove onClick={() => handleDeleteComment(reply.id)}>
                삭제
              </Remove>
            </ButtonWrap>
          )}
        </>
      )}
    </>
  );
};

export default Reply;
