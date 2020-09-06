import React from "react";
import IssuesTable from "./IssuesTable";
import Layouts from "./Layout";

const RequstedOngoing: React.FC = () => {
  return (
    <Layouts
      childComp={
        <IssuesTable
          url="http://localhost:5000/user/requested/ongoing"
          status="ongoing"
        />
      }
    />
  );
};

export default RequstedOngoing;
