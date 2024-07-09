import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const ButtonWrapper = styled.div<{ $layout: string }>`
  grid-area: numpad;
  display: flex;
  gap: 4px;
  ${props =>
    props.$layout === 'flex'
      ? css`
          width: 100%;
        `
      : css`
          height: fit-content;
          width: 140px;
          flex-wrap: wrap;
        `}
  justify-content: center;
`;
