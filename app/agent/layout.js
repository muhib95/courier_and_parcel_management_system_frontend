import ResponsiveHeader from "@/components/Header/ResponsiveHeader";
import React from "react";

const AgentLayout = ({ children }) => {
  const typeHeader = 'Agent';
   const menu = [
    {
      label: "Home",
      link: "/customer",
    },
  ];
  return (
    <div className="">
      <div>
        <ResponsiveHeader typeHeader={typeHeader} menu={menu}/>
      </div>
      {children}
    </div>
  );
};

export default AgentLayout;
