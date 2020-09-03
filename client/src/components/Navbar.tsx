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
      <Menu.Item key="ongoing" icon={<FormOutlined />}>
        <a href="/employee/assignments/ongoing">Ongoing</a>
      </Menu.Item>
      <Menu.Item key="archived" icon={<ScheduleOutlined />}>
        Archived Tasks
      </Menu.Item>
      <Menu.Item key="post" icon={<EditOutlined />}>
        <a href="/employee/post">Post an issue</a>
      </Menu.Item>
      <Menu.Item key="track" icon={<EditOutlined />}>
        Track your posts
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
