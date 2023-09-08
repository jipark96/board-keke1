import React, { ChangeEvent, useState } from "react";
import {
  EmailFieldInput,
  EmailFieldRequired,
  EmailFieldTitle,
  EmailFieldWrap,
} from "./EmailFieldStyles";

interface EmailFieldProps {
  title: string;
  type: string;
  placeholder: string;
  required?: string;
  onValueChange?: (value: string) => void;
}

const EmailField = ({
  title,
  type,
  placeholder,
  required,
  onValueChange,
}: EmailFieldProps) => {
  const [isValid, setIsValid] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    const validity = isValidEmail(email);
    setIsValid(validity);
    setIsEdited(true);

    if (onValueChange) {
      onValueChange(email);
    }
  };

  return (
    <>
      <EmailFieldWrap>
        <EmailFieldTitle>{title}</EmailFieldTitle>
        <EmailFieldInput
          type={type}
          placeholder={placeholder}
          isValid={isValid}
          onChange={handleEmailChange}
        />
        {!isValid && isEdited && (
          <EmailFieldRequired>{required}</EmailFieldRequired>
        )}
      </EmailFieldWrap>
    </>
  );
};

export default EmailField;
