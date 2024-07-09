import styled from 'styled-components';

export namespace StyleToolDrag {
  export const Boundary = styled.div<{ zIndex: number }>`
    z-index: ${({ zIndex }) => zIndex};
  `;
}

export default StyleToolDrag;
