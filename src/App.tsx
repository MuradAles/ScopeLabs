import React from 'react';
import { GlobalStyle } from './globalStyle';
import { Home } from '@_scenes/index';
import { Route, Routes } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import { AppContextProvider } from '@_provider/provider';
import { AnimatedGradientBackground } from '@_components/animatedBackground/animatedBackground';

export const App: React.FC = () => {
  return (
    <AppContextProvider>
      <StyleSheetManager>
        <GlobalStyle />
        <AnimatedGradientBackground />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </StyleSheetManager>
    </AppContextProvider>
  );
};

