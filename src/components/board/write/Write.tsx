import React from "react";
import { BtnWrapper, Input1, Input2, Wrapper } from "./WriteStyles";
import Btn from "../../common/btn/Btn";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const navigation = useNavigate();

  const handleBtnClick = () => {
    navigation("/board/list");
  };
  return (
    <>
      <Wrapper>
        <Input1 placeholder="제목" />
        <Input2 placeholder="내용" />
        <BtnWrapper>
          <Btn
            text="작성"
            size="small"
            disabled={false}
            onClick={handleBtnClick}
          />
        </BtnWrapper>
      </Wrapper>
    </>
  );
};

export default Write;
