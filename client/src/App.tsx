import React, { useState } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import EmployeeLogin from "./components/EmployeeLogin";
import Dashboard from "./components/Dashboard";
const App: React.FC = () => {
  return (
    <div>
      <Router>
        <RouterPage path="/" pageComponent={<EmployeeLogin />} />
        <RouterPage path="/employee/dashboard" pageComponent={<Dashboard />} />
      </Router>
    </div>
  );
};

export default App;

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
