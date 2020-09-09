import React from "react";
import ReceivedIssuesTable from "./ReceivedIssuesTable";
import Layouts from "./Layout";

const ReceivedSolved: React.FC = () => {
  return (
    <Layouts
      childComp={
        <ReceivedIssuesTable
          url="http://localhost:5000/user/received/solved"
          status="solved"
        />
      }
    />
  );
};

export default ReceivedSolved;
