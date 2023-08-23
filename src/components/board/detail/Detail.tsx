import React, { useEffect, useState } from "react";
import {
  BoardBody,
  BoardContent,
  BoardHeader,
  BoardTitle,
  BoardWrapper,
  Date,
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
  view: number;
  commentList: {
    id: number;
    boardId: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
    parentCommentId: number | null;
  }[];
  fileList: {
    fileId: number;
    fileName: string;
    filePath: string;
  }[];
}

const Detail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigation = useNavigate();

  const username = localStorage.getItem("username");

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

  //[게시물 삭제]
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

  //[파일 다운로드]
  const downloadFile = async (fileId: number, fileName: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/file/download/${fileId}`,
        { responseType: "blob" } // 서버에서 바이너리 데이터인 파일을 받기 위해 responseType을 blob으로 설정
      );

      // 서버로부터 받은 바이너리 데이터를 가지고 URL 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // <a> 요소를 생성하여 파일 다운로드 링크 만들기
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // 파일 이름 설정
      document.body.appendChild(link); // <a> 요소를 문서(body)에 추가
      link.click(); // 링크 클릭하여 파일 다운로드 실행
      link.remove(); // 링크 요소를 제거하여 문서에서 제거
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Layout>
      <BoardWrapper>
        {post && (
          <>
            {post.username === username && (
              <EditDeleteButton>
                <Btn text="삭제" size="small" onClick={handleDelete} />
                <Btn
                  text="수정"
                  size="small"
                  onClick={() => navigation(`/board/edit/${post.id}`)}
                />
              </EditDeleteButton>
            )}
            <BoardHeader>
              <UserName>아이디: {post.username}</UserName>
              <Date>
                {formatDate(post.createdAt)} 조회수: {post.view}
              </Date>
            </BoardHeader>
            <hr />
            <BoardBody>
              <TitleWrap>
                <BoardTitle>{post.title}</BoardTitle>
                <BoardContent>{post.content}</BoardContent>
              </TitleWrap>
            </BoardBody>
            <hr />
            {post.fileList &&
              post.fileList.map((file) => (
                <div key={file.fileId}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      downloadFile(file.fileId, file.fileName);
                    }}
                  >
                    {file.fileName}
                  </a>
                </div>
              ))}
            <Comment commentList={post.commentList} />
          </>
        )}
      </BoardWrapper>
    </Layout>
  );
};

export default Detail;
