import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Login from "./components/Login";
import ReceivedOngoing from "./components/ReceivedOngoing";
import ReceivedSolved from "./components/ReceivedSolved";
import RequestedSolved from "./components/RequestedSolved";
import RequestedOngoing from "./components/RequstedOngoing";
import PostIssue from "./components/PostIssue";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <RouterPage path="/" pageComponent={<Login />} />

        <RouterPage
          path="/employee/received_ongoing"
          pageComponent={<ReceivedOngoing />}
        />

        <RouterPage
          path="/employee/post_new_request"
          pageComponent={<PostIssue />}
        />

        <RouterPage
          path="/employee/requested_ongoing"
          pageComponent={<RequestedOngoing />}
        />

        <RouterPage
          path="/employee/received_solved"
          pageComponent={<ReceivedSolved />}
        />
      </Router>

      <RouterPage
        path="/employee/requested_solved"
        pageComponent={<RequestedSolved />}
      />
    </div>
  );
};

export default App;

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
