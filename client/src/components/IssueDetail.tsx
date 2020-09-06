import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Comment, Avatar, Tooltip } from "antd";
import moment from "moment";

interface issueInfo {
  i_data_created: string;
  i_deadline: string;
  i_description: string;
  i_priority: string;
  i_status: string;
  i_title: string;
  receiver_id: number;
  sender_id: number;
}

interface comment {
  username: string;
  c_date_created: string;
  c_description: string;
}

const IssueDetail: React.FC = () => {
  const [issueInfo, setIssueInfo] = useState<issueInfo | null>();

  const [comments, setComments] = useState<comment[] | null>();

  const get_issue_info = async () => {
    const iid = window.location.pathname.slice(15);
    const url = `http://localhost:5000/issue/${iid}`;
    const headers = {
      id: localStorage.getItem("id"),
      authorization: localStorage.getItem("auth"),
    };
    const issue_data = await axios.get(url, { headers: headers });
    const issueInfo = {
      i_data_created: issue_data.data[0].i_data_created,
      i_deadline: issue_data.data[0].i_deadline,
      i_description: issue_data.data[0].i_description,
      i_priority: issue_data.data[0].i_priority,
      i_status: issue_data.data[0].i_status,
      i_title: issue_data.data[0].i_title,
      receiver_id: issue_data.data[0].i_receiver_id,
      sender_id: issue_data.data[0].sender_id,
    };
    setIssueInfo(issueInfo);

    let comments: Array<comment> = [];

    issue_data.data.forEach((ele: comment) => {
      comments.push({
        username: ele.username,
        c_date_created: ele.c_date_created,
        c_description: ele.c_description,
      });
    });

    setComments(comments);

    console.log(issue_data);
  };

  useEffect(() => {
    get_issue_info();
  }, []);

  return (
    <div>
      {issueInfo !== null ? (
        <Card title="Issue Detail">
          <Card type="inner" title={issueInfo?.i_title}>
            <h4>Sender: {issueInfo?.sender_id}</h4>
            <h4>Receiver: {issueInfo?.receiver_id}</h4>
            <h4>Priority: {issueInfo?.i_priority}</h4>
            <h4>Status: {issueInfo?.i_status}</h4>
            <h4>Deadline: {issueInfo?.i_deadline}</h4>
            <h4>Description: {issueInfo?.i_description}</h4>
          </Card>
        </Card>
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
    </div>
  );
};

export default IssueDetail;
