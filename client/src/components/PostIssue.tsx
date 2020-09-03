import React, { useState, useEffect } from "react";
import "../App.css";
import axios, { AxiosResponse } from "axios";
import Navbar from "./Navbar";
import { Form, Input, Button, Select, DatePicker } from "antd";

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

const PostIssue: React.FC = () => {
  const [department, setDepartment] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  // const fetch_departments_employees = async () =>{
  //          try{

  //       const data = await axios.get("")

  //          }catch(err){
  //            console.log(err)
  //          }

  // }

  const onFinish_time = (fieldsValue: any) => {
    // Should format date value before submit.

    const rangeTimeValue = fieldsValue["range-time-picker"];
    const values = {
      ...fieldsValue,

      "date-time-picker": fieldsValue["date-time-picker"].format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    };
    console.log("Received values of form: ", values);
  };

  async function post_issue() {
    try {
      const auth_id = localStorage.getItem("i_id");
      const auth_token = localStorage.getItem("i_token");

      if (auth_id !== null && auth_token !== null) {
        const data = await axios.post("http://localhost:5000/issue", {
          headers: {
            token: auth_token,
            id: auth_id,
          },
        });
        console.log(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      <h1>Issue Details</h1>
      <Form
        {...layout}
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "title"]}
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="select"
          label="Priority"
          hasFeedback
          rules={[
            {
              message: "Please select priority!",
            },
          ]}
        >
          <Select placeholder="Please select priority">
            <Option value="high">High</Option>
            <Option value="midium">Midium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="select"
          label="Department"
          hasFeedback
          rules={[
            {
              message: "Please select responsible department!",
            },
          ]}
        >
          <Select placeholder="Please select department">
            <Option value="high">High</Option>
            <Option value="midium">Midium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="select"
          label="Receiver"
          hasFeedback
          rules={[
            {
              message: "Please select responsible person!",
            },
          ]}
        >
          <Select placeholder="Please select department">
            <Option value="high">High</Option>
            <Option value="midium">Midium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Form.Item>

        <Form
          name="time_related_controls"
          {...formItemLayout}
          onFinish={onFinish_time}
        >
          <Form.Item name="date-time-picker" label="Dealine">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Form>

        <Form.Item name={["user", "description"]} label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostIssue;
