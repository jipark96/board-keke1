import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinPage from "./pages/join/Join";
import LoginPage from "./pages/login/Login";
import BoardListPage from "./pages/board/BoardList";
import WritePage from "./pages/board/write/Write";
import EditPage from "./pages/board/edit/Edit";
import DetailPage from "./pages/board/detail/Detail";
import MyPagePage from "./pages/mypage/MyPage";
import EditMyPage from "./pages/mypage/edit/Edit";
import AdminPage from "./pages/admin/Admin";

const loading = <div>화면을 불러오는 중 입니다.</div>;

// Pages
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

//컴포넌트
const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/board" element={<BoardListPage />} />
          <Route path="/" element={<BoardListPage />} />
          <Route path="/board/write" element={<WritePage />} />
          <Route path="/board/edit/:boardId" element={<EditPage />} />
          <Route path="/board/:boardId" element={<DetailPage />} />
          <Route path="/mypage/:userId" element={<MyPagePage />} />
          <Route path="/mypage/edit/:userId" element={<EditMyPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
