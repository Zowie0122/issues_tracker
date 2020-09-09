import React, { useState } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import "../App.css";
import SizeContext from "antd/lib/config-provider/SizeContext";

interface ParentCompProps {
  childComp?: React.ReactNode;
}

const { Header, Content, Sider } = Layout;

const Layouts: React.FC<ParentCompProps> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const toogle = () => {
    setCollapsed(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="site-layout-background"
        style={{ padding: 0, color: "white", textAlign: "left", fontSize: 35 }}
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toogle,
          }
        )}
        AA Corperation
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            left: 0,
          }}
        >
          <div className="logo" />
          <Navbar />
        </Sider>
        <Layout className="site-layout" style={{ marginRight: 200 }}>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px 0",
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.childComp}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Layouts;
