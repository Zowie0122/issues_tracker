import React from "react";
import Login from "./Login";
import { Layout, Row, Col } from "antd";
import "../App.css";

const LayoutContainer: React.FC = () => {
  return (
    <div>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col span={6}>
          <Login />
        </Col>
      </Row>
    </div>
  );
};

export default LayoutContainer;
