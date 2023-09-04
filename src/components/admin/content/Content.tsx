import React from "react";
import { Container } from "./ContentStyles";
import BoardList from "../../board/boardlist/BoardList";

const Content = () => {
  return (
    <Container>
      <BoardList />
    </Container>
  );
};

export default Content;
