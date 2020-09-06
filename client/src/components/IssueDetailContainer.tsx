import React from "react";
import IssueDetail from "./IssueDetail";
import Layouts from "./Layout";

const IssueDetailContainer: React.FC = () => {
  return <Layouts childComp={<IssueDetail />} />;
};

export default IssueDetailContainer;
