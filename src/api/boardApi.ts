import axios from "axios";

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
    `http://localhost:8080/board?page=${page}&size=${size}&keyword=${keyword}&sortType=${sortType}`
  );
  return response.data.result;
};

//[게시판 상세 정보 가져오기]
export const getBoard = async (boardId: string) => {
  const response = await axios.get(`http://localhost:8080/board/${boardId}`, {
    withCredentials: true,
  });
  return response.data.result;
};

//[게시판 글 삭제]
export const deleteBoard = async (boardId: string) => {
  await axios.delete(`http://localhost:8080/board/${boardId}`, {
    withCredentials: true,
  });
};

//[파일 다운로드]
export const getFile = async (fileId: number) => {
  const response = await axios.get(
    `http://localhost:8080/file/download/${fileId}`,
    {
      responseType: "blob", // 서버에서 바이너리 데이터인 파일을 받기 위해 responseType을 blob으로 설정
      withCredentials: true,
    }
  );
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

  const response = await axios.post(`http://localhost:8080/board`, formData, {
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
  removedOriginFiles: string[]
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

  const response = await axios.patch(
    `http://localhost:8080/board/edit/${boardId}`,
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
  const response = await axios.post(`http://localhost:8080/like`, {
    boardId,
    userId,
  });
  return response;
};
