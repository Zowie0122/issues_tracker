import React from "react";
import IssuesTable from "./IssuesTable";

const ReceivedOngoing: React.FC = () => {
  return (
    <IssuesTable
      url="http://localhost:5000/user/received/ongoing"
      status="ongoing"
    />
  );
};

export default ReceivedOngoing;
