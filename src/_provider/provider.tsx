import React, { useEffect, useState, useCallback } from 'react';
import { appContext } from '@_context/index';
import { CommentParams, User, VideoParams } from '@_interfaces/index';
import { getSingleVideo, getUserVideos, getVideoComments, getVideoThumbnail } from '../_services';

interface AppContextProviderProps {
  children: React.ReactNode;
}

const accountUser: User = { user_id: "murad_aleskerov" };

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ user_id: "murad_aleskerov" }); // State for current user information.
  const [videos, setVideos] = useState<VideoParams[]>([]); // State for storing videos fetched from the API.
  const [isNewVideoUploaded, setIsNewVideoUploaded] = useState<boolean>(false); // State flag for indicating if a new video has been uploaded.
  const [isVideoUpdated, setIsVideoUpdated] = useState<boolean>(false); // State flag for indicating if a video has been updated.
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null); // State for the ID of the currently selected video.
  const [singleVideo, setSingleVideo] = useState<VideoParams | null>(null); // State for storing details of a single video.
  const [isCommentCreated, setIsCommentCreated] = useState<boolean>(false); // State flag for indicating if a comment has been created.
  const [videoComments, setVideoComments] = useState<CommentParams[]>([]); // State for storing comments associated with a video.
  const [loading, setLoading] = useState<boolean>(false); // State flag for indicating if data is being fetched/loading.

  // Function to fetch videos for the current user.
  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const userVideos = await getUserVideos(user.user_id); // Fetching videos associated with the current user.
      const videosWithThumbnails = await Promise.all(
        userVideos.map(async (video: VideoParams) => {
          const thumbnailUrl = await getVideoThumbnail(video.video_url); // Generating thumbnail URLs for each video.
          return { ...video, thumbnail_url: thumbnailUrl }; // Adding thumbnail URL to video object.
        })
      );
      setVideos(videosWithThumbnails); // Updating state with videos including thumbnails.
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  }, [user.user_id]);

  // Function to fetch details of a single video based on selectedVideoId.
  const fetchVideo = useCallback(async () => {
    if (selectedVideoId) {
      setLoading(true);
      try {
        const userVideo = await getSingleVideo(selectedVideoId); // Fetching details of the selected video.
        setSingleVideo(userVideo); // Updating state with the fetched video details.
      } catch (error) {
        console.error('Failed to fetch single video:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [selectedVideoId]);

  // Function to fetch comments for the selected video.
  const fetchComments = useCallback(async () => {
    if (selectedVideoId) {
      setLoading(true);
      try {
        const VideoComments = await getVideoComments(selectedVideoId); // Fetching comments associated with the selected video.
        setVideoComments(VideoComments); // Updating state with the fetched comments.
      } catch (error) {
        console.error('Failed to fetch single video:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [selectedVideoId]);

  // Effect to fetch videos when component mounts or when isNewVideoUploaded or isVideoUpdated changes.
  useEffect(() => {
    fetchVideos();
    if (isNewVideoUploaded || isVideoUpdated) {
      setIsNewVideoUploaded(false);
      setIsVideoUpdated(false);
    }
  }, [fetchVideos, isNewVideoUploaded, isVideoUpdated]);

  // Effect to fetch details of a single video when selectedVideoId changes or when isVideoUpdated or isCommentCreated changes.
  useEffect(() => {
    fetchVideo();
    if (isVideoUpdated) {
      setIsVideoUpdated(false);
    }
  }, [fetchVideo, isVideoUpdated, isCommentCreated]);

  // Effect to fetch comments when selectedVideoId changes or when isCommentCreated changes.
  useEffect(() => {
    fetchComments();
    if (isCommentCreated) {
      setIsCommentCreated(false);
    }
  }, [fetchComments, isCommentCreated]);

  return (
    <appContext.Provider value={{
      accountUser,
      user,
      setUser,
      videos,
      setIsNewVideoUploaded,
      setIsVideoUpdated,
      selectedVideoId,
      setSelectedVideoId,
      singleVideo,
      setSingleVideo,
      videoComments,
      setVideoComments,
      setIsCommentCreated,
      loading,
      setLoading,
    }}>
      {children}
    </appContext.Provider>
  );
};
