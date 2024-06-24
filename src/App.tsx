import { StyleSheetManager } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './globalStyle';
import { Home } from '@_scenes/index';
import { appContext } from '@_context/index';
import { CommentParams, User, VideoParams } from '@_interfaces/index';
import { useState, useEffect, useCallback } from 'react';
import { getSingleVideo, getUserVideos, getVideoComments, getVideoThumbnail } from './_services';

export const App = () => {
  const [user, setUser] = useState<User>({ user_id: "john_smith" });
  const [videos, setVideos] = useState<VideoParams[]>([]);
  const [isNewVideoUploaded, setIsNewVideoUploaded] = useState<boolean>(false);

  const [isVideoUpdated, setIsVideoUpdated] = useState<boolean>(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [singleVideo, setSingleVideo] = useState<VideoParams | null>(null);

  const [isCommentCreated, setIsCommentCreated] = useState<boolean>(false);
  const [videoComments, setVideoComments] = useState<CommentParams[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const userVideos = await getUserVideos(user.user_id);
      const videosWithThumbnails = await Promise.all(
        userVideos.map(async (video: VideoParams) => {
          const thumbnailUrl = await getVideoThumbnail(video.video_url);
          return { ...video, thumbnail_url: thumbnailUrl };
        })
      );
      setVideos(videosWithThumbnails);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  }, [user.user_id]);

  const fetchVideo = useCallback(async () => {
    if (selectedVideoId) {
      setLoading(true);
      try {
        const userVideo = await getSingleVideo(selectedVideoId);
        setSingleVideo(userVideo);
      } catch (error) {
        console.error('Failed to fetch single video:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [selectedVideoId]);

  const fetchComments = useCallback(async () => {
    if (selectedVideoId) {
      setLoading(true);
      try {
        const VideoComments = await getVideoComments(selectedVideoId);
        setVideoComments(VideoComments);
      } catch (error) {
        console.error('Failed to fetch single video:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [selectedVideoId]);

  useEffect(() => {
    fetchVideos();
    if (isNewVideoUploaded || isVideoUpdated) {
      setIsNewVideoUploaded(false);
      setIsVideoUpdated(false);
    }
  }, [fetchVideos, isNewVideoUploaded, isVideoUpdated]);

  useEffect(() => {
    fetchVideo();
    if (isVideoUpdated) {
      setIsVideoUpdated(false);
    }
  }, [fetchVideo, isVideoUpdated, isCommentCreated])

  useEffect(() => {
    fetchComments();
    if (isCommentCreated) {
      setIsCommentCreated(false)
    }
  }, [fetchComments, isCommentCreated])


  return (
    <appContext.Provider value={{
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
      <StyleSheetManager>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </StyleSheetManager>
    </appContext.Provider>
  )
}
