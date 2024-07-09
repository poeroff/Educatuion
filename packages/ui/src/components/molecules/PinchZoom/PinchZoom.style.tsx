import styled from '@emotion/styled';

namespace StylePinchZoom {
  export const ImageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
  `;

  export const ImageBox = styled.div<{ width?: string; height?: string }>`
    flex: 1;
    width: ${({ width }) => width ?? '100%'};
    height: ${({ height }) => height ?? '100%'};
    object-fit: contain;
  `;
}

export default StylePinchZoom;
