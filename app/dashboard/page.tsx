"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import HeaderTitle from "../../components/common/HeaderTitle";
import EmptyState from "./_components/EmptyState";
import { VideoDataProps } from "./_components/PlayerDialog";
import Image from "next/image";
import VideoList from "./_components/VideoList";
import { UserDetailsContext } from "../_context/UserDetailsContext";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [videoList, setVideoList] = useState<VideoDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (session) {
      getVideoList();
    }
  }, [session]);
  const getVideoList = async () => {
    setLoading(true);
    if (session?.user?.email) {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.createdBy, session.user.email));

      setVideoList(result as VideoDataProps[]);
      setLoading(false);
    }
  };
  return (
    <div className="md:px-20">
      <div className="flex items-center justify-between">
        <HeaderTitle title="Dashboard" />
        <Link href="/dashboard/create-new">
          <Button>Create new video</Button>
        </Link>
      </div>

      {/* empty list */}
      {!loading ? (
        videoList?.length === 0 ? (
          <EmptyState />
        ) : (
          <VideoList videoList={videoList} />
        )
      ) : (
        <div className="flex p-5 items-center flex-col mt-10 border-2 border-dotted py-24">
          <Image src="/container.gif" alt="loading" width={100} height={100} />
        </div>
      )}
      {/* list of videos */}
    </div>
  );
};

export default Dashboard;
