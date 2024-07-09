import styled from '@emotion/styled';
import { EStyleFontSizes, TStyleHorizontalAlign, TStyleVerticalAlign } from '../../../styles/types';

import bgMathDivide from '../../../assets/bgMathDivide.svg';

export type TTableLayout = 'fixed' | 'auto';
export type TBgColors = 'red' | 'blue' | 'green' | 'none';

const bgColors = {
  red: '#F7CBD0',
  blue: '#BCD7FF',
  green: '#98D3AA',
  none: 'transparent',
};

namespace StyledTable {
  export const Wrap = styled.div<{ width?: number; marginTop?: number; marginLeft?: number }>`
    ${({ width }) => width && `width: ${width}px;`}
    ${({ marginTop }) => marginTop && `margin-top: ${marginTop}px;`}
    ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}px;`}
    box-sizing: border-box;
    position: relative;
  `;

  export const Table = styled.table<{
    tableLayout?: TTableLayout;
    cssStyle?: string;
    useHover?: boolean;
    fontSize?: EStyleFontSizes;
    useMathBorder?: boolean;
  }>`
    width: 100%;
    box-sizing: border-box;
    border-collapse: collapse;
    border-spacing: 0;
    ${({ tableLayout }) =>
      tableLayout &&
      `
			table-layout: ${tableLayout};
		`}

    caption {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      border: 0;
      clip: rect(0 0 0 0);
    }

    ${({ cssStyle }) => cssStyle && cssStyle}

    ${({ useHover }) =>
      useHover &&
      `
      tr:hover {
        background: ${'var(--color-pink-600)'};
      }
    `}

    ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
    ${({ useMathBorder }) =>
      !useMathBorder &&
      `
      th, td {
        border: 0 !important;
      }
    `}
  `;

  export const Caption = styled.caption<{ hidden?: boolean }>`
    ${({ hidden }) =>
      hidden &&
      `
        position:absolute;
        width:1px;
        height:1px;
        padding:0;
        margin:-1px;
        overflow:hidden;
        clip-path:inset(50%);
        border:0;
        clip:rect(0 0 0 0);
      `}
  `;

  export const THead = styled.thead<{ hidden?: boolean }>`
    ${({ hidden }) =>
      hidden &&
      `
        position:absolute;
        width:1px;
        height:1px;
        padding:0;
        margin:-1px;
        overflow:hidden;
        clip-path:inset(50%);
        border:0;
        clip:rect(0 0 0 0);
      `}
  `;
  export const TBody = styled.tbody`
    & th {
      vertical-align: middle;
    }
  `;
  export const TFooter = styled.tfoot`
    & th {
      vertical-align: middle;
    }
  `;
  export const TR = styled.tr<{
    isActive?: boolean;
    isMathSolution?: boolean;
    isDivideExp?: boolean;
    isDivideExpLine?: boolean;
    divideExpGap?: number;
    height?: number;
  }>`
    ${({ isActive }) =>
      isActive &&
      `
        background: ${'var(--color-pink-600)'};
    `}
    ${({ isMathSolution }) =>
      isMathSolution &&
      `
        td {
          color: var(--color-pink-500);
          font-size: 24px;
          border: 0 !important;
        }
    `}
    ${({ isDivideExp, divideExpGap = 50, height = 50 }) =>
      isDivideExp &&
      `
        position: relative;

        &:after {
          content: '';
          display: inline-flex;
          width: -webkit-fill-available;
          height: ${height}px;
          position: absolute;
          left: ${divideExpGap}px;
          top: -1px;
          background: url('${bgMathDivide}') left 0 top 0 no-repeat;
          background-size: auto 100%;
        }
    `}

    ${({ isDivideExpLine, divideExpGap = 50 }) =>
      isDivideExpLine &&
      `
        position: relative;

        &:after {
          content: '';
          display: inline-flex;
          width: -webkit-fill-available;
          height: 35px;
          position: absolute;
          left: ${divideExpGap + 7}px;
          top: -1px;
          border-top: 2px solid var(--color-black)
        }
    `}
  `;
  export const Summary = styled.tr`
    background: ${'var(--color-pink-600)'};
    td {
      font-weight: var(--font-weight-bold);
    }
  `;
  export const TH = styled.th<{
    width?: string;
    height?: string;
    hAlign?: TStyleHorizontalAlign;
    vAlign?: TStyleVerticalAlign;
    required?: boolean;
    fontSize?: EStyleFontSizes;
    fontColor?: string;
    fontWeight?: number;
    bgColor?: string;
  }>`
    ${({ hAlign }) => hAlign && `text-align: ${hAlign} !important;`}
    ${({ vAlign }) => vAlign && `vertical-align: ${vAlign} !important;`}
    ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
    ${({ fontWeight }) => fontWeight && `font-size: ${fontWeight};`}
    box-sizing: border-box;
    white-space: pre-line;
    ${({ required }) =>
      required &&
      `
      color: ${'var(--color-pink-600)'} !important;
    `}
    position: relative;
    ${({ fontColor }) =>
      fontColor &&
      `
      color: ${fontColor} !important;
    `}

    ${({ bgColor }) => bgColor && `background: ${bgColor} !important;`}
    ${({ width }) => width && `width: ${width} !important;`}
    ${({ height }) =>
      height &&
      `
      height: ${height} !important;
      min-height: ${height} !important;
    `}
  `;

  export const TD = styled.td<{
    width?: string;
    height?: string;
    hAlign?: TStyleHorizontalAlign;
    vAlign?: TStyleVerticalAlign;
    required?: boolean;
    fontSize?: EStyleFontSizes;
    fontColor?: string;
    fontWeight?: number;
    bgColor?: string;
  }>`
    ${({ hAlign }) => hAlign && `text-align: ${hAlign} !important;`}
    ${({ vAlign }) => vAlign && `vertical-align: ${vAlign} !important;`}
    ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
    ${({ fontWeight }) => fontWeight && `font-size: ${fontWeight};`}
    box-sizing: border-box;
    white-space: pre-line;
    ${({ required }) =>
      required &&
      `
      color: ${'var(--color-pink-600)'} !important;
    `}
    position: relative;
    ${({ fontColor }) =>
      fontColor &&
      `
      color: ${fontColor};
    `}

    ${({ bgColor }) => bgColor && `background: ${bgColor};`}
    ${({ width }) => width && `width: ${width} !important;`}
    ${({ height }) =>
      height &&
      `
      height: ${height} !important;
      min-height: ${height} !important;
    `}
  `;

  export const BgColor = styled.span<{ color?: TBgColors; index?: number }>`
    position: absolute;
    top: -3px;
    bottom: -3px;
    right: ${({ index = 0 }) => index * 52}px;
    background: ${({ color = 'blue' }) => bgColors[color]};
    z-index: -1;
    display: inline-block;
    width: 52px;
    border-radius: 4px;
  `;

  export const MathCheck = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `;
}

export default StyledTable;
