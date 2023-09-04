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
import Btn from "../../../common/btn/Btn";
import Comment from "../comment/Comment";

import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../../utils/Utils";
import { BoardDetailData } from "../../../../types/board.data";
import { deleteBoard, getBoard, getFile } from "../../../../api/boardApi";

const Detail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [post, setPost] = useState<BoardDetailData | null>(null);
  const navigation = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (boardId) {
          // boardId가 존재하는지 확인
          const result = await getBoard(boardId);
          setPost(result);
        }
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
        if (boardId) {
          await deleteBoard(boardId);
          navigation("/board");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  //[파일 다운로드]
  const downloadFile = async (fileId: number, fileName: string) => {
    try {
      const result = await getFile(fileId);

      // 서버로부터 받은 바이너리 데이터를 가지고 URL 생성
      const url = window.URL.createObjectURL(new Blob([result]));

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
    <>
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
    </>
  );
};

export default Detail;
