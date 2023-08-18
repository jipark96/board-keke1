import React, { useState } from "react";
import {
  ButtonWrap,
  CommentContent,
  CommentDate,
  CommentDateWrap,
  CommentHeader,
  CommentUserName,
  Input,
  Remove,
  StyledComment,
  StyledReplies,
} from "./CommentStyles";

import Btn from "../../../common/btn/Btn";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../utils/Utils";
import Reply from "./reply/Reply";

interface CommentProps {
  commentList: {
    id: number;
    boardId: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
    parentCommentId: number | null;
  }[];
}

interface ReplyProps {
  parentId: number | null;
  content: string;
}

const Comment: React.FC<CommentProps> = ({ commentList }) => {
  const { boardId } = useParams<{ boardId: string }>();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(commentList);

  const [showReply, setShowReply] = useState<{ [key: number]: boolean }>({});

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정 중인 댓글의 ID
  const [editedContent, setEditedContent] = useState(""); // 수정 중인 댓글의 내용

  const jwtToken = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username");

  //[대댓글 생성]
  const [reply, setReply] = useState<ReplyProps>({
    parentId: null as number | null,
    content: "",
  });

  const handleReplyComment = (parentId: number) => {
    setReply({ parentId: parentId, content: "" });
  };

  const handleSubmitReply = async () => {
    if (!reply.parentId || !reply.content) {
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/board/${boardId}/comment/${reply.parentId}`,
        {
          boardId: boardId,
          content: reply.content,
          parentCommentId: reply.parentId,
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
      setComments((prevComments) => [
        ...prevComments,
        {
          ...response.data.result,
          parentCommentId: reply.parentId,
        },
      ]);
      setReply({ parentId: null, content: "" });
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

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
  const handleEditComment = async (
    commentId: number,
    editedContent: string
  ) => {
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

      {comments
        .filter((comment) => comment.parentCommentId === null)
        .map((comment, index) => (
          <StyledComment key={index}>
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
                  onClick={() => handleEditComment(comment.id, editedContent)}
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

            {showReply[comment.id] && (
              <StyledReplies>
                {comments
                  .filter(
                    (subComment) => subComment.parentCommentId === comment.id
                  )
                  .map((subComment) => (
                    <Reply
                      key={`reply-${subComment.id}`}
                      reply={subComment}
                      handleDeleteComment={handleDeleteComment}
                      handleEditComment={handleEditComment}
                    />
                  ))}
              </StyledReplies>
            )}

            {reply.parentId === comment.id && (
              <>
                <CommentHeader>
                  <Input
                    placeholder="대댓글을 입력하세요."
                    value={reply.content}
                    onChange={(e) =>
                      setReply({ ...reply, content: e.target.value })
                    }
                  />
                  <Btn text="등록" size="small" onClick={handleSubmitReply} />
                </CommentHeader>
              </>
            )}

            <ButtonWrap>
              <Remove onClick={() => handleReplyComment(comment.id)}>
                대댓글 작성
              </Remove>
              <Remove
                onClick={() =>
                  setShowReply((prev) => ({
                    ...prev,
                    [comment.id]: !prev[comment.id],
                  }))
                }
              >
                {showReply[comment.id]
                  ? `${
                      comments.filter(
                        (subComment) =>
                          subComment.parentCommentId === comment.id
                      ).length
                    }개의 대댓글 숨기기`
                  : `${
                      comments.filter(
                        (subComment) =>
                          subComment.parentCommentId === comment.id
                      ).length
                    }개의 대댓글 보기`}
              </Remove>
            </ButtonWrap>
            <hr />
          </StyledComment>
        ))}
    </>
  );
};

export default Comment;
