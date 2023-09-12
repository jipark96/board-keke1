import React from "react";
import Layout from "../../../layout/Layout";
import { Container, Wrapper } from "./MyBoardStyles";
import MyBoardContent from "./content/MyBoardContent";
import Sidebar from "../../common/sidebar/Sidebar";

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
