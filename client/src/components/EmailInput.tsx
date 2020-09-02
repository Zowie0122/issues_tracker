import React from "react";

interface Props {
  onEmailChange: (email: string) => void;
}

const EmailInput: React.FC<Props> = ({ onEmailChange }) => {
  return (
    <div>
      <input
        type="email"
        onChange={(e) => {
          onEmailChange(e.target.value);
        }}
      />
    </div>
  );
};

export default EmailInput;
