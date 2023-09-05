import React, { MouseEventHandler, RefObject } from "react";
import useDetectClose from "../../../hooks/useDetectClose";
import {
  DropdownButton,
  DropdownContainer,
  DropdownLi,
  DropdownUl,
  Menu,
  Wrapper,
} from "./DropdownStyles";

interface DropdownProps {
  onChange: (option: string) => void; // 선택한 옵션을 처리할 콜백 함수
}

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  const [orderIsOpen, orderRef, orderHandler] = useDetectClose(false);

  const handleOrderClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (typeof orderHandler === "function") {
      orderHandler();
    }
  };

  const handleSortOptionClick = (option: string) => {
    if (typeof onChange === "function") {
      onChange(option);
    }
  };

  return (
    <Wrapper>
      <DropdownContainer>
        <DropdownButton
          onClick={handleOrderClick}
          ref={orderRef as RefObject<HTMLDivElement>}
        >
          정렬
        </DropdownButton>
        <Menu isDropped={orderIsOpen as boolean}>
          <DropdownUl>
            <DropdownLi onClick={() => handleSortOptionClick("id")}>
              최신순
            </DropdownLi>
            <DropdownLi onClick={() => handleSortOptionClick("view")}>
              조회순
            </DropdownLi>
          </DropdownUl>
        </Menu>
      </DropdownContainer>
    </Wrapper>
  );
};

export default Dropdown;
