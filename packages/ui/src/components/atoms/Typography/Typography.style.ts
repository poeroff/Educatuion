import styled from '@emotion/styled';
import { EStyleFontSizes, ETypographyTypes } from '../../../styles/types';
import { Property } from 'csstype';
import handPointing from '../../../assets/icons/HandPointing.svg';

export interface ITypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  styleType?: ETypographyTypes;
  width?: string;
  size?: EStyleFontSizes;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
  color?: Property.Color;
  letterSpacing?: string;
  underlineColor?: string;
  align?: Property.TextAlign;
  weight?: Property.FontWeight;
  textDecoration?: Property.TextDecoration;
  fontStyle?: Property.FontStyle;
  useGap?: boolean;
  usePre?: boolean;
  boxColor?: string;
  type?: 'text' | 'box' | 'blank';
}

const sizeStyles = {
  'x-small': '16px',
  small: '20px',
  'x-medium': '24px',
  medium: '28px',
  large: '40px',
  'x-large': '48px',
};

const lineHeightStyles = {
  'x-small': '24px',
  small: '32px',
  'x-medium': '36px',
  medium: '40px',
  'x-large': '58px',
  large: '62px',
};

namespace StyleTypography {
  export const TextStyled = styled.span<ITypographyProps>`
    position: relative;
    display: inline-block;
    font-size: ${props => (props.fontSize ? props.fontSize : props.size && sizeStyles[props.size || 'medium'])};
    line-height: ${props => (props.lineHeight ? props.lineHeight : props.size && lineHeightStyles[props.size || 'medium'])};
    ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
    ${props => props.fontStyle && `font-style: ${props.fontStyle};`}
    ${props => props.letterSpacing && `letter-spacing: ${props.letterSpacing};`}
    ${props => props.fontFamily && `font-family: ${props.fontFamily};`}
    ${({ width = 'fit-content' }) =>
      `
      width: ${width};
      display: inline-block;
    `}
    ${props => props.align && `text-align: ${props.align};`}
    ${props => props.weight && `font-weight: ${props.weight};`}
    ${({ color }) => color && `color: ${color};`}

    ${({ type, boxColor = '#EB1807' }) =>
      type === 'box'
        ? `
        border: 2px solid ${boxColor};
        border-radius: 8px;
    `
        : type === 'blank'
        ? `
        border-bottom: 2px solid ${boxColor};
    `
        : ''}

    ${props =>
      props.textDecoration &&
      `
      text-decoration: ${props.textDecoration};
      text-decoration-thickness: 2px;
      text-underline-position: under; 
    `}
    padding : ${({ useGap }) => (useGap ? '4px 12px' : 0)};
    ${props => props.usePre && `white-space: pre-line;`}

    ${({ underlineColor }) =>
      underlineColor &&
      `
      border-bottom : 1px solid ${underlineColor};
    `}
  `;

  export const ClickButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 25px;

    border: 1px solid #78aeff;
    border-radius: 8px;

    background: url(${handPointing}) center center no-repeat;
    background-size: auto 26px;
    background-color: #d9e8ff;
    z-index: 1;
  `;
}

export default StyleTypography;
