import React, { useState } from "react";
import {
  ButtonWrap,
  Comment1,
  CommentContent,
  CommentDate,
  CommentDateWrap,
  CommentHeader,
  CommentUserName,
  Input,
} from "./CommentStyles";

import Btn from "../../../common/btn/Btn";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../utils/Utils";
import { Remove } from "../DetailStyles";

interface CommentProps {
  commentList: {
    id: number;
    boardId: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
  }[];
}

const Comment: React.FC<CommentProps> = ({ commentList }) => {
  const { boardId } = useParams<{ boardId: string }>();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(commentList);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정 중인 댓글의 ID
  const [editedContent, setEditedContent] = useState(""); // 수정 중인 댓글의 내용

  const jwtToken = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username");

  //[댓글 생성]
  const handleSubmitComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/board/${boardId}/comment`,
        {
          boardId: boardId,
          content: commentInput,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            username: username,
          },
        }
      );
      setComments([
        ...comments,
        {
          ...response.data.result,
        },
      ]);

      setCommentInput("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  //[댓글 삭제]
  const handleDeleteComment = async (commentId: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/board/${boardId}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      // 삭제된 댓글을 상태에서 제거
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  //[댓글 수정]
  const handleEditComment = async (commentId: number) => {
    try {
      await axios.patch(
        `http://localhost:8080/board/${boardId}/comment/${commentId}`,
        {
          content: editedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      // 수정된 댓글 내용 업데이트
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedContent }
            : comment
        )
      );

      // 수정 모드 종료
      setEditingCommentId(null);
      setEditedContent("");
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };
  return (
    <>
      <CommentHeader>
        <Input
          placeholder="댓글을 입력하세요."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Btn text="등록" size="small" onClick={handleSubmitComment} />
      </CommentHeader>
      {comments.map((comment, index) => (
        <Comment1 key={index}>
          <CommentDateWrap>
            <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
          </CommentDateWrap>
          <CommentContent>{comment.content}</CommentContent>
          <CommentUserName>{comment.username}</CommentUserName>
          {editingCommentId === comment.id ? (
            <CommentHeader>
              <Input
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <Btn
                text="수정"
                size="small"
                onClick={() => handleEditComment(comment.id)}
              />
            </CommentHeader>
          ) : (
            <>
              {comment.username === username && (
                <ButtonWrap>
                  <Remove onClick={() => setEditingCommentId(comment.id)}>
                    수정
                  </Remove>
                  <Remove onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </Remove>
                </ButtonWrap>
              )}
            </>
          )}

          <hr />
        </Comment1>
      ))}
    </>
  );
};

export default Comment;
