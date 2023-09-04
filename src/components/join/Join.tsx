import React, { useState } from "react";
import TextField from "../common/textfield/TextField";
import { JoinCotainer, JoinTitle, JoinWrap } from "./JoinStyles";
import { useForm } from "react-hook-form";
import { setJoinData } from "../../redux/features/join";
import PasswordField from "../common/passwordfield/PasswordField";
import Btn from "../common/btn/Btn";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { joinUser } from "../../api/userApi";

interface FormState {
  username: string;
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

const initialState: FormState = {
  username: "",
  name: "",
  email: "",
  password: "",
  passwordCheck: "",
};

const Join = () => {
  const navigation = useNavigate();

  // [회원 가입 데이터를 서버로 전송]
  const joinSubmit = async () => {
    const { username, name, email, password, passwordCheck } = joinData;

    console.log("Data to send:", {
      username,
      name,
      email,
      password,
      passwordCheck,
    });

    try {
      const response = await joinUser(
        username,
        name,
        email,
        password,
        passwordCheck
      );

      if (response.status === 200) {
        console.log("등록 성공!");
      } else {
        console.error("등록 실패:", response.data);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  //[redux 변수, 회원 가입 데이터 가져오기]
  const dispatch = useDispatch();
  const joinData = useSelector((state: any) => state.join);

  //[폼 객체]
  const [form, setForm] = useState<FormState>(initialState);

  //[아이디 변경 핸들러]
  const handleUserNameChange = (e: any) => {
    setForm((prevForm) => ({ ...prevForm, username: e.target.value }));
    dispatch(setJoinData({ username: e.target.value }));
  };

  //[이메일 변경 핸들러]
  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setForm((prevForm) => ({ ...prevForm, email: value }));
    dispatch(setJoinData({ email: value }));
  };
  //[이름 변경 핸들러]
  const handleNameChange = (e: any) => {
    setForm((prevForm) => ({ ...prevForm, name: e.target.value }));
    dispatch(setJoinData({ name: e.target.value }));
  };

  //[비밀번호 일치 여부, 유효성 상태 변경 핸들러]
  const [isPasswordMismatched, setPasswordMismatched] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handlePasswordChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, password: value }));
    dispatch(setJoinData({ password: value }));
  };

  const handlePasswordCheckChange = (value: string) => {
    setForm((prevForm) => ({ ...prevForm, passwordCheck: value }));

    if (form.password !== "" && form.password !== value) {
      setPasswordMismatched(true);
    } else {
      setPasswordMismatched(false);
    }
  };

  const handlePasswordValidityChange = (validity: boolean) => {
    console.log("비밀번호 유효성: ", validity);
    setIsPasswordValid(validity);
  };

  //[입력체크]
  const isFormFilled = () => {
    return (
      form.username &&
      form.email &&
      form.name &&
      form.password &&
      form.passwordCheck &&
      !isPasswordMismatched &&
      isPasswordValid
    );
  };

  //[회원 가입]
  const onSubmit = () => {
    joinSubmit();
    navigation("/login");
    console.log(joinData);
  };

  return (
    <Layout>
      <JoinCotainer>
        <JoinTitle>회원 가입</JoinTitle>
        <JoinWrap>
          <TextField
            title="아이디"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={form.username}
            onChange={handleUserNameChange}
          />
          <TextField
            title="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={form.email}
            onChange={(e) => handleEmailChange(e)}
          />
          <TextField
            title="이름"
            type="text"
            placeholder="이름을 입력해주세요"
            value={form.name}
            onChange={handleNameChange}
          />
          <PasswordField
            title="비밀번호"
            type="password"
            placeholder="영문 소문자 + 숫자 + 기호 조합 8자 이상으로 입력해주세요"
            required="영문 소문자 + 숫자 + 기호 조합 8자 이상으로 입력해주세요"
            onValueChange={handlePasswordChange}
            onValidityChange={handlePasswordValidityChange}
          />

          <PasswordField
            title="비밀번호 확인"
            type="password"
            placeholder="동일한 비밀번호를 입력해주세요"
            required="동일한 비밀번호를 입력해주세요"
            onValueChange={handlePasswordCheckChange}
            isPasswordMatch={!isPasswordMismatched}
          />
          <Btn
            text="완료"
            size="big"
            disabled={!isFormFilled()}
            onClick={onSubmit}
          />
        </JoinWrap>
      </JoinCotainer>
    </Layout>
  );
};

export default Join;
