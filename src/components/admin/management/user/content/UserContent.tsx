import React, { useEffect, useState } from "react";

import {
  BoardHeader,
  Container,
  Content,
  Remove,
  RemoveBtn,
  TitleMain,
  TitleNumber,
  TitleOther1,
  Wrapper,
} from "./UserContentStyles";
import { UserListData } from "../../../../../types/user.data";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUserList } from "../../../../../api/userApi";

const UserContent = () => {
  const [userList, setUserList] = useState<UserListData[]>([]);

  const navigation = useNavigate();

  //[유저 정보 가져오기]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userListData = await getUserList();
        setUserList(userListData);
      } catch (error) {
        console.error("유저 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
  }, []);

  //[회원 탈퇴]
  const handleDelete = async (userId: string) => {
    if (window.confirm("정말로 회원 탈퇴시키겠습니까??")) {
      try {
        await deleteUser(userId);

        const userListData = await getUserList();
        setUserList(userListData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Wrapper>
      <BoardHeader>유저 리스트</BoardHeader>
      <Container>
        <thead>
          <TitleNumber>유저번호</TitleNumber>
          <TitleMain>이메일</TitleMain>
          <TitleOther1>아이디</TitleOther1>
          <TitleNumber>이름</TitleNumber>
          <Remove>삭제</Remove>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <Content>{user.id}</Content>
              <Content
                onClick={() => navigation(`/mypage/${user.id}`)}
                style={{ cursor: "pointer" }}
              >
                {user.email}
              </Content>
              <Content>{user.username}</Content>
              <Content>{user.name}</Content>
              <RemoveBtn onClick={() => handleDelete(user.id.toString())}>
                삭제
              </RemoveBtn>
            </tr>
          ))}
        </tbody>
      </Container>
    </Wrapper>
  );
};

export default UserContent;
