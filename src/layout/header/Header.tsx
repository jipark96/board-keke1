import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderMenu, HeaderTitle, HeaderWrapper } from "./HeaderStyles";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  const checkLoginStatus = () => {
    const token = localStorage.getItem("jwtToken");
    const storedName = localStorage.getItem("name");

    if (token && storedName) {
      setIsLoggedIn(true);
      setName(storedName);
    } else {
      setIsLoggedIn(false);
      setName("");
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <HeaderWrapper>
      <HeaderTitle>
        <Link to="/board">
          <span>Board</span>
        </Link>
      </HeaderTitle>
      <HeaderMenu>
        <Link to="/board">게시판</Link>
        <Link to="/board/write">글쓰기</Link>
        {isLoggedIn ? (
          <>
            <span>{name}</span>
            <Link
              to="#"
              onClick={() => {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("name");
                setIsLoggedIn(false);
              }}
            >
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/join">회원가입</Link>
          </>
        )}
      </HeaderMenu>
    </HeaderWrapper>
  );
};

export default Header;
