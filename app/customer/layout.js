import ResponsiveHeader from "../../components/Header/ResponsiveHeader";
import React from "react";

const CustomerLayout = ({ children }) => {
  const typeHeader = 'Customer';
   const menu = [
    {
      label: "Book",
      link: "/customer",
    },
    {
      label: "Booking History",
      link: "/customer/bookinghistory",
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

export default CustomerLayout;
