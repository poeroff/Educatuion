import styled from '@emotion/styled';
import { IToggleProps } from './Toggle';

export interface IToggleWrapperProps extends IToggleProps {
  clicked: boolean;
}

namespace StyleToggle {
  export const Container = styled.div`
    display: inline-block;
    position: relative;
    cursor: pointer;
  `;

  export const Wrapper = styled.div<IToggleWrapperProps>`
  padding: 2%;
  position: relative;
  width: ${({ size = '32px' }) => parseInt(size) * 2}px;
  height: ${({ size = '32px' }) => parseInt(size)}px;
  border-radius: ${({ size = '32px' }) => parseInt(size) / 2 + 12}px;
  background-color: #EFF0F2;
  border: ${({ disabled }) => (disabled ? '1px solid #C0C5CC' : '1px solid #8D9299')};
  transition: all 0.2s ease;
  &.clicked
      {
        background-color: #ffffff;
        border: ${({ disabled }) => (disabled ? '1px solid #4B93FF' : '1px solid #1E78FF')};
      }
    }
`;

  export const CircleWrapper = styled.div<IToggleWrapperProps>`
    position: absolute;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
    right: ${({ size = '32px' }) => parseInt(size)}px;
    width: ${({ size = '32px' }) => parseInt(size) - 2}px;
    height: ${({ size = '32px' }) => parseInt(size) - 2}px;
    border-radius: 50%;

    background-color: ${({ disabled }) => (disabled ? '#8D9299' : '#6A6D73')};
    transition: all 0.25s ease;
    &.clicked {
      right: 2px;
      background-color: ${({ disabled }) => (disabled ? '#1E78FF' : '#1860CC')};
    }
  `;
}

export default StyleToggle;
