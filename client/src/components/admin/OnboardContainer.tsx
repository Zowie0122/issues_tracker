import React from "react";
import Onboard from "./Onboard";
import AdminLayouts from "./AdiminLayout";

const OnboardContainer: React.FC = () => {
  return <AdminLayouts childComp={<Onboard />} />;
};

export default OnboardContainer;
