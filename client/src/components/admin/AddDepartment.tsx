import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import "../../App.css";
import { layout, validateMessages } from "../PostIssue";

const headers = {
  id: localStorage.getItem("id"),
  authorization: localStorage.getItem("auth"),
};

const AddDepartment: React.FC = () => {
  const [departmentInput, setDepartmentInput] = useState<string | undefined>();
  const [finishedMessage, setFinishedMessage] = useState<string | undefined>();

  const add_department = async () => {
    try {
      const url = "http://localhost:5000/admin/department";
      const { data } = await axios.post(
        url,
        { new_department: departmentInput },
        { headers: headers }
      );
      if (data.added_department) {
        setFinishedMessage("New department has successfully been added");
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!finishedMessage ? (
        <div>
          {" "}
          <h1>Add New Department</h1>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Form.Item
              name={"department"}
              label="New Department"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setDepartmentInput(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => add_department()}
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

export default AddDepartment;
