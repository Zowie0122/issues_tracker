import React from "react";
import IssuesTable from "./IssuesTable";

const RequstedOngoing: React.FC = () => {
  return (
    <IssuesTable
      url="http://localhost:5000/user/requested/ongoing"
      status="ongoing"
    />
  );
};

export default RequstedOngoing;
