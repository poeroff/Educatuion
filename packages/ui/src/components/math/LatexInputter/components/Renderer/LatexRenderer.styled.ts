import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { AlignType } from '../Inputter/LatexInputter';

import { MathFieldPartStyle } from '../Inputter/LatexInputter.styled';

export const Renderer = styled.div<{ $fontSize: number; $align: AlignType }>`
  ${props =>
    css`
      ${MathFieldPartStyle(props.$fontSize, props.$align)}
    `}

  position: relative;
  overflow: scroll;

  .latex-inputter-renderer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const SubmittedRenderer = styled.div<{ $fontSize: number; $isError: boolean; $align: AlignType }>`
  ${props => css`
    ${MathFieldPartStyle(props.$fontSize, props.$align)}
  `};

  ${props =>
    props.$isError === true &&
    css`
      border: 1px solid #eb1807;
      background-color: #fff5f5;
      math-field {
        color: #eb1807;
        background-color: #fff5f5;
      }
    `};

  overflow: scroll;
`;

export const Wrapper = styled.div<{ $width?: number; $height?: number; $visible: boolean }>`
  width: ${props => (props.$width ? `${props.$width}px` : `100%`)};
  height: ${props => (props.$height ? `${props.$height}px` : `100%`)};
  ${props =>
    props.$visible
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
          width: 0;
          height: 0;
        `};
  overflow: hidden;
  gap: 10px;
`;
