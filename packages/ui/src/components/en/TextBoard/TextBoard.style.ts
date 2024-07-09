import styled from '@emotion/styled';

export interface IStyleTextBoard {
  color: string;
  width?: string;
}

namespace StyleTextBoard {
  export const Container = styled.div<IStyleTextBoard>`
    width: ${({ width = '100%' }) => width};
    border: 2px solid ${({ color }) => color};
    border-radius: 8px;

    > div:nth-of-type(1) {
      background-color: ${({ color }) => color};
      text-align: center;
      border-radius: 5px 5px 0 0;
    }

    > div:nth-of-type(2) {
      padding: 8px 12px;
    }
  `;
}

export default StyleTextBoard;
