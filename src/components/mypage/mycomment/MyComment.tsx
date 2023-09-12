import React from "react";
import MyCommentContent from "./content/MyCommentContent";
import Layout from "../../../layout/Layout";
import { Container, Wrapper } from "./MyCommentStyles";
import Sidebar from "../../common/sidebar/Sidebar";

const MyComment = () => {
  return (
    <Layout>
      <Container>
        <Sidebar />
        <Wrapper>
          <MyCommentContent />
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default MyComment;
