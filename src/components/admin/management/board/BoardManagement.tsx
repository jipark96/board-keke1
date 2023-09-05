import React from "react";

import BoardContent from "./content/BoardContent";
import { Container, Wrapper } from "./BoardManagementStyles";
import Layout from "../../../../layout/Layout";
import Sidebar from "../../sidebar/Sidebar";

const BoardManagement = () => {
  return (
    <Layout>
      <Container>
        <Sidebar />
        <Wrapper>
          <BoardContent />
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default BoardManagement;
