import { Theme } from '@kry/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
