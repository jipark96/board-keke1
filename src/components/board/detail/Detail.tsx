import React, { useEffect, useState } from "react";
import {
  BoardBody,
  BoardContent,
  BoardHeader,
  BoardTitle,
  BoardWrapper,
  EditDeleteButton,
  TitleWrap,
  UserName,
} from "./DetailStyles";
import Btn from "../../common/btn/Btn";
import Comment from "./comment/Comment";
import Layout from "../../../layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/Utils";

interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  commentList: string[];
}

const Detail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/board/${boardId}`
        );
        setPost(response.data.result);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchData();
  }, [boardId]);

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:8080/board/${boardId}`);
        navigation("/board");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <Layout>
      <BoardWrapper>
        {post && (
          <>
            <EditDeleteButton>
              <Btn text="삭제" size="small" onClick={handleDelete} />
              <Btn
                text="수정"
                size="small"
                onClick={() => navigation(`/board/edit/${post.id}`)}
              />
            </EditDeleteButton>
            <BoardHeader>
              <UserName>아이디{post.username}</UserName>
              {formatDate(post.createdAt)}
            </BoardHeader>
            <hr />
            <BoardBody>
              <TitleWrap>
                <BoardTitle>{post.title}</BoardTitle>
                <BoardContent>{post.content}</BoardContent>
              </TitleWrap>
            </BoardBody>
            <hr />
            <Comment commentList={post.commentList} />
          </>
        )}
      </BoardWrapper>
    </Layout>
  );
};

export default Detail;
