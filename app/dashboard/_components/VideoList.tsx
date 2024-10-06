"use client";
import { useState } from "react";
import PlayerDialog, { VideoDataProps } from "./PlayerDialog";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
export interface VideoListProps {
  videoList: VideoDataProps[];
}

const VideoList = ({ videoList }: VideoListProps) => {
  const [openPlayerDialog, setOpenPlayerDialog] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number | undefined>(undefined);
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {videoList.map((video, i) => (
        <div
          key={i}
          className="cursor-pointer hover:scale-105 transition-all"
          onClick={() => {
            setOpenPlayerDialog(true);
            setVideoId(video.id);
          }}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={300}
            compositionHeight={450}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            inputProps={{
              ...video,
              setDurationFrames: (frame: number) => {},
            }}
          />
        </div>
      ))}

      <PlayerDialog
        playVideo={openPlayerDialog}
        setPlayVideo={setOpenPlayerDialog}
        videoId={videoId ? videoId : 0}
      />
    </div>
  );
};

export default VideoList;
