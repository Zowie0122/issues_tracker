import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import LoginContainer from "./components/LoginContainer";
import ReceivedOngoing from "./components/ReceivedOngoing";
import ReceivedSolved from "./components/ReceivedSolved";
import RequestedSolved from "./components/RequestedSolved";
import RequestedOngoing from "./components/RequstedOngoing";
import PostIssueContainer from "./components/PostIssueContainer";
import IssueDetailContainer from "./components/IssueDetailContainer";
import OnboardContainer from "./components/admin/OnboardContainer";
import DeleteEmployeeContainer from "./components/admin/DeleteEmployeeContainer";
import AddDepartmentContainer from "./components/admin/AddDepartmentContainer";
import PasswordResetContainer from "./components/UpdatePasswordContainer";

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
          path="/employee/password_reset"
          pageComponent={<PasswordResetContainer />}
        />

        <RouterPage
          path="/issue_details/:id"
          pageComponent={<IssueDetailContainer />}
        />

        <RouterPage
          path="/admin/onboard"
          pageComponent={<OnboardContainer />}
        />

        <RouterPage
          path="/admin/delete"
          pageComponent={<DeleteEmployeeContainer />}
        />

        <RouterPage
          path="/admin/add_department"
          pageComponent={<AddDepartmentContainer />}
        />
      </Router>
    </div>
  );
};

export default App;

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
