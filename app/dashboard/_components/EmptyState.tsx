import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EmptyState = () => {
  return (
    <div className="flex p-5 items-center flex-col mt-10 border-2 border-dotted py-24">
      <h2>You don't have any short video created</h2>
      <Link href="/dashboard/create-new">
        <Button className="mt-2">Create new video</Button>
      </Link>
    </div>
  );
};

export default EmptyState;
