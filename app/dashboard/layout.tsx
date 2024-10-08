"use client";
import { ReactNode, useEffect, useState } from "react";
import { VideoDataContext } from "../_context/VideoDataContext";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useSession } from "next-auth/react";
import { UserDetailsContext } from "../_context/UserDetailsContext";
import { Users } from "@/configs/schema";

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [videoData, setVideoData] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();
  const { data: session, status } = useSession();
  useEffect(() => {
    getUserDetails();
  }, [session]);
  const getUserDetails = async () => {
    if (session?.user?.email) {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.email, session?.user?.email));
      setUserDetails(result[0]);
    }
  };
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <VideoDataContext.Provider value={{ videoData, setVideoData }}>
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
    </UserDetailsContext.Provider>
  );
};

export default DashboardLayout;
