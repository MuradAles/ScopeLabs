import { StyleSheetManager } from 'styled-components';
import { Route, Routes, useLocation } from 'react-router-dom';

import { GlobalStyle } from './globalStyle';

import { Home } from '@_scenes/index';
import { appContext } from '@_context/index';
import { User, VideoParams } from '@_interfaces/index';
import { useState, useEffect } from 'react';
import { getUserVideos } from './_services';

export const App = () => {
  const [user, setUser] = useState<User>({ user_id: "john_smith" });
  const [videos, setVideos] = useState<VideoParams[]>([]);
  const [isNewVideoUploaded, setIsNewVideoUploaded] = useState<boolean>(false);
  const [areVideosUpdated, setAreVideosUpdated] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideos = async () => {
      const userVideos = await getUserVideos(user.user_id);
      setVideos(userVideos);
    };

    if (user.user_id || isNewVideoUploaded || areVideosUpdated) {
      fetchVideos();
    }
  }, [user.user_id, isNewVideoUploaded, areVideosUpdated]);

  return (
    <appContext.Provider value={{ user, setUser, videos }}>
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
