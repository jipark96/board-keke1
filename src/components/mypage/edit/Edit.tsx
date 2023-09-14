import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layout/Layout";
import {
  EditCotainer,
  EditTitle,
  EditWrap,
  Image,
  ImageContainer,
  ImgBtn,
  ImgFile,
  ImgWrap,
  LargeTextFieldTitle,
  TextFieldInput,
  TextFieldWrap,
  TextFieldWrap1,
} from "./EditStyles";

import PasswordField from "../../common/passwordfield/PasswordField";
import Btn from "../../common/btn/Btn";
import { getUser, patchUser } from "../../../api/userApi";
import EmailField from "../../common/emailfield/EmailField";
import edit from "../../../assets/edit.svg";
import profileImg from "../../../assets/profileImg.svg";

const Edit = () => {
  const { userId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const navigation = useNavigate();

  //[이메일]
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  //[이름]
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  //[비밀번호]
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  //[프로필 사진]
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("password", password);

        if (selectedFile) {
          formData.append("image", selectedFile);
        }

        await patchUser(userId, formData);

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
          <ImageContainer>
            <ImgWrap>
              <Image
                src={previewUrl || profileImg}
                width={180}
                height={180}
                alt="profile"
              />
              <ImgBtn>
                <ImgFile type="file" onChange={handleImageChange} />
                <Image src={edit} width={24} height={24} alt="edit" />
              </ImgBtn>
            </ImgWrap>
          </ImageContainer>

          <TextFieldWrap1>
            <EmailField
              title="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              required="올바른 이메일 형식을 입력해주세요."
              onValueChange={handleEmailChange}
            />
          </TextFieldWrap1>
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
