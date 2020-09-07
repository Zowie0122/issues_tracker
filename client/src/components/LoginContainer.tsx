import React from "react";
import Login from "./Login";
import { Row, Col } from "antd";
import { Layout } from "antd";
import "../App.css";

const { Header, Content, Footer, Sider } = Layout;

const LayoutContainer: React.FC = () => {
  return (
    <div>
      <Layout>
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        ></Header>
        <Layout>
          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Row
                justify="center"
                align="middle"
                style={{ minHeight: "100vh" }}
              >
                <Col span={6}>
                  <Login />
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutContainer;
