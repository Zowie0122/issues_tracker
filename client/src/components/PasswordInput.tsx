import React from "react";

interface Props {
  onPasswordChange: (email: string) => void;
}

const PasswordInput: React.FC<Props> = ({ onPasswordChange }) => {
  return (
    <div>
      <input
        type="password"
        onChange={(e) => {
          onPasswordChange(e.target.value);
        }}
      />
    </div>
  );
};

export default PasswordInput;
