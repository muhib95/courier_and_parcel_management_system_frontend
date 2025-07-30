import ResponsiveHeader from "../../components/Header/ResponsiveHeader";
import React from "react";

const CustomerLayout = ({ children }) => {
  return (
    <div className="">
      <div>
        <ResponsiveHeader />
      </div>
      {children}
    </div>
  );
};

export default CustomerLayout;
