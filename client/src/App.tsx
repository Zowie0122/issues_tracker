import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import EmployeeLogin from "./components/EmployeeLogin";
import Dashboard from "./components/Dashboard";
import OngoingTasks from "./components/OngoingTasks";
import PostIssue from "./components/PostIssue";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <RouterPage path="/" pageComponent={<EmployeeLogin />} />
        <RouterPage path="/employee/dashboard" pageComponent={<Dashboard />} />
        <RouterPage
          path="/employee/assignments/ongoing"
          pageComponent={<OngoingTasks />}
        />

        <RouterPage path="/employee/post" pageComponent={<PostIssue />} />
      </Router>
    </div>
  );
};

export default App;

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
