import axios from "axios";

//[로그인]
export const postLogin = async (username: string, password: string) => {
  const response = await axios.post("http://localhost:8080/user/login", {
    username,
    password,
  });

  return response.data.result;
};

//[회원 정보 가져오기]
export const getUser = async (userId: string) => {
  const response = await axios.get(`http://localhost:8080/user/${userId}`);
  return response.data.result;
};

//[회원 전체 조회]
export const getUserList = async () => {
  const response = await axios.get("http://localhost:8080/user");
  return response.data.result;
};

//[회원 수정]
export const patchUser = async (
  userId: string,
  email: string,
  name: string,
  password: string
) => {
  const jwtToken = localStorage.getItem("jwtToken");

  const requestData = {
    email,
    name,
    password,
  };

  await axios.patch(`http://localhost:8080/user/edit/${userId}`, requestData, {
    headers: {
      "X-ACCESS-TOKEN": jwtToken,
    },
  });
};

//[회원 탈퇴]
export const deleteUser = async (userId: string) => {
  const jwtToken = localStorage.getItem("jwtToken");

  await axios.delete(`http://localhost:8080/user/${userId}`, {
    headers: {
      "X-ACCESS-TOKEN": jwtToken,
    },
  });
};

//[회원 가입]
export const joinUser = async (
  username: string,
  name: string,
  email: string,
  password: string,
  passwordCheck: string
) => {
  const dataToSend = {
    username,
    name,
    email,
    password,
    passwordCheck,
  };

  const response = await axios.post("http://localhost:8080/user", dataToSend);
  return response;
};

//[아이디 중복 확인]
export const checkUsername = async (username: string) => {
  const response = await axios.get(
    `http://localhost:8080/user/check/${username}`
  );
  return response.data;
};

//[자기 글 리스트 조회]
export const getUserBoard = async (
  userId: string,
  page: number,
  size: number = 8,
  keyword: string = "",
  sortType: string = ""
) => {
  const jwtToken = localStorage.getItem("jwtToken");

  const response = await axios.get(
    `http://localhost:8080/user/${userId}/board?page=${page}&size=${size}&keyword=${keyword}&sortType=${sortType}`,
    {
      headers: {
        "X-ACCESS-TOKEN": jwtToken,
      },
    }
  );
  return response.data.result;
};
