import React from "react";
import IssuesTable from "./IssuesTable";

const ReceivedSolved: React.FC = () => {
  return (
    <IssuesTable
      url="http://localhost:5000/user/received/solved"
      status="solved"
    />
  );
};

export default ReceivedSolved;
