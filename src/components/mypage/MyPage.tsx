import React, { useEffect, useState } from "react";
import { Box, Edit, Info, Remove, Section, Title } from "./MyPageStyles";
import Layout from "../../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { User } from "../../types/user.data";
import { getUser } from "../../api/userApi";

const MyPageProps = {
  id: 0,
  name: "",
  username: "",
  email: "",
};

const MyPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userInfo, setUserInfo] = useState<User>(MyPageProps);
  const navigation = useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");

  //[회원 탈퇴]
  const handleDelete = async () => {
    if (window.confirm("정말로 회원 탈퇴하시겠습니까??")) {
      try {
        await axios.delete(`http://localhost:8080/user/${userId}`, {
          headers: {
            "X-ACCESS-TOKEN": jwtToken,
          },
        });

        // [회원 탈퇴 후 로컬 스토리지에서 관련 정보 제거]
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("name");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        navigation("/");
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
