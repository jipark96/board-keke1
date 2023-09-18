import axios from "axios";
import { serverUrl } from "./commonApi";

const jwtToken = localStorage.getItem("jwtToken");
const username = localStorage.getItem("username");

//[게시판 리스트 가져오기]
export const getBoardList = async (
  page: number,
  size: number = 8,
  keyword: string = "",
  sortType: string = ""
) => {
  const response = await axios.get(
    `${serverUrl}/board?page=${page}&size=${size}&keyword=${keyword}&sortType=${sortType}`
  );
  return response.data.result;
};

//[게시판 상세 정보 가져오기]
export const getBoard = async (boardId: string) => {
  const response = await axios.get(`${serverUrl}/board/${boardId}`, {
    withCredentials: true,
  });
  return response.data.result;
};

//[게시판 글 삭제]
export const deleteBoard = async (boardId: string) => {
  await axios.delete(`${serverUrl}/board/${boardId}`, {
    withCredentials: true,
  });
};

//[파일 다운로드]
export const getFile = async (fileId: number) => {
  const response = await axios.get(`${serverUrl}/file/download/${fileId}`, {
    responseType: "blob", // 서버에서 바이너리 데이터인 파일을 받기 위해 responseType을 blob으로 설정
    withCredentials: true,
  });
  return response.data;
};

//[게시판 글 쓰기]
export const createBoard = async (
  title: string,
  content: string,
  files: File[],
  images: File[]
) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);
  files.forEach((file) => {
    formData.append("files", file);
  });

  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await axios.post(`${serverUrl}/board`, formData, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "multipart/form-data",
    },
    params: {
      username,
    },
  });
  return response.data;
};

//[게시판 글 수정]
export const patchBoard = async (
  boardId: string,
  title: string,
  content: string,
  files: File[],
  removedOriginFiles: string[],
  images: File[],
  removedOriginImageUrls: string[]
) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("content", content);

  // 새로운 첨부파일과 지워야 할 첨부파일 목록 전송
  files.forEach((file) => {
    formData.append("files", file);
  });

  // 서버에게 지워야 할 첨부파일 목록 전송(배열 -> 문자열 변환)
  if (removedOriginFiles.length > 0) {
    let deleted_list = JSON.stringify(removedOriginFiles);
    formData.append("deleted", deleted_list);
  }

  // 이미지 파일과 지워야 할 이미지 URL 목록 전송
  images.forEach((image) => {
    formData.append("images", image);
  });

  if (removedOriginImageUrls.length > 0) {
    let deleted_image_urls = JSON.stringify(removedOriginImageUrls);
    formData.append("deletedImages", deleted_image_urls);
  }

  const response = await axios.patch(
    `${serverUrl}/board/edit/${boardId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

//[좋아요]
export const updateLike = async (boardId: string, userId: string) => {
  const response = await axios.post(`${serverUrl}/like`, {
    boardId,
    userId,
  });
  return response;
};
