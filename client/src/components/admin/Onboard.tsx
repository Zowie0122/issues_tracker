import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, Select } from "antd";
import "../../App.css";
import { layout, validateMessages } from "../PostIssue";

const { Option } = Select;

interface department {
  did: number;
  department_name: string;
}

const headers = {
  id: localStorage.getItem("id"),
  authorization: localStorage.getItem("auth"),
};

const Onboard: React.FC = () => {
  const [departmentsList, setDepartmentsList] = useState<department[]>([]);
  const [usernameInput, setUsernameInput] = useState<string | undefined>();
  const [emailInput, setEmailInput] = useState<string | undefined>();
  const [passwordInput, setPasswordInput] = useState<string | undefined>();
  const [departmentIdInput, setDepartmentIdInput] = useState<
    number | undefined
  >();
  const [finishedMessage, setFinishedMessage] = useState<string | undefined>();

  const post_new_employee = async () => {
    try {
      const url = "http://localhost:5000/admin/onboard";

      const { data } = await axios.post(
        url,
        {
          username: usernameInput,
          email: emailInput,
          password: passwordInput,
          department_id: departmentIdInput,
        },
        { headers: headers }
      );

      if (data.onboarded) {
        setFinishedMessage("New employee has been successfully registered");
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetch_departments = async () => {
    try {
      const url = "http://localhost:5000/department";
      const department_data = await axios.get(url, { headers: headers });
      setDepartmentsList(department_data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch_departments();
  }, []);

  return (
    <div>
      {!finishedMessage ? (
        <div>
          {" "}
          <h1>Onboard New Employee</h1>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Form.Item
              name={"username"}
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setUsernameInput(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              name={"email"}
              label="Email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setEmailInput(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              name={"password"}
              label="Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setPasswordInput(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              name="department"
              label="Department"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select a department!",
                },
              ]}
            >
              <Select
                placeholder="Please select department"
                onChange={(e: number) => {
                  setDepartmentIdInput(e);
                }}
              >
                {departmentsList.length !== 0 ? (
                  departmentsList.map((ele) => (
                    <Option value={ele.did}>{ele.department_name}</Option>
                  ))
                ) : (
                  <Option value="">{""}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => post_new_employee()}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>{" "}
        </div>
      ) : (
        <p>{finishedMessage}</p>
      )}
    </div>
  );
};

export default Onboard;
