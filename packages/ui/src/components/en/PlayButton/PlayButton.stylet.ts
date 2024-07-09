import { css } from '@emotion/react';
import styled from '@emotion/styled';

type TColor = 'skyblue' | 'beige' | 'pink' | 'green' | 'violet';

export interface IStylePlayButton {
  color: TColor;
  disabled?: boolean;
  isActive?: boolean;
}

namespace StylePlayButton {
  export const PlayButton = styled.span<IStylePlayButton>`
    width: 174px;
    height: 48px;
    padding: 4px 0;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px #00000040;

    text-align: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 40px;

    color: ${({ isActive }) => isActive && 'var(--color-white)'};
    background-color: ${({ isActive, color }) =>
      isActive
        ? (() => {
            switch (color) {
              case 'skyblue':
                return 'var(--color-blue-800)';
              case 'beige':
                return 'var(--color-yellow-700)';
              case 'pink':
                return 'var(--color-pink-700)';
              case 'green':
                return 'var(--color-green-800)';
              case 'violet':
                return 'var(--color-violet-600)';
            }
          })()
        : (() => {
            switch (color) {
              case 'skyblue':
                return 'var(--color-blue-100)';
              case 'beige':
                return 'var(--color-yellow-100)';
              case 'pink':
                return 'var(--color-pink-100)';
              case 'green':
                return 'var(--color-green-50)';
              case 'violet':
                return 'var(--color-violet-50)';
            }
          })()};

    ${({ disabled }) =>
      disabled &&
      css`
        color: var(--color-grey-400);
        background-color: var(--color-grey-100);
      `};
  `;
}

export default StylePlayButton;
