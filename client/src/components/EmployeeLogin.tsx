import React, { useState } from "react";
import axios from "axios";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

const EmployeeLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function emailChangeHandler(emailInput: string): void {
    setEmail(emailInput);
  }

  function passwordChangeHandler(passwordInput: string): void {
    setPassword(passwordInput);
  }

  async function loginHandler(emailInput: string, passwordInput: string) {
    try {
      const res = await axios.post("http://localhost:5000/user/", {
        email: emailInput,
        password: passwordInput,
      });
      if (res.data.authToken) {
        localStorage.setItem("i_token", res.data.authToken);
        localStorage.setItem("i_id", res.data.userId);
        window.location.href = `http://localhost:3000/employee/dashboard`;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <EmailInput onEmailChange={emailChangeHandler} />
      <PasswordInput onPasswordChange={passwordChangeHandler} />
      <button
        onClick={() => {
          loginHandler(email, password);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default EmployeeLogin;
