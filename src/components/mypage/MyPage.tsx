import React, { useEffect, useState } from "react";
import { Box, Edit, Info, Remove, Section, Title } from "./MyPageStyles";
import Layout from "../../layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface MyPageProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

const MyPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userInfo, setUserInfo] = useState<MyPageProps | null>(null);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${userId}`
        );
        setUserInfo(response.data.result);
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <Layout>
      <Section>
        <Title>MyPage</Title>
        <Info>name : {userInfo?.name}</Info>
        <Info>username : {userInfo?.username}</Info>
        <Info>email : {userInfo?.email}</Info>
        <Box>
          <Edit>수정</Edit>
          <Remove onClick={handleDelete}>회원 탈퇴</Remove>
        </Box>
      </Section>
    </Layout>
  );
};

export default MyPage;
