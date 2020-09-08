import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import "../App.css";
import { layout, validateMessages } from "./PostIssue";

const headers = {
  id: localStorage.getItem("id"),
  authorization: localStorage.getItem("auth"),
};

const UpdatePassword: React.FC = () => {
  const [orignalPassword, setOriginalPassword] = useState<string | undefined>();
  const [currentpasswordInput, setCurrentPasswordInput] = useState<
    string | undefined
  >();
  const [newpasswordInput, setNewPasswordInput] = useState<
    string | undefined
  >();

  const [finishedMessage, setFinishedMessage] = useState<string | undefined>();

  const update_password = async () => {
    try {
      console.log(currentpasswordInput, orignalPassword);
      if (currentpasswordInput === orignalPassword) {
        const url = `http://localhost:5000/user/${headers.id}/password`;
        const res = await axios.put(
          url,
          { new_password: newpasswordInput },
          { headers: headers }
        );
        if (res.data.updated_password) {
          setFinishedMessage("Your password has been successfully updated");
        }
      } else {
        setFinishedMessage("Original Password is not corrent");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetch_user_info = async () => {
    try {
      const url = `http://localhost:5000/user/${headers.id}`;
      const res = await axios.get(url, { headers: headers });
      if (res.data) {
        setOriginalPassword(res.data[0].password);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch_user_info();
  }, []);

  return (
    <div>
      {" "}
      <Form
        {...layout}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"currentpassword"}
          label="Current Passowrd"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setCurrentPasswordInput(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name={"newpassword"}
          label="New Passowrd"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setNewPasswordInput(e.target.value);
            }}
          />
        </Form.Item>
        {finishedMessage && <p>{finishedMessage}</p>}
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => update_password()}
          >
            Update
          </Button>
        </Form.Item>
      </Form>{" "}
    </div>
  );
};

export default UpdatePassword;
