import React from "react";
import RequestedIssuesTable from "./RequestedIssuesTable";
import Layouts from "./Layout";

const RequstedOngoing: React.FC = () => {
  return (
    <Layouts
      childComp={
        <RequestedIssuesTable
          url="http://localhost:5000/user/requested/ongoing"
          status="ongoing"
        />
      }
    />
  );
};

export default RequstedOngoing;
