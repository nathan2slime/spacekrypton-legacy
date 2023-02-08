export type KryInputType = 'text' | 'password';
export type KryVariant = 'solid' | 'outline';
export type KryButtonType = 'submit' | 'button';
export type KryAlert = {
  color: KryColor;
  open: boolean;
  title?: string;
};
export type KryLight = 'up' | 'down';
export type KrySize = 'small' | 'medium' | 'large';
export type KryColor = 'primary' | 'secondary' | 'tertiary';
export type KryButtonBold = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type KryAnchor = 'right' | 'left' | 'top' | 'bottom';
export type KryField = {
  value: string;
  name: string;
};
