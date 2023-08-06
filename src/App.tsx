import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
