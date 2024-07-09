import styled from '@emotion/styled';

namespace StyledDotIndicator {
  export interface IStyledDotIndicatorProps {
    active?: boolean;
    color?: string;
  }

  export const Container = styled.div<IStyledDotIndicatorProps>`
    display: flex;
  `;

  export const Dot = styled.button<IStyledDotIndicatorProps>`
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? 'var(--color-blue-700)' : 'var(--color-grey-400)')};
    ${({ color }) => color && `background-color: ${color};`}
    margin-left: 12px;
    &:first-of-type {
      margin-left: 0;
    }
  `;
}
export default StyledDotIndicator;
