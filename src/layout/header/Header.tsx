import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderMenu, HeaderTitle, HeaderWrapper } from "./HeaderStyles";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const navigation = useNavigate();

  const handleBoard = () => {
    navigation("/board");
  };
  const handleBoardWrite = () => {
    navigation("/board/write");
  };

  const handleLogin = () => {
    navigation("/login");
  };

  const handleJoin = () => {
    navigation("/join");
  };

  const handleMyPage = () => {
    navigation(`/mypage/${userId}`);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const name = localStorage.getItem("name");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (jwtToken && name && username && userId) {
      setIsLoggedIn(true);
      setName(name);
      setUserId(userId);
    } else {
      setIsLoggedIn(false);
      setName("");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);

    window.dispatchEvent(new Event("logout"));
    navigation("/");
  };

  return (
    <HeaderWrapper>
      <HeaderTitle onClick={handleBoard}>Board</HeaderTitle>
      <HeaderMenu>
        <span onClick={handleBoard}>게시판</span>
        <span onClick={handleBoardWrite}>글쓰기</span>
        {isLoggedIn ? (
          <>
            <span>{name}</span>
            <span onClick={handleMyPage}>내정보</span>
            <span onClick={handleLogout}>로그아웃</span>
          </>
        ) : (
          <>
            <span onClick={handleLogin}>로그인</span>
            <span onClick={handleJoin}>회원가입</span>
          </>
        )}
      </HeaderMenu>
    </HeaderWrapper>
  );
};

export default Header;
