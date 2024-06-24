import { createContext } from "react";
import { User, VideoParams } from "@_interfaces/index";

interface AppContextInterface {
  user: User;
  setUser: User;
  videos: VideoParams[];
  setIsNewVideoUploaded: boolean;
  setIsVideoUpdated: boolean;
  selectedVideoId: string | null;
  setSelectedVideoId: string | null;
  singleVideo: VideoParams | null;
  setSingleVideo: VideoParams | null;
  loading: boolean;
  setLoading: boolean;
}

export const appContext = createContext<AppContextInterface | undefined>(undefined);
