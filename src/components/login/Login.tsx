import React, { useState } from "react";
import { BottomText, Box, LoginText, Section, Wrapper } from "./LoginStyles";
import LoginTextField from "../common/logintextfield/LoginTextField";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../common/btn/Btn";
import Layout from "../../layout/Layout";
import Modal from "./modal/Modal";
import { postLogin } from "../../api/userApi";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  //[아이디 변경 핸들러]
  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(event.currentTarget.value);
  };

  //[비밀번호 변경 핸들러]
  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.currentTarget.value);
  };

  //[로그인 처리]
  const handleLogin = async () => {
    try {
      const result = await postLogin(username, password);

      //[서버 응답에서 정보 추출]
      const jwtToken = result.jwtToken;
      const name = result.name;
      const userId = result.id;
      const email = result.email;
      const role = result.role;
      //[로컬 스토리지에 저장]
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      navigate("/board");
    } catch (error) {
      console.log("실패하였습니다", error);
      showModal();
    }
    return;
  };

  return (
    <Layout>
      <Section>
        <LoginText>로그인</LoginText>
        <Wrapper>
          <LoginTextField
            type="text"
            placeholder="아이디"
            value={username}
            onChange={handleUsernameChange}
          />
          <LoginTextField
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <Btn
            text="로그인"
            disabled={false}
            size="big"
            onClick={handleLogin}
          />
        </Wrapper>
        <Box>
          <Link to="/join">
            <BottomText>회원가입</BottomText>
          </Link>
        </Box>
        {modal && (
          <Modal
            title={"로그인 실패"}
            text={"아이디 혹은 비밀번호를 확인해주세요"}
            onClick={closeModal}
          />
        )}
      </Section>
    </Layout>
  );
};

export default Login;
