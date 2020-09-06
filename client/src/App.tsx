import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import LoginContainer from "./components/LoginContainer";
import ReceivedOngoing from "./components/ReceivedOngoing";
import ReceivedSolved from "./components/ReceivedSolved";
import RequestedSolved from "./components/RequestedSolved";
import RequestedOngoing from "./components/RequstedOngoing";
import PostIssueContainer from "./components/PostIssueContainer";
import IssueDetailContainer from "./components/IssueDetailContainer";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <RouterPage path="/" pageComponent={<LoginContainer />} />

        <RouterPage
          path="/employee/received_ongoing"
          pageComponent={<ReceivedOngoing />}
        />

        <RouterPage
          path="/employee/post_new_request"
          pageComponent={<PostIssueContainer />}
        />

        <RouterPage
          path="/employee/requested_ongoing"
          pageComponent={<RequestedOngoing />}
        />

        <RouterPage
          path="/employee/received_solved"
          pageComponent={<ReceivedSolved />}
        />

        <RouterPage
          path="/employee/requested_solved"
          pageComponent={<RequestedSolved />}
        />

        <RouterPage
          path="/issue_details/:id"
          pageComponent={<IssueDetailContainer />}
        />
      </Router>
    </div>
  );
};

export default App;

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
