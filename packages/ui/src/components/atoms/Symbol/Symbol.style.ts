import styled from '@emotion/styled';

export type blankType = 'circle' | 'square';

export namespace SymbolStyle {
  export const Wrap = styled.span<{ size?: number }>`
    display: inline-flex;
    width: ${({ size = 32 }) => size}px;
    height: ${({ size = 32 }) => size}px;
  `;

  export const Symbol = styled.img<{ size?: number }>`
    width: ${({ size = 32 }) => size}px;
    height: ${({ size = 32 }) => size}px;
  `;

  export const Blank = styled.span<{ type?: blankType; size?: number; borderColor?: string; borderWidth?: number }>`
    display: inline-block;
    width: ${({ size = 48 }) => size}px;
    height: ${({ size = 48 }) => size}px;
    border: ${({ borderColor = '#8d9299', borderWidth = 1 }) => `${borderWidth}px solid ${borderColor}`};
    border-radius: 8px;
    background: #f8f8f8;

    ${({ type }) =>
      type === 'circle' &&
      `
    border-radius: 50px;
  `}
    vertical-align: middle;
  `;
}

export default SymbolStyle;
