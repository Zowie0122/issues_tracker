import React from "react";
import RequestedIssuesTable from "./RequestedIssuesTable";
import Layouts from "./Layout";

const RequestedSolved: React.FC = () => {
  return (
    <Layouts
      childComp={
        <RequestedIssuesTable
          url="http://localhost:5000/user/requested/solved"
          status="solved"
        />
      }
    />
  );
};

export default RequestedSolved;
