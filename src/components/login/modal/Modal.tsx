import React from "react";
import {
  ModalBox,
  ModalButton,
  ModalSection,
  ModalStyleProps,
  ModalText,
  ModalTitle,
  ModaleWrap,
} from "./ModalStyles";

interface ModalProps extends ModalStyleProps {
  title: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({ title, text, onClick }: ModalProps) => {
  return (
    <ModaleWrap>
      <ModalSection>
        <ModalTitle>{title}</ModalTitle>
        <ModalBox>
          <ModalText>{text}</ModalText>
          <ModalButton onClick={onClick}>확인</ModalButton>
        </ModalBox>
      </ModalSection>
    </ModaleWrap>
  );
};

export default Modal;
