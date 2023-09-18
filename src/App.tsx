import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import JoinPage from "./pages/join/Join";
import LoginPage from "./pages/login/Login";
import BoardListPage from "./pages/board/BoardList";
import WritePage from "./pages/board/write/Write";
import EditPage from "./pages/board/edit/Edit";
import DetailPage from "./pages/board/detail/Detail";
import MyPagePage from "./pages/mypage/MyPage";
import EditMyPage from "./pages/mypage/edit/Edit";
import AdminPage from "./pages/admin/Admin";
import BoardManagementPage from "./pages/admin/management/board/BoardManagement";
import UserManagementPage from "./pages/admin/management/user/UserManagement";
import MyBoardPage from "./pages/mypage/myBoard/MyBoard";
import MyCommentPage from "./pages/mypage/mycomment/MyComment";
import MyLikePage from "./pages/mypage/mylike/MyLike";

const loading = <div>화면을 불러오는 중 입니다.</div>;

// Pages
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

//컴포넌트
const App: React.FunctionComponent = () => {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/board" element={<BoardListPage />} />
          <Route path="/" element={<BoardListPage />} />
          <Route
            path="/board/write"
            element={
              role === "USER" || role === "ADMIN" ? (
                <WritePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/board/edit/:boardId" element={<EditPage />} />
          <Route path="/board/:boardId" element={<DetailPage />} />
          <Route path="/mypage/:userId" element={<MyPagePage />} />
          <Route
            path="/mypage/edit/:userId"
            element={
              role === "USER" || role === "ADMIN" ? (
                <EditMyPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/mypage/myboard/:userId"
            element={
              role === "USER" || role === "ADMIN" ? (
                <MyBoardPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/mypage/mycomment/:userId"
            element={
              role === "USER" || role === "ADMIN" ? (
                <MyCommentPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/mypage/mylike/:userId"
            element={
              role === "USER" || role === "ADMIN" ? (
                <MyLikePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin"
            element={role === "ADMIN" ? <AdminPage /> : <Navigate to="/500" />}
          />
          <Route
            path="/admin/management/board"
            element={
              role === "ADMIN" ? (
                <BoardManagementPage />
              ) : (
                <Navigate to="/500" />
              )
            }
          />
          <Route
            path="/admin/management/user"
            element={
              role === "ADMIN" ? <UserManagementPage /> : <Navigate to="/500" />
            }
          />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
