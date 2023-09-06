import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  margin-top: 80px;
`;

export const BoardHeader = styled.div`
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  line-height: 1.5;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  margin: 60px 10px;
`;
export const Title = styled.th`
  width: 150px;
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  background: #eee;
`;

export const TitleNumber = styled(Title)`
  width: 10%;
`;

export const TitleMain = styled(Title)`
  width: 45%;
`;

export const TitleOther1 = styled(Title)`
  width: 25%;
`;
export const Remove = styled(Title)`
  width: 10%;
`;

export const Content = styled.td`
  width: 350px;
  padding: 10px;
  vertical-align: top;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const RemoveBtn = styled.td`
  width: 350px;
  padding: 10px;
  vertical-align: top;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  color: red;
`;

export const Input1 = styled.input`
  width: 250px;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
`;

export const BtnWrapper = styled.div`
  margin-left: 36px;
`;
export const PageWrap = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  width: 100%;
  align-items: center;
`;

export const PageNumber = styled.li<{ active: boolean }>`
  cursor: pointer;
  margin-right: 8px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;
export const PageArrow = styled.li`
  cursor: pointer;
  margin-right: 8px;
`;

export const SearchWrap = styled.div`
  margin: 20px 10px;
  display: flex;
`;

export const Input = styled.input`
  height: 42px;
  width: 520px;
  margin-right: 16px;
`;

export const DropdownWrapper = styled.div`
  float: right;
`;
