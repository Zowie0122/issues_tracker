import React from "react";
import IssuesTable from "./IssuesTable";
import Layouts from "./Layout";

const ReceivedSolved: React.FC = () => {
  return (
    <Layouts
      childComp={
        <IssuesTable
          url="http://localhost:5000/user/received/solved"
          status="solved"
        />
      }
    />
  );
};

export default ReceivedSolved;
