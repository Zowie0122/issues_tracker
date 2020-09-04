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
      <Menu.Item key="ongoing_issues" icon={<FormOutlined />}>
        <a href="/employee/dashboard">Ongoing Tasks</a>
      </Menu.Item>

      <Menu.Item key="post" icon={<EditOutlined />}>
        <a href="/employee/post_issue">Post an issue</a>
      </Menu.Item>
      <Menu.Item key="track_issues" icon={<EditOutlined />}>
        Track your issues
      </Menu.Item>
      <Menu.Item key="solved_issues" icon={<ScheduleOutlined />}>
        Your Posts History
      </Menu.Item>
      <Menu.Item key="solved_tasks" icon={<ScheduleOutlined />}>
        <a href="/employee/solved_tasks">Solved Tasks History</a>
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
