import React from "react";
import RequestedIssueDetail from "./RequestedIssueDetail";
import Layouts from "./Layout";

const RequestedIssueDetailContainer: React.FC = () => {
  return <Layouts childComp={<RequestedIssueDetail />} />;
};

export default RequestedIssueDetailContainer;
