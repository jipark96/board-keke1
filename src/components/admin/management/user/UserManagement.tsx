import React from "react";
import Layout from "../../../../layout/Layout";
import { Container, Wrapper } from "./UserManagementStyles";
import UserContent from "./content/UserContent";
import Sidebar from "../../../common/sidebar/Sidebar";

const UserManagement = () => {
  return (
    <Layout>
      <Container>
        <Sidebar />
        <Wrapper>
          <UserContent />
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default UserManagement;
