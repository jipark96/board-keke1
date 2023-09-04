import Layout from "../../layout/Layout";
import { Cotainer, Wrapper } from "./BoardStyles";
import BoardList from "./boardlist/BoardList";
import Sidebar from "./sidebar/Sidebar";

const Board = () => {
  return (
    <Layout>
      <Cotainer>
        <Sidebar />
        <Wrapper>
          <BoardList />
        </Wrapper>
      </Cotainer>
    </Layout>
  );
};

export default Board;
