import { styled } from "styled-components";

export const EditCotainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
`;

export const EditTitle = styled.div`
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  color: #171717;
  margin-bottom: 30px;
`;

export const EditWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

export const TextFieldWrap = styled.div`
  width: 600px;
`;
export const TextFieldWrap1 = styled.div`
  margin-top: 20px;
`;
export const TextFieldInput = styled.input`
  padding: 18px 0px 18px 18px;
  width: calc(100% - 18px);
  height: 8px;
  border: 1px solid #171717;
  font-weight: 500;
  font-size: 12px;

  &:focus {
    outline: none;
    border: 1px solid #36f;
  }
`;
export const LargeTextFieldTitle = styled.p`
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
`;

export const ImageContainer = styled.div`
  position: relative;
  margin-bottom: -60px;
  margin-top: 120px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ImgWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ImgBtn = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48px;
  height: 48px;
  line-height: 58px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: gray;
`;

export const ImgFile = styled.input`
  position: absolute;
  opacity: 0;
`;

export const Image = styled.img`
  border-radius: 50%;
`;
