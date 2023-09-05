import React from "react";
import Layout from "../../../../layout/Layout";
import { Container, Wrapper } from "./UserManagementStyles";
import Sidebar from "../../sidebar/Sidebar";
import UserContent from "./content/UserContent";

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
