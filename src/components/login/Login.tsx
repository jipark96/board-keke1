import React, { useState } from "react";
import { BottomText, Box, LoginText, Section, Wrapper } from "./LoginStyles";
import LoginTextField from "../common/logintextfield/LoginTextField";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../common/btn/Btn";
import Layout from "../../layout/Layout";
import axios from "axios";
import Modal from "./modal/Modal";

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

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(event.currentTarget.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.currentTarget.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        username,
        password,
      });

      const jwtToken = response.data.result.jwtToken;
      const name = response.data.result.name;
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("name", name);
      navigate("/board");
      console.log(response);
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
