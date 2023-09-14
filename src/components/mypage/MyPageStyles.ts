import { styled } from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;
  margin-bottom: 160px;
  gap: 8px;
`;

export const Title = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
`;

export const Info = styled.div`
  font-size: 20px;
`;

export const Box = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
`;

export const Edit = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #8c8c8c;
  text-decoration-line: underline;
  cursor: pointer;
`;
export const Remove = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #8c8c8c;
  text-decoration-line: underline;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const ImgWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  border-radius: 50%;
`;
