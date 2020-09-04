import React from "react";
import IssuesTable from "./IssuesTable";

const RequestedSolved: React.FC = () => {
  return (
    <IssuesTable
      url="http://localhost:5000/user/requested/solved"
      status="solved"
    />
  );
};

export default RequestedSolved;
