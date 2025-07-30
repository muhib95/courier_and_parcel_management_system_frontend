"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import MobileHeader from "./MobileHeader";

const ResponsiveHeader = ({typeHeader,menu}) => {
  const [showNav, setShowNav] = useState(false);
  const handleNavOpen = () => setShowNav(true);
  const handleNavClose = () => setShowNav(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)"); // lg and up

    const handleResize = (e) => {
      if (e.matches) {
        setShowNav(false); // Automatically close nav on large screens
      }
    };

    // Attach listener
    mediaQuery.addEventListener("change", handleResize);

    // Call once on mount
    if (mediaQuery.matches) {
      setShowNav(false);
    }

    return () => mediaQuery.removeListener(handleResize);
  }, []);
  return (
    <div>
      <Header openNav={handleNavOpen} typeHeader={typeHeader} menu={menu}/>
      <MobileHeader showNav={showNav} closeNav={handleNavClose} navLinks={menu}/>
    </div>
  );
};

export default ResponsiveHeader;
