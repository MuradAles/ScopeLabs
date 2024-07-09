import { colors } from '@_constants/index';
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
    margin: 0 5%;
    @media (max-width: 600px){
      margin: 0;
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.primarys0l20};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.primarys0l30};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.primarys0l40};
  }
`;
