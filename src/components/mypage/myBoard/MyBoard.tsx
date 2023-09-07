import React from "react";
import Layout from "../../../layout/Layout";
import { Container, Wrapper } from "./MyBoardStyles";
import Sidebar from "../../board/sidebar/Sidebar";
import MyBoardContent from "./content/MyBoardContent";

const MyBoard = () => {
  return (
    <Layout>
      <Container>
        <Sidebar />
        <Wrapper>
          <MyBoardContent />
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default MyBoard;
