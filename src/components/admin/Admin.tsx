import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Layout from "../../layout/Layout";
import { Cotainer } from "./AdminStyles";
import Content from "./content/Content";

const Admin = () => {
  return (
    <Layout>
      <Cotainer>
        <Sidebar />
        <Content />
      </Cotainer>
    </Layout>
  );
};

export default Admin;
