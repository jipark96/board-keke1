import React from "react";
import Layout from "../../../layout/Layout";
import { Container, Wrapper } from "./MyLikeStyles";
import Sidebar from "../../common/sidebar/Sidebar";
import MyLikeContent from "./content/MyLikeContent";

const MyLike = () => {
  return (
    <Layout>
      <Container>
        <Sidebar />
        <Wrapper>
          <MyLikeContent />
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default MyLike;
