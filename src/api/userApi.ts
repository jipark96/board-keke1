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
