import React, { ReactNode } from "react";
import Header from "./header/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header>
        <Header />
      </header>

      <div>{children}</div>
    </>
  );
};

export default Layout;
