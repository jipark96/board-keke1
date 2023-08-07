import React, { useState } from "react";
import {
  LoginTextFieldInput,
  LoginTextFieldStyleProps,
  LoginTextFieldWrap,
} from "./LoginTextFieldStyles";

interface LoginTextFieldProps extends LoginTextFieldStyleProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginTextField = ({
  type,
  placeholder,
  onChange,
  value,
}: LoginTextFieldProps) => {
  const [isValid, setIsValid] = useState(false);

  return (
    <LoginTextFieldWrap>
      <LoginTextFieldInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isValid={isValid}
      />
    </LoginTextFieldWrap>
  );
};

export default LoginTextField;
