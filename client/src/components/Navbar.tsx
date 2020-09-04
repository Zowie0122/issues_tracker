import React, { useState } from "react";
import { Menu } from "antd";
import {
  FormOutlined,
  ScheduleOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../App.css";

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState<string>("mail");

  const handleHover = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onMouseOver={handleHover}
      selectedKeys={[current]}
      mode="inline"
      style={{ width: 256 }}
    >
      <Menu.Item key="received_ongoing" icon={<FormOutlined />}>
        <a href="/employee/received_ongoing">Ongoing Tasks</a>
      </Menu.Item>

      <Menu.Item key="new_post" icon={<EditOutlined />}>
        <a href="/employee/post_new_request">Post an issue</a>
      </Menu.Item>

      <Menu.Item key="requested_ongoing" icon={<EditOutlined />}>
        <a href="/employee/requested_ongoing">Ongoing issues</a>
      </Menu.Item>

      <Menu.Item key="received_solved" icon={<ScheduleOutlined />}>
        <a href="/employee/received_solved">Solved Tasks History</a>
      </Menu.Item>

      <Menu.Item key="requested_solved" icon={<ScheduleOutlined />}>
        <a href="/employee/requested_solved">Your Posts History</a>
      </Menu.Item>

      <Menu.Item key="setting" icon={<SettingOutlined />}>
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Change Password
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
