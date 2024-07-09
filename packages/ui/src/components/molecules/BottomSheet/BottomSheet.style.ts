import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { SvgIcon } from '@maidt-cntn/ui';

const fadeIn = keyframes`
  from {
    opacity: 0;
    height: 0;
    
  }
  to {
    opacity: 1;
    height: 10%;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    height: 10%;
    
  }
  to {
    opacity: 0;
    height: 0;
  }
`;

export const BottomSheetContainer = styled.div<{ show: boolean; height: number | string }>`
  ${({ show, height }) => css`
    animation: ${show ? fadeIn : fadeOut} 0.3s;
    animation-fill-mode: forwards;
    height: ${show ? (typeof height === 'number' ? `${height}px` : height) : '0'};
  `};
  align-items: center;
`;

export const StyledSvg = styled(SvgIcon)`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 15px;
  cursor: pointer;
`;

export const ChildrenContainer = styled.div<{ marginTop: number }>`
  ${({ marginTop }) => css`
    margin-top: ${marginTop}px;
  `};
  width: 100%;
  height: fit-content;
  padding-bottom: 30px !important;
`;
