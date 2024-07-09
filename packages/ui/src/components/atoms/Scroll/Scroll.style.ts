import styled from '@emotion/styled';

export interface IScrollStyle {
  width?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  topHeight?: number;
  paddingRight?: number;
  useScroll?: boolean;
}

namespace StyleScroll {
  export const Container = styled.div<IScrollStyle>`
    ${({ width }) => width && `width: ${width};`}
    ${({ height = '100%' }) => height && `height: ${height};`}
    ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
    ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
    ${({ topHeight }) => topHeight && `max-height: calc(100% - ${topHeight}px);`}
    
    ${({ useScroll }) =>
      useScroll &&
      `
      overflow-x: hidden;
      overflow-y: auto;
    `}
    
    padding-right: ${({ paddingRight = 10 }) => paddingRight}px;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar:horizontal {
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      width: 5px;

      background-color: var(--color-grey-500);
      border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--color-grey-100);
      background-clip: padding-box;
      border-radius: 6px;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;
    }

    &::-webkit-scrollbar-track:horizontal {
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;
    }
  `;
}

export default StyleScroll;
