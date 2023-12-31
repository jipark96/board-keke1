import React from "react";
import Layout from "../../../layout/Layout";
import { Container } from "./DetailStyles";
import Sidebar from "../../common/sidebar/Sidebar";
import { Wrapper } from "../BoardStyles";
import Detail from "./content/Detail";

const Details = () => {
  return (
    <Layout>
      <Container>
        <Sidebar />
        <Wrapper>
          <Detail />
        </Wrapper>
      </Container>
    </Layout>
  );
};

export default Details;
