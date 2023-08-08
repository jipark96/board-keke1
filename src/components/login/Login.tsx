import React, { useState } from "react";
import { BottomText, Box, LoginText, Section, Wrapper } from "./LoginStyles";
import LoginTextField from "../common/logintextfield/LoginTextField";
import { Link } from "react-router-dom";
import Btn from "../common/btn/Btn";
import Layout from "../../layout/Layout";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setuserName(event.currentTarget.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Layout>
      <Section>
        <LoginText>로그인</LoginText>
        <Wrapper>
          <LoginTextField
            type="text"
            placeholder="아이디"
            value={userName}
            onChange={handleEmailChange}
          />
          <LoginTextField
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <Btn text="로그인" disabled={false} size="big" />
        </Wrapper>
        <Box>
          <Link to="/join">
            <BottomText>회원가입</BottomText>
          </Link>
        </Box>
      </Section>
    </Layout>
  );
};

export default Login;
