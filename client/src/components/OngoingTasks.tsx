import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Spin, Alert, Card } from "antd";
import "../App.css";
import Navbar from "./Navbar";

const OngoingTasks: React.FC = () => {
  interface Task {
    i_data_created: null | string;
    i_deadline: null | string;
    i_description: string;
    i_priority: string;
    i_status: string;
    i_title: string;
    iid: number;
    receiver_id: number;
    sender_id: number;
  }
  const [tasks, setTasks] = useState<Task[] | null>(null);

  async function fetch_ongoing_assignments() {
    try {
      const auth_id = localStorage.getItem("i_id");
      const auth_token = localStorage.getItem("i_token");

      if (auth_id !== null && auth_token !== null) {
        const data = await axios.get(`http://localhost:5000/user/assignments`, {
          headers: {
            token: auth_token,
            id: auth_id,
            status: "ongoing",
          },
        });
        setTasks(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch_ongoing_assignments();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Ongoing Tasks</h1>
      {tasks !== null ? (
        tasks.map((task) => {
          return (
            <Card
              title={task.i_title}
              extra={<a href="#">More</a>}
              style={{ width: 400 }}
            >
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          );
        })
      ) : (
        <Spin tip="Loading...">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
      )}
    </div>
  );
};

export default OngoingTasks;
