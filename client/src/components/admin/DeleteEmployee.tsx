import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Select } from "antd";
import "../../App.css";
import { layout, validateMessages } from "../PostIssue";

const { Option } = Select;

const headers = {
  id: localStorage.getItem("id"),
  authorization: localStorage.getItem("auth"),
};

const DeleteEmployee: React.FC = () => {
  const [allDepartments, setAllDepartments] = useState<any>();
  const [selectedDepartment, setSelectedDepartment] = useState<any>();
  const [employees, setEmployees] = useState<{}[]>([]);
  const [selectedUserID, setSelectedUserID] = useState<number | null>();
  const [finishedMessage, setFinisedMessage] = useState<string | undefined>();

  const fetch_departments = async () => {
    try {
      const url = "http://localhost:5000/department";
      const department_data = await axios.get(url, { headers: headers });
      setAllDepartments(department_data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetch_departments_employees = async () => {
    try {
      const url = `http://localhost:5000/department/${selectedDepartment}`;
      const employees_data = await axios.get(url, { headers: headers });
      setEmployees(employees_data.data);
      console.log(employees_data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch_departments();
  }, []);

  useEffect(() => {
    fetch_departments_employees();
  }, [selectedDepartment]);

  const delete_user = async () => {
    try {
      const url = `http://localhost:5000/admin/delete/${selectedUserID}`;
      const res = await axios.delete(url, { headers: headers });
      if (res.data.user_deleted) {
        setFinisedMessage("The user has been successfully deleted");
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!finishedMessage ? (
        <div>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Form.Item
              name="department"
              label="Department"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select responsible department!",
                },
              ]}
            >
              <Select
                placeholder="Please select department"
                onChange={(e: any) => {
                  console.log(e);
                  setSelectedDepartment(e);
                }}
              >
                {allDepartments ? (
                  allDepartments.map((ele: any) => (
                    <Option value={ele.did}>{ele.department_name}</Option>
                  ))
                ) : (
                  <Option value="">{""}</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              name="receiver"
              label="Receiver"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select responsible person!",
                },
              ]}
            >
              <Select
                placeholder="Please select user"
                onChange={(e: any) => {
                  setSelectedUserID(e);
                }}
              >
                {employees.length > 0 ? (
                  employees.map((ele: any) => (
                    <Option value={ele.uid}>{ele.username}</Option>
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
                onClick={() => delete_user()}
              >
                Delete
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

export default DeleteEmployee;
