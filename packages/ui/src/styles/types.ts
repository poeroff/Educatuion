import { Property } from 'csstype';

/**
 * @description Style Theme Type
 */
export enum EStyleThemeTypes {
  PRIMARY = 'primary',
  DEFAULT = 'default',
  // SECONDARY = 'secondary',
  // TERTIARY = 'tertiary',
}

/**
 * @description Style Button Type
 *
 */

export enum EStyleButtonTypes {
  NORMAL = 'normal',
  PRIMARY = 'primary',
  DEFAULT = 'default',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  TERTIARY = 'tertiary',
  YELLOW = 'yellow',
  GRAY = 'gray',
  BROWN = 'brown',
  LIGHTBROWN = 'lightBrown',
  BLUE = 'blue',
  LIGHTBLUE = 'lightBlue',
}

/**
 * @description Style ShadowedButton Type
 *
 */
export enum EStyleShadowedButtonTypes {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
}

/**
 * @description Style Size Type
 *
 */
export enum EStyleSizes {
  'FULL-AUTO' = 'full-auto',
  'XX-SMALL' = 'xx-small',
  'X-SMALL' = 'x-small',
  'SMALL' = 'small',
  'MEDIUM' = 'medium',
  'LARGE' = 'large',
  'X-LARGE' = 'x-large',
}

export enum EStyleFontSizes {
  'X-SMALL' = 'x-small', // 16px
  'SMALL' = 'small', //20px
  'X-MEDIUM' = 'x-medium', //24px
  'MEDIUM' = 'medium', //28px
  'LARGE' = 'large', //40px
  'X-LARGE' = 'x-large',
}

/**
 * @description Style Size Type
 *
 */
export enum EStyleIndex {
  'DIALOG' = 11,
  'DIM' = 5,
  'RECORDER' = 8,
  'DROPDOWN' = 9,
  'AUDIO' = 10,
  'PinchZoom' = 12,
}

export enum ETypographyTypes {
  TITLE = 'title',
  BODY = 'body',
  CAPTION = 'caption',
}

export type TagSet = {
  [key in EStyleThemeTypes]: {
    background: Property.Background;
    color: Property.Color;
  };
};

export enum ERatingTypes {
  STAR = 'star',
  SMILE_1 = 'smile_1',
  SMILE_2 = 'smile_2',
  SMILE_3 = 'smile_3',
}

/**
 * @description Style Align Type
 *
 */
export type TStyleHorizontalAlign = Property.TextAlign;
export type TStyleVerticalAlign = 'top' | 'bottom' | 'middle';
export type TStyleSize = 'small' | 'middle' | 'large';

/**
 * @description Style TextView
 */

export enum ETextViewColor {
  DEFAULT = 'default',
  SKYBLUE = 'skyblue',
  YELLOW = 'yellow',
  LIGHT_YELLOW = 'light_yellow',
}

/**
 * @description Style Table Type
 */
export enum EStyleTableTypes {
  DEFAULT = 'default',
  // PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  GRAY = 'gary',
  RED = 'red',
  MATH = 'math',
  MATH_NONE = 'math_none',
  MATH_DIVIDE = 'math_divide',
  COLORFUL = 'colorful',
  PINK_AND_GREEN = 'pink_and_green',
  YELLOW_SECONDARY = 'yellow_secondary',
  ENGLISH_POINT = 'english_point',
  YELLOW_TERTIARY = 'yellow_teriary',
}
