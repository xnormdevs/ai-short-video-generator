import React from "react";
import { VideoDataProps } from "./PlayerDialog";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ICaptions } from "../create-new/page";

export interface RemotionVideoProps extends VideoDataProps {
  setDurationFrames: (t: number) => void;
}

const RemotionVideo = ({
  id,
  topic,
  imageStyle,
  duration,
  script,
  audioFileUrl,
  captions,
  imageList,
  createdBy,
  setDurationFrames,
}: any) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  /**
   * Calculates the duration of the video in frames based on the captions
   * @returns {number} the duration in frames
   */
  const getDurationFrames = (): number => {
    if (!captions || captions.length === 0) return 0;
    const lastCaption: ICaptions = captions[captions.length - 1];
    setDurationFrames(((lastCaption?.end || 0) / 1000) * fps);
    return ((lastCaption?.end || 0) / 1000) * fps;
  };

  /**
   * Given the current frame, get the corresponding captions text
   * @return {string} the captions text
   */
  const getCurrentCaptions = (): string => {
    const currentTime = (frame / fps) * 1000; //convert frame no to ms
    const currentCaption = captions.find((item: ICaptions) => {
      return currentTime >= item.start && currentTime <= item.end;
    });

    // console.log(currentTime, currentCaption);
    return currentCaption ? currentCaption.text : "";
  };

  return (
    <AbsoluteFill className="bg-black rounded-lg overflow-hidden">
      {imageList?.map((item: string, i: number) => {
        const startTime = (i * getDurationFrames()) / imageList.length;
        const duration = getDurationFrames();
        const scale = (index: number) =>
          interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration],
            index % 2 === 0 ? [1, 1.2, 1] : [1.2, 1, 1.2],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
        return (
          <>
            <Sequence
              key={i}
              from={startTime}
              durationInFrames={getDurationFrames()}
            >
              <AbsoluteFill
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(i)})`,
                  }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    justifyContent: "center",
                    top: undefined,
                    bottom: 50,
                    height: 150,
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <h2 className="text-2xl font-bold">{getCurrentCaptions()}</h2>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          </>
        );
      })}
      <Audio src={audioFileUrl ? audioFileUrl : ""} />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
