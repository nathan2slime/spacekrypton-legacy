import { createGlobalStyle } from 'styled-components';

import { parseCssTheme } from '@kry/themes';

export default createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    user-select: none;
    letter-spacing: 0.02rem;
    user-zoom: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    font-size: 95%;
  }

  :root {
    ${({ theme }) => parseCssTheme(theme)}
  }

  body {
    overflow: hidden;
  }
`;

export const Fonts = createGlobalStyle`
  @font-face {
    font-family: ${({ theme }) => theme.primaryFontFamily};
    
    src: url('/fonts/Satoshi.ttf') format('truetype');
  }
`;
