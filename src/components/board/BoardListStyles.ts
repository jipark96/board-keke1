import { styled } from "styled-components";

export const BoardListCotainer = styled.div`
  background-color: lightgray;
`;

export const BoardListWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BoardHeader = styled.div`
  font-size: 24px;
  font-weight: 600;
  display: flex;
  justify-content: flex-end;
`;

export const BoardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-direction: row;
`;

export const BoardFooter = styled.div`
  margin: 24px;
`;

export const BoardCard = styled.div`
  width: 300px;
  height: 600px;
  flex-shrink: 0;
  margin: 16px;
  border-radius: 10px;
  box-shadow: rgba(0.2, 0.2, 0.2, 0.2) 1px 2px 1px -1px,
    rgba(0.2, 0, 0.2, 0.2) 0px 1px 1px 0px, rgba(0, 0, 0, 0) 0px 1px 3px 0px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

export const BoardImg = styled.div`
  width: 100%;
  height: 60%;
`;

export const BoardText = styled.div`
  flex-grow: 1;
  word-break: break-all;
  overflow: auto;
  padding: 10px;
`;

export const BoardTitle = styled.div`
  font-size: 20px;
  color: gray;
  font-weight: 600;
`;

export const BoardCardFooter = styled.div`
  border-top: 1px solid black;
  padding: 8px;
  display: flex;
  color: #282c34;
  font-size: 16px;
  justify-content: space-between;
`;
