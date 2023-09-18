import axios from "axios";
import { serverUrl } from "./commonApi";

const jwtToken = localStorage.getItem("jwtToken");
const username = localStorage.getItem("username");

//[댓글 생성]
export const createComment = async (boardId: string, content: string) => {
  const response = await axios.post(
    `${serverUrl}/board/${boardId}/comment`,
    {
      boardId,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      params: {
        username,
      },
    }
  );
  return response.data.result;
};

//[댓글 삭제]
export const deleteComment = async (boardId: string, commentId: number) => {
  await axios.delete(`${serverUrl}/board/${boardId}/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

//[댓글 수정]
export const patchComment = async (
  boardId: string,
  commentId: number,
  editedContent: string
) => {
  await axios.patch(
    `${serverUrl}/board/${boardId}/comment/${commentId}`,
    { content: editedContent },
    { headers: { Authorization: `Bearer ${jwtToken}` } }
  );
};

//[대댓글 생성]
export const createReply = async (
  boardId: string,
  replyContent: string,
  parentId: number
) => {
  const response = await axios.post(
    `${serverUrl}/board/${boardId}/comment/${parentId}`,
    {
      boardId,
      content: replyContent,
      parentCommentId: parentId,
    },
    {
      headers: { Authorization: `Bearer ${jwtToken}` },
      params: { username },
    }
  );
  return response.data.result;
};
