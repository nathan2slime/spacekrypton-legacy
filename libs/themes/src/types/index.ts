export type Theme = {
  primaryColorUp: string;
  primaryColorDown: string;
  primaryFontFamily: string;
  secondaryFontFamily: string;
  textColorDown: string;
  textColorUp: string;
  darkColorPure: string;
  lightColorPure: string;
  backgroundColorUp: string;
  borderColorUp: string;
  textColorLight: string;
  borderColorDown: string;
  loadingColorUp: string;
  backgroundColorDown: string;
  foregroundColorUp: string;
  activeBackgroundColor: string;
  foregroundColorDown: string;
  tertiaryColorUp: string;
  tertiaryColorDown: string;
  secondaryColorDown: string;
  secondaryColorUp: string;
  placeholderColor: string;
  fieldColorUp: string;
  fieldBackgroundColorUp: string;
  fieldBackgroundColorDown: string;
  dangerColorUp: string;
  dangerColorDown: string;
  fieldTextColor: string;
  fieldColorDown: string;
  foregroundColorUpOpac: string;
  quartenaryColorUp: string;
  quartenaryColorDown: string;
  foregroundColorDownOpac: string;
};

export type MultiTheme = {
  [name: string]: Theme;
};

export type Themes = 'dark' | 'light';

export type Breakpoints = {
  [name: string]: string;
};
