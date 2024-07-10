import { colors, borderRadius } from '@_constants/index';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Lato, sans-serif;
    margin: 0;
    background-color: ${colors.primary};
    color: ${colors.white};
    @media (max-width: 600px){
      margin: 0;
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.primaryLight};
    border-radius: ${borderRadius}px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.primaryBorder};
  }
`;
