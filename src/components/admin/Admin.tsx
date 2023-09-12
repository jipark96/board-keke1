import React from "react";

import Layout from "../../layout/Layout";
import { Container } from "./AdminStyles";
import Content from "./content/Content";
import Sidebar from "../common/sidebar/Sidebar";

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
