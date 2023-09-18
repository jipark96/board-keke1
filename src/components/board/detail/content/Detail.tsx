import React, { useCallback, useEffect, useState } from "react";
import {
  BoardBody,
  BoardBody2,
  BoardContent,
  BoardHeader,
  BoardImg,
  BoardImgWrapper,
  BoardLike,
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
import {
  deleteBoard,
  getBoard,
  getFile,
  updateLike,
} from "../../../../api/boardApi";
import { serverUrl } from "../../../../api/commonApi";

const Detail = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [post, setPost] = useState<BoardDetailData | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const navigation = useNavigate();

  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  //[게시물 가져오기]
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
  const downloadFile = useCallback(async (fileId: number, fileName: string) => {
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
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }, []);

  //[좋아요]
  const handleLike = async () => {
    try {
      if (boardId && userId) {
        const result = await updateLike(boardId, userId);

        if (result.status === 200) {
          //[좋아요 상태 토글]
          setIsLiked(!isLiked);

          //좋아요 수 업데이트
          if (post) {
            setPost({
              ...post,
              likeCount: post.likeCount + (isLiked ? -1 : +1),
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
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
                {formatDate(post.createdAt)} 👁‍🗨: {post.view} 👍🏻:{" "}
                {post.likeCount}
              </Date>
            </BoardHeader>
            <hr />
            <BoardBody>
              <TitleWrap>
                <BoardHeader>
                  <BoardTitle>{post.title}</BoardTitle>
                  <BoardLike onClick={handleLike}>좋아요 👍🏻</BoardLike>
                </BoardHeader>

                <BoardBody2>
                  {post.imageList && post.imageList.length > 0 && (
                    <BoardImgWrapper>
                      {post.imageList.map((image, index) => (
                        <BoardImg
                          key={index}
                          src={serverUrl + image.imageUrl}
                          alt={`Image ${index}`}
                        />
                      ))}
                    </BoardImgWrapper>
                  )}
                  <BoardContent>{post.content}</BoardContent>
                </BoardBody2>
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
            <Comment commentList={post?.commentList || []} />
          </>
        )}
      </BoardWrapper>
    </>
  );
};

export default Detail;
