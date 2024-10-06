"use client";
import React, { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { ICaptions, IVideoScript } from "../create-new/page";
import { useRouter } from "next/navigation";
import Image from "next/image";

export interface PlayerDialogProps {
  playVideo: boolean;
  videoId: number;
  setPlayVideo(value: boolean): void;
}

export interface VideoDataProps {
  id?: number;
  topic?: string;
  imageStyle?: string;
  duration?: string;
  script?: IVideoScript[];
  audioFileUrl?: string;
  captions?: ICaptions[];
  imageList?: string[];
  createdBy?: string;
}

const PlayerDialog = ({
  playVideo,
  videoId,
  setPlayVideo,
}: PlayerDialogProps) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<VideoDataProps>();
  const [durationInFrames, setDurationFrames] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setOpenDialog(playVideo);
    videoId && getVideoData();
  }, [playVideo, videoId]);
  const getVideoData = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));
    // console.log(result);
    if (result[0]) {
      setVideoData(result[0] as VideoDataProps);
      setLoading(false);
    }
  };
  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white flex-col flex items-center">
        {!loading ? (
          <>
            <DialogHeader className="flex-col flex items-center mb-5">
              <DialogTitle className="text-3xl font-bold">
                Your video is ready
              </DialogTitle>
              <DialogDescription>Enjoy</DialogDescription>
            </DialogHeader>
            <Player
              component={RemotionVideo}
              durationInFrames={Math.round(durationInFrames)}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              inputProps={{
                ...videoData,
                setDurationFrames: (frame: number) => setDurationFrames(frame),
              }}
              controls={true}
            />

            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => {
                  setOpenDialog(false);
                  setPlayVideo(false);
                  setLoading(true);
                  router.replace("/dashboard");
                }}
              >
                Close
              </Button>
              <Button>Export</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogTitle className="text-3xl font-bold">
              Few moment please!
            </DialogTitle>
            <Image
              src="/container.gif"
              alt="loading"
              width={100}
              height={100}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
