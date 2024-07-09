import { EStyleThemeTypes, EStyleButtonTypes, ETypographyTypes, EStyleTableTypes } from '@/styles/types';
import '@emotion/react';
import { Property } from 'csstype';

declare module '@emotion/react' {
  export type ColorSet = {
    [key in EStyleThemeTypes]: {
      background: Property.Background;
      color: Property.Color;
    };
  };

  export type TagSet = {
    [key in EStyleThemeTypes]: {
      background: Property.Background;
      color: Property.Color;
    };
  };

  export type TypographySet = {
    [key in ETypographyTypes]: {
      size: EStyleSizes;
      color: Property.Color;
      weight?: Property.FontWeight;
      align?: Property.TextAlign;
    };
  };

  export type ButtonSet = {
    [key in EStyleButtonTypes]: {
      background?: Property.Background;
      color?: Property.Color;
      border?: string;
      borderRadius?: string;
      padding?: string;
      fontSize?: string;
      fontWeight?: string;
    };
  };

  // Web Accessibility Initiative (WAI) | W3C
  export interface IWAI {
    tabIndex?: number;
    alt?: string;
    title?: string;
    ariaLabel?: string;
    ariaDescribedby?: string;
    ariaHidden?: boolean;
  }
}

export type TableSet = {
  [key in EStyleTableTypes]: {
    list: Property;
    table: Property;
    th: Property;
    td: Property;
    cssStyle: string;
  };
};
