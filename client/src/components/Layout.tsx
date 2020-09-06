import React, { useState } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import "../App.css";

interface ParentCompProps {
  childComp?: React.ReactNode;
}

const { Header, Content, Footer, Sider } = Layout;

const Layouts: React.FC<ParentCompProps> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toogle = () => {
    setCollapsed(true);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Navbar />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toogle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.childComp}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
