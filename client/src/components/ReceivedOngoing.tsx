import React from "react";
import ReceivedIssuesTable from "./ReceivedIssuesTable";
import Layouts from "./Layout";

const ReceivedOngoing: React.FC = () => {
  return (
    <Layouts
      childComp={
        <ReceivedIssuesTable
          url="http://localhost:5000/user/received/ongoing"
          status="ongoing"
        />
      }
    />
  );
};

export default ReceivedOngoing;
