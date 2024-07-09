import React from 'react';
import { GlobalStyle } from './globalStyle';
import { Home } from '@_scenes/index';
import { Route, Routes } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import { AppContextProvider } from '@_provider/provider';
import AnimatedBackgroundComponent from '@_components/animatedBackground/animatedBackground';

export const App: React.FC = () => {
  return (
    <AppContextProvider>
      <StyleSheetManager>
        <GlobalStyle />
        <AnimatedBackgroundComponent />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </StyleSheetManager>
    </AppContextProvider>
  );
};
