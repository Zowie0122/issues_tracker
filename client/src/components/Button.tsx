import React from "react";

interface Props {
  fn: () => void;
}

const EmailInput: React.FC<Props> = ({ fn }) => {
  return (
    <div>
      <input
        type="email"
        onChange={() => {
          fn();
        }}
      />
    </div>
  );
};

export default EmailInput;
