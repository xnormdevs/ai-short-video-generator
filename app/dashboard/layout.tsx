"use client";
import React, { ReactNode, useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { IVideoData, VideoDataContext } from "../_context/VideoDataContext";

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [videoData, setVideoData] = useState();
  return (
    <VideoDataContext.Provider value={{videoData, setVideoData}}>
      <div>
        <Header />
        <div className="hidden md:block h-screen bg-whtie fixed w-64">
          <SideNav />
        </div>
        <div>
          <div className="md:ml-64 pt-20">{children}</div>
        </div>
      </div>
    </VideoDataContext.Provider>
  );
};

export default DashboardLayout;
