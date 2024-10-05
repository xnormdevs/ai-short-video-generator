"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import HeaderTitle from "../../components/common/HeaderTitle";

const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  return (
    <div className="md:px-20">
      <div className="flex items-center justify-between">
        <HeaderTitle title="Dashboard" />
        <Link href="/dashboard/create-new">
          <Button>Create new video</Button>
        </Link>
      </div>

      {/* empty list */}
      {videoList?.length === 0 && <EmptyState />}
    </div>
  );
};

export default Dashboard;
