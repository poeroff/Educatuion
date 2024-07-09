import { EStampType } from '@maidt-cntn/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

namespace StyleStamp {
  export const StampContainer = styled.div<{ isClicked: boolean; stampType: EStampType; height?: string; width?: string }>`
    ${({ stampType }) =>
      stampType !== EStampType.O && stampType !== EStampType.X
        ? css`
            width: 212px;
            height: 200px;
            padding: 24px 0 16px 0;
          `
        : css`
            width: 188px;
            height: 188px;
          `}

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 8px;
    border: 2px solid ${({ isClicked }) => (isClicked ? 'var(--color-yellow-800)' : 'var(--color-yellow-50)')};

    background-color: ${({ isClicked }) => (isClicked ? 'var(--color-yellow-400)' : 'var(--color-yellow-50)')};

    ${({ height }) => height && `height : ${height}`};
    ${({ width }) => width && `width : ${width}`};

    > p {
      margin-top: 12px;
      line-height: 44px;
    }
  `;
}

export default StyleStamp;
