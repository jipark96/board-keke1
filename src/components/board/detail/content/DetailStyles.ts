import { styled } from "styled-components";

export const BoardWrapper = styled.div`
  width: 600px;
  margin: 0 auto 24px auto;
  border-radius: 10px;
  opacity: 1;
  background-color: #fff;
  padding: 64px;
`;

export const BoardHeader = styled.div`
  justify-content: space-between;
  align-items: baseline;
  display: flex;
  margin-bottom: 10px;
`;

export const UserName = styled.div`
  font-size: 18px;
`;

export const Remove = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: gray;
`;

export const Date = styled.div`
  font-size: 16px;
`;

export const BoardBody = styled.div`
  display: flex;
`;

export const BoardBody2 = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const BoardImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const BoardImg = styled.img`
  height: 250px;
  width: 250px;
  margin-top: 20px;
`;

export const TitleWrap = styled.div`
  word-break: break-all;
  margin-left: 16px;
  overflow: auto;
  flex-grow: 1;
`;

export const BoardTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const BoardContent = styled.div`
  font-size: 18px;
  margin-left: 24px;
  margin-top: 20px;
`;

export const BoardLike = styled.div`
  font-size: 18px;
  cursor: pointer;
`;

export const EditDeleteButton = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 12px;
  gap: 10px;
`;
