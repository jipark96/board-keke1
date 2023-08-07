import React from "react";
import { ButtonStyleProps, ButtonWrap } from "./BtnStyles";

interface BtnProps extends ButtonStyleProps {
  text: string;
  onClick?: () => void;
}

const Btn = ({ text, disabled = false, onClick = () => null }: BtnProps) => {
  return (
    <ButtonWrap onClick={onClick} disabled={disabled}>
      {text}
    </ButtonWrap>
  );
};

export default Btn;
