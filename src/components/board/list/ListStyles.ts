import { styled } from "styled-components";

export const Wrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 80px;
`;

export const Cotainer = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  line-height: 1.5;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  margin: 20px 10px;
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
  width: 15%;
`;

export const TitleMain = styled(Title)`
  width: 55%;
`;

export const TitleOther = styled(Title)`
  width: 15%;
`;

export const Content = styled.td`
  width: 350px;
  padding: 10px;
  vertical-align: top;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
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
  display: flex;
  justify-content: flex-end;
`;
