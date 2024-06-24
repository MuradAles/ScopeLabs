import { StyleSheetManager } from 'styled-components';
import { Route, Routes } from 'react-router-dom';

import { GlobalStyle } from './globalStyle';

import { Home } from '@_scenes/index';
import { appContext } from '@_context/index';
import { User, VideoParams } from '@_interfaces/index';
import { useState, useEffect, useCallback } from 'react';
import { getUserVideos, getVideoThumbnail } from './_services';

export const App = () => {
  const [user, setUser] = useState<User>({ user_id: "john_smith" });
  const [videos, setVideos] = useState<VideoParams[]>([]);
  const [isNewVideoUploaded, setIsNewVideoUploaded] = useState<boolean>(false);
  const [isVideoUpdated, setIsVideoUpdated] = useState<boolean>(false);

  const fetchVideos = useCallback(async () => {
    const userVideos = await getUserVideos(user.user_id);
    const videosWithThumbnails = await Promise.all(
      userVideos.map(async (video: VideoParams) => {
        const thumbnailUrl = await getVideoThumbnail(video.video_url);
        return { ...video, thumbnail_url: thumbnailUrl };
      })
    );
    setVideos(videosWithThumbnails);
  }, [user.user_id]);

  useEffect(() => {
    fetchVideos();
    if (isNewVideoUploaded || isVideoUpdated) {
      setIsNewVideoUploaded(false);
      setIsVideoUpdated(false);
    }
  }, [fetchVideos, isNewVideoUploaded, isVideoUpdated]);

  return (
    <appContext.Provider value={{ user, setUser, videos, setIsNewVideoUploaded, setIsVideoUpdated }}>
      <StyleSheetManager>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </StyleSheetManager>
    </appContext.Provider>
  )
}

export default App
