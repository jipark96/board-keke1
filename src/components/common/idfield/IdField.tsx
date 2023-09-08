import React from "react";
import { IdFieldInput, IdFieldTitle, IdFieldWrap } from "./IdFieldStyles";

interface IdFieldProps {
  title: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange: (value: any) => void;
}

const IdField = ({
  title,
  type,
  placeholder,
  value,
  onChange,
}: IdFieldProps) => (
  <IdFieldWrap>
    <IdFieldTitle>{title}</IdFieldTitle>
    <IdFieldInput placeholder={placeholder} type={type} onChange={onChange} />
  </IdFieldWrap>
);

export default IdField;
