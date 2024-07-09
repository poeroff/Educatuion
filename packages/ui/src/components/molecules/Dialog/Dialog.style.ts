import styled from '@emotion/styled';

import { EStyleIndex } from '../../../styles/types';
import { Property } from 'csstype';

export type TColAlign = Property.AlignContent;
export type TDirection = 'column' | 'row' | 'none';
namespace StyleDialog {
  export const Wrap = styled.div<{ background?: string }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${({ background = 'rgba(0,0,0,0.4)' }) => background};
    z-index: ${EStyleIndex.DIALOG};
  `;

  export const Container = styled.div<{
    width?: number;
    height?: number;
  }>`
    position: relative;
    background: ${'var(--color-white)'};
    ${({ width }) => width && `width: ${width}px;`}
    height : ${({ height }) => (height ? `${height}px` : 'content-fit')};
    padding: 24px 20px;
    border-radius: 16px;
    box-shadow: 0px 4px 16px 0px #47494d3d;
  `;

  export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    min-height: 38px;
  `;

  export const HeaderCloseBtn = styled.button`
    background: var(--color-grey-100);
    border: 1px solid var(--color-grey-500);
    color: var(--color-grey-900);
    border-radius: 70px;
    font-size: 16px;
    min-width: 86px;
    height: 36px;
    padding: 6px 16px;
  `;

  export const Content = styled.div<{ width?: number; footerHeight?: number; headerHeight?: number }>`
    position: relative;
    background: ${'var(--color-white)'};
    height: ${({ footerHeight = 0, headerHeight = 0 }) => `calc(100% - ${footerHeight}px - ${headerHeight}px)`};
    overflow: auto;

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

  export const Footer = styled.div<{
    colHAlign?: TColAlign;
    colVAlign?: TColAlign;
    useFloating?: boolean;
  }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 24px;

    > button {
      min-width: 124px;
      padding: 10px 16px;

      & + * {
        margin-left: 8px;
      }
    }

    ${({ colHAlign }) =>
      colHAlign &&
      `
        align-items: ${colHAlign};
    `}

    ${({ colVAlign }) =>
      colVAlign &&
      `
        justify-content: ${colVAlign};
    `}

    ${({ useFloating }) =>
      useFloating &&
      `
      position: absolute;
      left: 32px;
      right: 32px;
      bottom: 32px;
    `}
  `;
}

export default StyleDialog;
