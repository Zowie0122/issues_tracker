import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Comment,
  Avatar,
  Tooltip,
  Button,
  Modal,
  Input,
  Form,
  Select,
  DatePicker,
} from "antd";
import moment from "moment";

const { Option } = Select;
class iissueInfo {
  i_data_created: string;
  i_deadline: string;
  i_description: string;
  i_priority: string;
  i_status: string;
  i_title: string;
  receiver_id: number;
  sender_id: number;

  constructor(obj: any) {
    this.i_data_created = obj["i_data_created"];
    this.i_deadline = obj["i_deadline"];
    this.i_description = obj["i_description"];
    this.i_priority = obj["i_prority"];
    this.i_status = obj["i_status"];
    this.i_title = obj["i_title"];
    this.receiver_id = obj["receiver_id"];
    this.sender_id = obj["sender_id"];
  }
}

interface comment {
  username: string;
  c_date_created: string;
  c_description: string;
}

interface department {
  did: number;
  department_name: string;
}

interface employee {
  username: string;
  uid: number;
}

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

const IssueDetail: React.FC = () => {
  const [issueInfo, setIssueInfo] = useState<any>({});
  const [comments, setComments] = useState<comment[] | null>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string | null>();
  const [showEdit, setShowEdit] = useState<boolean>(false);

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
  const [deadline, setDeadline] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [status, setStatus] = useState<any>("");

  const [finishMessage, setFinishMessage] = useState<string>("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: localStorage.getItem("auth"),
  };

  const iid = window.location.pathname.slice(15);

  const get_issue_info = async () => {
    const url = `http://localhost:5000/issue/${iid}`;

    const issue_data = await axios.get(url, { headers: headers });
    const issueInfo_detail = {
      created: issue_data.data[0].i_data_created,
      deadline: issue_data.data[0].i_deadline,
      description: issue_data.data[0].i_description,
      priority: issue_data.data[0].i_priority,
      status: issue_data.data[0].i_status,
      title: issue_data.data[0].i_title,
      receiver: issue_data.data[0].receiver_id,
      sender: issue_data.data[0].sender_id,
    };
    setIssueInfo(issueInfo_detail);

    console.log(issue_data.data[0]);

    setTitle(issue_data.data[0].i_title);
    setPriority(issue_data.data[0].i_priority);
    setStatus(issue_data.data[0].i_status);
    setDescription(issue_data.data[0].i_description);

    const d = departments.find(
      (ele) => ele.did == issue_data.data[0].department_id
    );
    console.log(d);
    if (d) {
      setSelectedDepartment(d.department_name);
    }

    const e = employees.find(
      (ele) => ele.uid == issue_data.data[0].receiver_id
    );

    console.log(e);
    if (e) {
      setReceiver(e.username);
    }
    let comments: Array<comment> = [];

    issue_data.data.forEach((ele: comment) => {
      comments.push({
        username: ele.username,
        c_date_created: ele.c_date_created,
        c_description: ele.c_description,
      });
    });

    setComments(comments);
  };

  async function handleEditIssue() {
    try {
      const senderIDString = localStorage.getItem("id");
      const url = "http://localhost:5000/issue";

      const res = await axios.put(
        url,
        {
          // sender_id: senderIDString !== null && parseInt(senderIDString),
          i_title: title,
          i_description: description,
          i_priority: priority,
          i_deadline: "2020-09-20T10:04:15.047Z",
          i_status: status,
          receiver_id: receiver,
        },
        { headers: headers }
      );

      if (res.data.sended_out) {
        setShowEdit(false);
        window.location.href = window.location.pathname;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function onOk() {
    const url = "http://localhost:5000/comment/";

    const res = await axios.post(
      url,
      {
        issue_id: parseInt(iid),
        c_sender_id: headers.id,
        c_description: newComment,
      },
      { headers: headers }
    );

    if (res.data.sended === true) {
      window.location.href = window.location.pathname;
    } else {
      console.log("The comment was not sent");
    }
    setNewComment("");
    setShowModal(false);
  }

  function edit() {
    handleEditIssue();
  }

  useEffect(() => {
    fetch_departments();
  }, []);

  useEffect(() => {
    fetch_departments_employees();
  }, [selectedDepartment]);

  useEffect(() => {
    get_issue_info();
  }, [employees]);

  const fetch_departments = async () => {
    try {
      const url = "http://localhost:5000/department";
      const department_data = await axios.get(url, { headers: headers });
      setDepartments(department_data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetch_departments_employees = async () => {
    try {
      const d = departments.find(
        (ele) => ele.department_name == selectedDepartment
      );
      if (d) {
        const url = `http://localhost:5000/department/${d.did}`;
        const employees_data = await axios.get(url, { headers: headers });
        setEmployees(employees_data.data);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {issueInfo !== null && !showEdit ? (
        <Card title="Issue Detail">
          <Card type="inner" title={issueInfo?.i_title}>
            {issueInfo !== undefined &&
              Object.keys(issueInfo).map((key: string) => (
                <h4>
                  {/* @ts-ignore */}
                  {key}:{issueInfo[key]}
                </h4>
              ))}
          </Card>

          <Button
            style={{ margin: "16px 10px" }}
            type="primary"
            onClick={() => setShowModal(true)}
          >
            Add Comment
          </Button>
          {issueInfo.sender == headers.id && (
            <Button
              type="primary"
              onClick={() => {
                setShowEdit(true);
              }}
            >
              Edit
            </Button>
          )}
        </Card>
      ) : null}

      {issueInfo !== null && showEdit ? (
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
                required: false,
              },
            ]}
          >
            <Input
              defaultValue={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setTitle(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item name="priority" label="Priority" hasFeedback>
            <Select
              defaultValue={priority}
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
                required: false,
                message: "Please select responsible department!",
              },
            ]}
          >
            <Select
              defaultValue={selectedDepartment}
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
            name="status"
            label="Status"
            hasFeedback
            rules={[
              {
                required: false,
                message: "Please select status",
              },
            ]}
          >
            <Select
              defaultValue={status}
              onChange={(e) => {
                setStatus(e);
              }}
            >
              <Option value="onging">ongoing</Option>
              <Option value="sloved">solved</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="receiver"
            label="Receiver"
            hasFeedback
            rules={[
              { required: false, message: "Please select responsible person!" },
            ]}
          >
            <Select
              defaultValue={receiver}
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
          {console.log(receiver)}

          <Form name="time_related_controls" {...formItemLayout}>
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
              defaultValue={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" onClick={() => edit()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : null}

      {comments !== null &&
        comments?.map((comment) => (
          <Comment
            author={comment.username}
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={<p>{comment.c_description}</p>}
            datetime={
              <Tooltip title={moment().format(comment.c_date_created)}>
                <span>{comment.c_date_created}</span>
              </Tooltip>
            }
          />
        ))}

      <Modal
        title="Add a comment"
        visible={showModal}
        onOk={() => {
          onOk();
        }}
        onCancel={() => {
          setShowModal(false);
          setNewComment("");
        }}
      >
        <Input.TextArea
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};

export default IssueDetail;
