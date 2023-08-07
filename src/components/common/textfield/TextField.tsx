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
  onChange: (value: any) => void;
}

const TextField = ({
  title,
  type,
  placeholder,
  value,
  onChange,
}: TextFieldProps) => (
  <TextFieldWrap>
    <TextFieldTitle>{title}</TextFieldTitle>
    <TextFieldInput placeholder={placeholder} type={type} onChange={onChange} />
  </TextFieldWrap>
);

export default TextField;
