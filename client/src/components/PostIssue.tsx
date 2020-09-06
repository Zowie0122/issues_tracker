import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Form, Input, Button, Select, DatePicker, message } from "antd";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

interface department {
  did: number;
  department_name: string;
}

interface employee {
  username: string;
  uid: number;
}

const PostIssue: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<any>();
  const [departments, setDepartments] = useState<department[]>([
    { did: 0, department_name: "" },
  ]);

  const [employees, setEmployees] = useState<employee[]>([
    { username: "", uid: 0 },
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState<any>("");

  const [receiver, setReceiver] = useState<any>("");
  const [deadline, setDeadline] = useState<string | null>("");
  const [description, setDescription] = useState<string | null>("");

  const [finishMessage, setFinishMessage] = useState<string>("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: localStorage.getItem("auth"),
  };

  const fetch_departments = async () => {
    try {
      const url = "http://localhost:5000/department";
      const department_data = await axios.get(url, { headers: headers });
      setDepartments(department_data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch_departments();
  }, []);

  const fetch_departments_employees = async () => {
    try {
      const url = `http://localhost:5000/department/${selectedDepartment}`;
      const employees_data = await axios.get(url, { headers: headers });
      setEmployees(employees_data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch_departments_employees();
  }, [selectedDepartment]);

  const TimeRelatedForm = () => {
    const onFinish_time = (fieldsValue: any) => {
      // Should format date value before submit.
      const rangeValue = fieldsValue["range-picker"];
      const rangeTimeValue = fieldsValue["range-time-picker"];
      const values = {
        ...fieldsValue,
        "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
        "date-time-picker": fieldsValue["date-time-picker"].format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        "month-picker": fieldsValue["month-picker"].format("YYYY-MM"),
        "range-picker": [
          rangeValue[0].format("YYYY-MM-DD"),
          rangeValue[1].format("YYYY-MM-DD"),
        ],
        "range-time-picker": [
          rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
          rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
        ],
        "time-picker": fieldsValue["time-picker"].format("HH:mm:ss"),
      };
      console.log("Received values of form: ", values);
    };
  };

  async function handlePostIssue() {
    try {
      const senderIDString = localStorage.getItem("id");
      const url = "http://localhost:5000/issue";

      const res = await axios.post(
        url,
        {
          sender_id: senderIDString !== null && parseInt(senderIDString),
          i_title: title,
          i_description: description,
          i_priority: priority,
          // i_deadline: 20200910,
          i_status: "ongoing",
          receiver_id: receiver,
        },
        { headers: headers }
      );

      if (res.data.sended_out) {
        setFinishMessage("Your requested has sussfully been posted");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {finishMessage === "" ? (
        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"title"}
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setTitle(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item name="priority" label="Priority" hasFeedback>
            <Select
              placeholder="Please select priority"
              onChange={(e) => {
                setPriority(e);
              }}
            >
              {["High", "Medium", "Low"].map((ele) => (
                <Option value={ele}>{ele}</Option>
              ))}
            </Select>
          </Form.Item>

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
              onChange={(e) => {
                setSelectedDepartment(e);
              }}
            >
              {departments.length !== 0 ? (
                departments.map((ele) => (
                  <Option value={ele.did}>{ele.department_name}</Option>
                ))
              ) : (
                <Option value="">{""}</Option>
              )}
            </Select>
          </Form.Item>
          {console.log(selectedDepartment)}

          <Form.Item
            name="receiver"
            label="Receiver"
            hasFeedback
            rules={[
              { required: true, message: "Please select responsible person!" },
            ]}
          >
            <Select
              placeholder="Please select receiver"
              onChange={(e) => {
                setReceiver(e);
              }}
            >
              {employees.length >= 1 ? (
                employees.map((ele) => (
                  <Option value={ele.uid}>{ele.username}</Option>
                ))
              ) : (
                <Option value="">{""}</Option>
              )}
            </Select>
          </Form.Item>

          <Form
            name="time_related_controls"
            {...formItemLayout}
            onFinish={TimeRelatedForm}
          >
            <Form.Item name="date-time-picker" label="Dealine">
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                onChange={(e) => console.log(e)}
              />
            </Form.Item>
          </Form>

          <Form.Item name="description" label="Description">
            <Input.TextArea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handlePostIssue()}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>{finishMessage}</p>
      )}
    </div>
  );
};

export default PostIssue;
