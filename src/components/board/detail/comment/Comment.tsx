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
import { CommentData } from "../../../../types/board.data";
import {
  createComment,
  createReply,
  deleteComment,
  patchComment,
} from "../../../../api/commentApi";

interface ReplyProps {
  parentId: number | null;
  content: string;
}

const Comment: React.FC<CommentData> = ({ commentList }) => {
  const { boardId } = useParams<{ boardId: string }>();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(commentList);

  const [showReply, setShowReply] = useState<{ [key: number]: boolean }>({});

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정 중인 댓글의 ID
  const [editedContent, setEditedContent] = useState(""); // 수정 중인 댓글의 내용

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
    // parentId와 내용이 비어있다면 아무 작업도 수행하지 않음
    if (!reply.parentId || !reply.content) {
      return;
    }
    try {
      if (boardId) {
        const result = await createReply(
          boardId,
          reply.content,
          reply.parentId
        );

        // 상태에 새로운 대댓글을 추가하고 입력 상태를 초기화
        setComments((prevComments) => [
          ...prevComments,
          {
            ...result,
            parentCommentId: reply.parentId,
          },
        ]);
        setReply({ parentId: null, content: "" });
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  //[댓글 생성]
  const handleSubmitComment = async () => {
    try {
      if (boardId) {
        const result = await createComment(boardId, commentInput);
        setComments([
          ...comments,
          {
            ...result,
          },
        ]);

        setCommentInput("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  //[댓글 삭제]
  const handleDeleteComment = async (commentId: number) => {
    try {
      if (boardId) {
        await deleteComment(boardId, commentId);

        // 삭제된 댓글을 상태에서 제거
        setComments(comments.filter((comment) => comment.id !== commentId));
      }
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
      if (boardId) {
        await patchComment(boardId, commentId, editedContent);

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
      }
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
