import styled from '@emotion/styled';

export interface IStyleSvgIcon {
  size?: string;
  height?: string;
  width?: string;
  zIndex?: number;
}

export interface IStyleStyleImgBg extends IStyleSvgIcon {
  backgroundSrc: string;
}

namespace StyleSvgIcon {
  export const StyledImg = styled.img<IStyleSvgIcon>`
    ${({ zIndex }) => zIndex && `z-index: ${zIndex};`}
    ${({ size, width }) =>
      !!(width || size) &&
      `
        width: ${width || size};
    `}
    ${({ size, height }) =>
      !!(height || size) &&
      `
        height: ${height || size};
    `}
  `;

  export const StyleImgBg = styled.span<IStyleStyleImgBg>`
    display: inline-block;
    ${({ size, width }) =>
      !!(width || size) &&
      `
      width: ${width || size};
  `}
    ${({ size, height }) =>
      !!(height || size) &&
      `
      height: ${height || size};
  `}
    background: url(${({ backgroundSrc }) => `"${backgroundSrc}"`}) center center no-repeat;
    background-size: contain;
  `;
}

export default StyleSvgIcon;
