import React from "react";
import AddDepartment from "./AddDepartment";
import AdminLayouts from "./AdiminLayout";

const AddDepartmentContainer: React.FC = () => {
  return <AdminLayouts childComp={<AddDepartment />} />;
};

export default AddDepartmentContainer;
