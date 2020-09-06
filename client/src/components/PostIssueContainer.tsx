import React from "react";
import PostIssue from "./PostIssue";
import Layouts from "./Layout";

const PostIssueContainer: React.FC = () => {
  return <Layouts childComp={<PostIssue />} />;
};

export default PostIssueContainer;
