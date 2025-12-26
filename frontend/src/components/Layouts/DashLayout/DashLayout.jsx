import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

import NavHeader from "./NavHeader";
import ProtoSidebar from "./ProtoSidebar";

import { Outlet } from "react-router-dom";
import { useState } from "react";

function DashLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="main-wrapper" className="show">
      <NavHeader isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <DashHeader />
      <ProtoSidebar toggleSidebar={toggleSidebar} />
      <Outlet />
      <DashFooter />
    </div>
  );
}

export default DashLayout;
