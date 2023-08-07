import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinPage from "./pages/join/Join";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginPage from "./pages/login/Login";
import BoardListPage from "./pages/board/BoardList";
import WritePage from "./pages/board/write/Write";
import EditPage from "./pages/board/edit/Edit";
import DetailPage from "./pages/board/detail/Detail";

const loading = <div>화면을 불러오는 중 입니다.</div>;

// Pages
const Page404 = React.lazy(() => import("./pages/page404/Page404"));
const Page500 = React.lazy(() => import("./pages/page500/Page500"));

//컴포넌트
const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/board/list" element={<BoardListPage />} />
            <Route path="/board/write" element={<WritePage />} />
            <Route path="/board/edit" element={<EditPage />} />
            <Route path="/board/detail" element={<DetailPage />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="/500" element={<Page500 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
