import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layout/Layout";
import {
  EditCotainer,
  EditTitle,
  EditWrap,
  LargeTextFieldTitle,
  TextFieldInput,
  TextFieldWrap,
} from "./EditStyles";

import PasswordField from "../../common/passwordfield/PasswordField";
import Btn from "../../common/btn/Btn";
import { getUser, patchUser } from "../../../api/userApi";

const Edit = () => {
  const { userId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  //[이메일]
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  //[이름]
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  //[비밀번호]
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  //[기존 정보 가져오기]
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (userId) {
          const result = await getUser(userId);

          setEmail(result.email);
          setName(result.name);
        }
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    fetchUserInfo(); // 컴포넌트가 마운트되었을 때 유저 정보 불러옴
  }, [userId]);

  //[수정하기]
  const handlePatchClick = async () => {
    try {
      if (userId) {
        await patchUser(userId, email, name, password);

        navigation("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <EditCotainer>
        <EditTitle>회원 정보 수정</EditTitle>
        <EditWrap>
          <TextFieldWrap>
            <LargeTextFieldTitle>이메일</LargeTextFieldTitle>
            <TextFieldInput
              placeholder="이메일"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </TextFieldWrap>
          <TextFieldWrap>
            <LargeTextFieldTitle>이름</LargeTextFieldTitle>
            <TextFieldInput
              placeholder="이름"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </TextFieldWrap>
          <PasswordField
            title="비밀번호"
            type="password"
            placeholder="영문 소문자 + 숫자 + 기호 조합 8자 이상으로 입력해주세요"
            required="영문 소문자 + 숫자 + 기호 조합 8자 이상으로 입력해주세요"
            onValueChange={handlePasswordChange}
          />

          <PasswordField
            title="비밀번호 확인"
            type="password"
            placeholder="동일한 비밀번호를 입력해주세요"
            required="동일한 비밀번호를 입력해주세요"
            onValueChange={(value) => handlePasswordChange(value)}
          />
          <Btn text="수정" size="big" onClick={handlePatchClick} />
        </EditWrap>
      </EditCotainer>
    </Layout>
  );
};

export default Edit;
