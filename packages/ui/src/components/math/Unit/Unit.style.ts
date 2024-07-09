import styled from '@emotion/styled';
import { IWAI } from '@emotion/react';

export type TUnit = 'degree' | 'none';

export interface IStyleUnit extends IWAI {
  width?: number;
  height?: number;
}

namespace StyleUnit {
  export const Degree = styled.span<{ height?: number }>`
    display: inline-block;
    width: 8px;
    height: inherit;
    font-size: 20px;
    vertical-align: top;
    margin-top: -3px;

    ${({ height }) => height && `height: ${height}px;`}
  `;
}

export default StyleUnit;
