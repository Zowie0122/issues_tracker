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
      theme="dark"
      selectedKeys={[current]}
      mode="inline"
    >
      <Menu.Item key="onboard" icon={<FormOutlined />}>
        <a href="/admin/onboard">Onboard new employee</a>
      </Menu.Item>

      <Menu.Item key="delete" icon={<EditOutlined />}>
        <a href="/admin/delete">Delete employee</a>
      </Menu.Item>

      <Menu.Item key="add_department" icon={<EditOutlined />}>
        <a href="/admin/add_department">Add department</a>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
