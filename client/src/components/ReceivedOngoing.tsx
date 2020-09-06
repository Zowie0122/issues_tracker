import React from "react";
import IssuesTable from "./IssuesTable";
import Layouts from "./Layout";

const ReceivedOngoing: React.FC = () => {
  return (
    <Layouts
      childComp={
        <IssuesTable
          url="http://localhost:5000/user/received/ongoing"
          status="ongoing"
        />
      }
    />
  );
};

export default ReceivedOngoing;
