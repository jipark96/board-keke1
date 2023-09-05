import React, { useState } from "react";
import { DropdownToggle, DropdownWrapper, ListItem } from "./DropdownStyles";

const Content = ({
  selectedOption,
  onSelect,
}: {
  selectedOption: string;
  onSelect: (option: string) => void;
}) => (
  <>
    <ListItem onClick={() => onSelect("최신순")}>최신순</ListItem>
    <ListItem onClick={() => onSelect("조회수순")}>조회수순</ListItem>
  </>
);

const Dropdown = () => {
  const [display, setDisplay] = useState(false);
  const [selectedOption, setSelectedOption] = useState("정렬");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setDisplay(false);
  };

  return (
    <DropdownWrapper>
      <DropdownToggle onClick={() => setDisplay(!display)}>
        {selectedOption}
        {display && (
          <Content selectedOption={selectedOption} onSelect={handleSelect} />
        )}
      </DropdownToggle>
    </DropdownWrapper>
  );
};

export default Dropdown;
