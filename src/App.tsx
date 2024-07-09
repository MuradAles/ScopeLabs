import { GlobalStyle } from './globalStyle';
import { Home } from '@_scenes/index';
import { Route, Routes } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import { AppContextProvider } from '@_provider/provider';

export const App = () => {
  return (
    <AppContextProvider>
      <StyleSheetManager>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </StyleSheetManager>
    </AppContextProvider>
  );
};
