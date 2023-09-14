import React, { useEffect, useState } from "react";
import {
  Box,
  Edit,
  Image,
  ImageContainer,
  ImgWrap,
  Info,
  Remove,
  Section,
  Title,
} from "./MyPageStyles";
import Layout from "../../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../../types/user.data";
import { deleteUser, getUser } from "../../api/userApi";

import profileImg from "../../assets/profileImg.svg";
import { serverUrl } from "../../api/commonApi";

const MyPageProps = {
  id: 0,
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  imageName: "",
};

const MyPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userInfo, setUserInfo] = useState<User>(MyPageProps);
  const navigation = useNavigate();

  //[회원 탈퇴]
  const handleDelete = async () => {
    if (window.confirm("정말로 회원 탈퇴하시겠습니까??")) {
      try {
        if (userId) {
          await deleteUser(userId);
          // [회원 탈퇴 후 로컬 스토리지에서 관련 정보 제거]
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("name");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");

          navigation("/");
        }
      } catch (error) {
        console.error("Error : ", error);
      }
    }
  };

  // [유저 정보 가져오기]
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const result = await getUser(userId);
          setUserInfo(result);
        }
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <Layout>
      <Section>
        <Title>프로필</Title>
        <ImageContainer>
          <ImgWrap>
            <Image
              src={serverUrl + userInfo?.imageUrl || profileImg}
              width={120}
              height={120}
              alt="profile"
            />
          </ImgWrap>
        </ImageContainer>
        <Info>이름 : {userInfo?.name}</Info>
        <Info>아이디 : {userInfo?.username}</Info>
        <Info>email : {userInfo?.email}</Info>
        <Box>
          <Link to={`/mypage/edit/${userId}`}>
            <Edit>수정</Edit>
          </Link>
          <Remove onClick={handleDelete}>회원 탈퇴</Remove>
        </Box>
      </Section>
    </Layout>
  );
};

export default MyPage;
