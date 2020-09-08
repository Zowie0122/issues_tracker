import React from "react";
import UpdatePassword from "./UpdatePassword";
import Layouts from "./Layout";

const UpdatePasswordContainer: React.FC = () => {
  return <Layouts childComp={<UpdatePassword />} />;
};

export default UpdatePasswordContainer;
