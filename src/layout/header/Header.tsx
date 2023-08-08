import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderMenu, HeaderTitle, HeaderWrapper } from "./HeaderStyles";

const Header = () => {
  const navigate = useNavigate();

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
        <Link to="/login">로그인</Link>
        <Link to="/join">회원가입</Link>
      </HeaderMenu>
    </HeaderWrapper>
  );
};

export default Header;
