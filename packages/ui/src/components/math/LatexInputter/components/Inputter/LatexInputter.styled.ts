import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { AlignType } from './LatexInputter';

export const InputFieldStyle = css`
  /* padding: 10px 12px 0px 22px; */
  padding: 0;
  padding-top: 10px;
  padding-left: 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: scroll;
  /* overflow: hidden; */
`;

const alignCSS = {
  start: css`
    margin-left: 0;
  `,
  center: css``,
  end: css`
    margin-right: 0;
  `,
};

export const MathFieldPartStyle = ($fontSize: number, $align: AlignType) => css`
  ${InputFieldStyle};
  math-field {
    font-size: ${`${$fontSize}px`};
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    line-height: 100%;
    /* overflow: visible; */
    ::part(content) {
      overflow: visible;
      width: fit-content;
      margin: 0 auto;
      ${alignCSS[$align]}
    }
    border: none;
    .ML__container {
      background-color: red !important;
    }
    .virtual-keyboard-toggle {
      display: none;
    }

    ::part(menu-toggle) {
      display: none;
    }
    ::part(virtual-keyboard-toggle) {
      display: none;
    }
    :focus-within {
      outline: none;
    }
  }
`;

export const Wrapper = styled.div<{ $width: number; $height: number }>`
  /* z-index: 1; */
  * {
    box-sizing: border-box;
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 10px 10px transparent;
      border: solid 3px transparent;
    }
    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 10px 10px #d1d5db;
      border: solid 3px transparent;
      border-radius: 10px;
    }
  }

  ${props => css`
    width: ${`${props.$width}px`};
    height: ${`${props.$height}px`};
  `}
  gap: 10px;
`;

export const EditorWrapper = styled.div<{ $fontSize: number; $visible: boolean; $align: AlignType }>`
  ${props =>
    props.$visible
      ? css`
          visibility: visible;
          overflow: scroll;
          ${MathFieldPartStyle(props.$fontSize, props.$align)}
        `
      : css`
          visibility: hidden;
          overflow: hidden;
          width: 0;
          height: 0;
        `};
`;

export const DragBoundary = styled.div`
  pointer-events: none;
  overflow: hidden;
  position: fixed;
  width: 1080px;
  /* z-index: 0; */
  height: 610px;
  top: 0;
  left: 0;
`;
