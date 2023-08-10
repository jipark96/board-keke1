import React, { useState } from "react";
import {
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

interface CommentProps {
  commentList: string[];
}

const Comment: React.FC<CommentProps> = ({ commentList }) => {
  const { boardId } = useParams<{ boardId: string }>();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<string[]>(commentList);

  const jwtToken = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username");

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

      setComments([...comments, response.data.result.content]);
      setCommentInput("");
    } catch (error) {
      console.error("Error adding comment:", error);
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
            <CommentDate>날짜</CommentDate>
          </CommentDateWrap>
          <CommentContent>{comment}</CommentContent>
          <CommentUserName>{username}</CommentUserName>
          <hr />
        </Comment1>
      ))}
    </>
  );
};

export default Comment;
