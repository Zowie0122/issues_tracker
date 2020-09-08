import React from "react";
import DeleteEmployee from "./DeleteEmployee";
import AdminLayouts from "./AdiminLayout";

const DeleteEmployeeContainer: React.FC = () => {
  return <AdminLayouts childComp={<DeleteEmployee />} />;
};

export default DeleteEmployeeContainer;
