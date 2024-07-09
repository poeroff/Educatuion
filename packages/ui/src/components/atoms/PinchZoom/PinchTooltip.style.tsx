import styled from '@emotion/styled';

interface ZoomProps {
  backgroundImage: string;
}

namespace PinchTooltip {
  export const TooltipWrapper = styled.div<{ zIndex?: string }>`
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
    height: 40px;
    z-index: ${({ zIndex }) => zIndex ?? '0'};
  `;

  export const ZoomButton = styled.button<Pick<ZoomProps, 'backgroundImage'>>`
    width: 36px;
    height: 36px;
    margin-left: 8px;
    background: url(${({ backgroundImage }) => `"${backgroundImage}"`}) center no-repeat;
    &:disabled {
      opacity: 0.5;
    }
  `;
}

export default PinchTooltip;
