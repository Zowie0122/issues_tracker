import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Form, Input, Button, Checkbox } from "antd";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function loginHandler() {
    try {
      const res = await axios.post("http://localhost:5000/login/employee", {
        email: email,
        password: password,
      });
      if (res.data.auth) {
        localStorage.setItem("auth", res.data.auth);
        localStorage.setItem("id", res.data.id);
        window.location.href = `http://localhost:3000/employee/received_ongoing`;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Useremail"
          name="useremail"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              loginHandler();
            }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
