import styled from '@emotion/styled';

export interface IStyleImage {
  size?: string;
  height?: string;
  width?: string;
  altText?: string;
}

namespace StyleImage {
  export const StyledImg = styled.img<IStyleImage>`
    ${({ size, width }) =>
      !!(size || width) &&
      `
        width: ${size || width};
    `}
    ${({ size, height }) =>
      !!(size || height) &&
      `
        height: ${size || height};
    `}
  `;

  export const EmptyBox = styled.div<{ size?: string; width?: string; height?: string }>`
    ${({ size, width }) =>
      size || width
        ? `
        width: ${size || width};
        `
        : `
         width: inherit;
    `}
    ${({ size, height }) =>
      !(size || height)
        ? `
        height: ${size || height};
        `
        : `
        height: inherit;
    `}
  `;

  export const StyleImgBg = styled.div<{ backgroundSrc?: string } & IStyleImage>`
    ${({ size, width }) =>
      !!(size || width) &&
      `
      width: ${size || width};
    `}
    ${({ size, height }) =>
      !!(size || height) &&
      `
      height: ${size || height};
    `}
    background: url(${({ backgroundSrc }) => `"${backgroundSrc}"`}) center / 100% 100% no-repeat;
  `;
}
export default StyleImage;
