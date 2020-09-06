import React from "react";
import IssuesTable from "./IssuesTable";
import Layouts from "./Layout";

const RequestedSolved: React.FC = () => {
  return (
    <Layouts
      childComp={
        <IssuesTable
          url="http://localhost:5000/user/requested/solved"
          status="solved"
        />
      }
    />
  );
};

export default RequestedSolved;
