import { createContext, Dispatch, SetStateAction } from "react";
import { CommentParams, User, VideoParams } from "@_interfaces/index";

export interface AppContextInterface {
  accountUser: User;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  videos: VideoParams[];
  setIsNewVideoUploaded: Dispatch<SetStateAction<boolean>>;
  setIsVideoUpdated: Dispatch<SetStateAction<boolean>>;
  selectedVideoId: string | null;
  setSelectedVideoId: Dispatch<SetStateAction<string | null>>;
  singleVideo: VideoParams | null;
  setSingleVideo: Dispatch<SetStateAction<VideoParams | null>>;
  videoComments: CommentParams[];
  setVideoComments: Dispatch<SetStateAction<CommentParams[]>>;
  setIsCommentCreated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const appContext = createContext<AppContextInterface | undefined>(undefined);
