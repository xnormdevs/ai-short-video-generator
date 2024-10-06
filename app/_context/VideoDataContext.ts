import { createContext } from "react";
import { ICaptions } from "../dashboard/create-new/page";
export interface IVideoData {
  videoScript: string;
  audioFileUrl: string;
  captions: ICaptions[];
  imageList: string[];
}

export interface VideoContext {
  videoData: IVideoData;
  setVideoData: (v: IVideoData) => void;
}

export const VideoDataContext = createContext({});
