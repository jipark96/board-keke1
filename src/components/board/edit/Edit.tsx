import React from "react";
import { BtnWrapper, Input1, Input2, Wrapper } from "./EditStyles";
import Btn from "../../common/btn/Btn";
import { useNavigate } from "react-router-dom";

const Edit = () => {
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
            text="수정"
            size="small"
            disabled={false}
            onClick={handleBtnClick}
          />
        </BtnWrapper>
      </Wrapper>
    </>
  );
};

export default Edit;
