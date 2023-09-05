import React, { useState } from "react";

import {
  BoardHeader,
  Container,
  Content,
  Remove,
  RemoveBtn,
  TitleMain,
  TitleNumber,
  TitleOther1,
  TitleOther2,
  Wrapper,
} from "./UserContentStyles";
import { UserListData } from "../../../../../types/user.data";
import { useNavigate } from "react-router-dom";

const UserContent = () => {
  const [userList, setUserList] = useState<UserListData[]>([]);

  const navigation = useNavigate();

  return (
    <Wrapper>
      <BoardHeader>유저 리스트</BoardHeader>
      <Container>
        <thead>
          <TitleNumber>유저번호</TitleNumber>
          <TitleMain>이메일</TitleMain>
          <TitleOther1>아이디</TitleOther1>
          <TitleOther2>비밀번호</TitleOther2>
          <TitleNumber>이름</TitleNumber>
          <Remove>삭제</Remove>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <Content>{user.id}</Content>
              <Content
                onClick={() => navigation(`/user/${user.id}`)}
                style={{ cursor: "pointer" }}
              >
                {user.email}
              </Content>
              <Content>{user.username}</Content>
              <Content>{user.password}</Content>
              <Content>{user.name}</Content>
              <RemoveBtn>삭제</RemoveBtn>
            </tr>
          ))}
        </tbody>
      </Container>
    </Wrapper>
  );
};

export default UserContent;
