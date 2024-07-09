import styled from '@emotion/styled';

import { EStyleIndex } from '../../../styles/types';

namespace StyleLoadingIndicator {
  export const Wrap = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
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
}

export default StyleLoadingIndicator;
