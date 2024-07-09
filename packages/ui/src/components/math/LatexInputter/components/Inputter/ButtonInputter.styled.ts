import styled from '@emotion/styled';

import { css } from '@emotion/react';

const ButtonWrapperWidth = { em: 644, mm: 660, hm: 796 };

const ButtonWrapperLayout = {
  em: css`
    width: ${`${ButtonWrapperWidth.em}px`};
    grid-template-areas:
      'numpad'
      'keypad';
    .latex-inputter-button {
      height: 52px;
      &.small {
        width: 52px;
      }
      &.large {
        width: 108px;
      }
    }
  `,
  mm: css`
    grid-template-areas: 'keypad numpad';
    height: 220px;
    width: ${`${ButtonWrapperWidth.mm}px`};

    .latex-inputter-button {
      height: 44px;
      &.small {
        width: 44px;
      }
      &.large {
        width: 92px;
      }
    }
  `,

  hm: css`
    width: ${`${ButtonWrapperWidth.hm}px`};
    grid-template-areas:
      'numpad'
      'keypad';
    .latex-inputter-button {
      height: 44px;
      &.small {
        width: 44px;
      }
      &.large {
        width: 92px;
      }
    }
  `,
};

export const LatexButtonWrapper = styled.div<{ $visible: boolean; $school: 'em' | 'mm' | 'hm' }>`
  display: ${props => props.$visible === false && 'none'};
  position: absolute;
  width: fit-content;

  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;

  bottom: 0;
  left: ${props => `-${ButtonWrapperWidth[props.$school] / 2}px`};
`;

export const ButtonWrapper = styled.div<{ $school: 'em' | 'mm' | 'hm' }>`
  /* width: 644px; */
  z-index: 10;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0px 3.6px 14.4px 0px #47494d3d;

  overflow: hidden;

  display: grid;
  grid-gap: 12px;
  ${props => ButtonWrapperLayout[props.$school]};
`;
