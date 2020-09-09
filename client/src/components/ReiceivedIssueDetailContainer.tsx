import React from "react";
import ReiceivedIssueDetail from "./ReceivedIssueDetail";
import Layouts from "./Layout";

const ReiceivedIssueDetailContainer: React.FC = () => {
  return <Layouts childComp={<ReiceivedIssueDetail />} />;
};

export default ReiceivedIssueDetailContainer;
