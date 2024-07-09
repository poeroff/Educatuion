import { css } from '@emotion/react';
import styled from '@emotion/styled';

type TPlace = 'left' | 'right' | 'bottom' | 'top';

export interface IStyleBalloon {
  backgroundColor?: string;
  isShadow?: boolean;
  place?: TPlace;
  whiteSpace?: boolean;
}

namespace StyleBalloon {
  export const Container = styled.div<IStyleBalloon>`
    position: relative;

    width: fit-content;
    padding: 12px 24px;
    border-radius: 24px;
    background-color: ${({ backgroundColor }) => backgroundColor && backgroundColor};
    box-shadow: ${({ isShadow }) => isShadow && '0px 4px 16px 0px #47494D3D'};

    white-space: ${({ whiteSpace }) => (whiteSpace ? 'nowrap' : 'nomal')};

    &::after {
      content: '';
      position: absolute;

      display: inline-block;

      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 20px solid ${({ backgroundColor }) => backgroundColor && backgroundColor};

      ${({ place }) => {
        switch (place) {
          case 'top':
            return css`
              transform: rotate(-180deg);
              top: -15px;
              right: 50%;
            `;
          case 'bottom':
            return css`
              bottom: -15px;
              right: 50%;
            `;
          case 'left':
            return css`
              top: 50%;
              left: -18px;
              transform: translateY(-50%) rotate(90deg);
            `;
          case 'right':
            return css`
              top: 50%;
              right: -18px;
              transform: translateY(-50%) rotate(-90deg);
            `;
        }
      }}
    }
  `;
}

export default StyleBalloon;
