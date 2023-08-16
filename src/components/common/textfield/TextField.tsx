import React from "react";
import {
  TextFieldInput,
  TextFieldTitle,
  TextFieldWrap,
} from "./TextFieldStyles";

interface TextFieldProps {
  title: string;
  type: string;
  placeholder: string;
  value?: string;
  multiple?: boolean;
  onChange: (value: any) => void;
}

const TextField = ({
  title,
  type,
  placeholder,
  value,
  multiple,
  onChange,
}: TextFieldProps) => (
  <TextFieldWrap>
    <TextFieldTitle>{title}</TextFieldTitle>
    <TextFieldInput
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      multiple={multiple}
    />
  </TextFieldWrap>
);

export default TextField;
