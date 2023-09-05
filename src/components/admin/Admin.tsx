import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Layout from "../../layout/Layout";
import { Container } from "./AdminStyles";
import Content from "./content/Content";

const Admin = () => {
  return (
    <Layout>
      <Container>
        <Sidebar />
        <Content />
      </Container>
    </Layout>
  );
};

export default Admin;
