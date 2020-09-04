import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import OngoingTasks from "./components/OngoingTasks";
import PostIssue from "./components/PostIssue";
import SolvedTasks from "./components/SolvedTasks";
import Navbar from "./components/Navbar";
import TrackIssues from "./components/TrackIssues";
const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <RouterPage path="/" pageComponent={<Login />} />
        <RouterPage path="/employee/dashboard" pageComponent={<Dashboard />} />
        <RouterPage path="/employee/post" pageComponent={<PostIssue />} />
        <RouterPage
          path="/employee/track_issues"
          pageComponent={<TrackIssues />}
        />
        <RouterPage
          path="/employee/solved_tasks"
          pageComponent={<SolvedTasks />}
        />
      </Router>
    </div>
  );
};

export default App;

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
