import { StyleSheetManager } from 'styled-components';
import { Route, Routes } from 'react-router-dom';

import { GlobalStyle } from './globalStyle';

import { Home } from '@_scenes/index';
import { UserProvider } from '@_context/index';

export const App = () => {
  return (
    <UserProvider>
      <StyleSheetManager>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </StyleSheetManager>
    </UserProvider>
  )
}

export default App
