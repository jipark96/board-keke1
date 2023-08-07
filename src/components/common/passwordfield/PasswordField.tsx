import React, { ChangeEvent, useEffect, useState } from "react";
import {
  PasswordFieldInput,
  PasswordFieldRequired,
  PasswordFieldTitle,
  PasswordFieldWrap,
} from "./PasswordFieldStyles";

interface PasswordFieldProps {
  title: string;
  type: string;
  placeholder: string;
  required?: string;
  onValueChange?: (value: string) => void;
  onValidityChange?: (validity: boolean) => void;
  isPasswordMatch?: boolean;
}

const PasswordField = ({
  title,
  type,
  placeholder,
  required,
  onValueChange,
  onValidityChange,
  isPasswordMatch = true,
}: PasswordFieldProps) => {
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const isValidPassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W|_]).{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.currentTarget.value;
    const validity = isValidPassword(password);
    setIsValid(validity);
    setIsEdited(true);

    if (onValueChange) {
      onValueChange(password);
    }

    if (onValidityChange) {
      onValidityChange(validity);
    }
  };

  useEffect(() => {
    if (isPasswordMatch === false && isValid) {
      setIsValid(false);
      setIsEdited(true);
    }
  }, [isPasswordMatch, isValid]);

  return (
    <>
      <PasswordFieldWrap>
        <PasswordFieldTitle>{title}</PasswordFieldTitle>
        <PasswordFieldInput
          type={type}
          placeholder={placeholder}
          isValid={isValid}
          onChange={handlePasswordChange}
        />
        {!isValid && isEdited && (
          <PasswordFieldRequired>{required}</PasswordFieldRequired>
        )}
      </PasswordFieldWrap>
    </>
  );
};

export default PasswordField;
