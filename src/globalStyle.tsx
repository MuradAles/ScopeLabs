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
  }
`;
