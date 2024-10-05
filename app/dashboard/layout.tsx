import React, { ReactNode } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div>
      <Header />
      <div className="hidden md:block h-screen bg-whtie fixed w-64">
        <SideNav />
      </div>
      <div>
        <div className="md:ml-64 p-10">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
