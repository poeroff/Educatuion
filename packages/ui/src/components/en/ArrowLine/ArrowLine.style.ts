import styled from '@emotion/styled';

interface ISvgProps {
  offsetX: number;
  offsetY: number;
}

export const StyledSvg = styled.svg<ISvgProps>`
  position: fixed;
  top: ${({ offsetY }) => offsetY}px;
  left: ${({ offsetX }) => offsetX}px;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
`;
