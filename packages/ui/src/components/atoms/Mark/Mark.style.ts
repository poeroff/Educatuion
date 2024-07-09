import { TMarkSize, TMarkType } from '@/type/Question/QuestionType';
import styled from '@emotion/styled';

export interface IMarkStyle extends React.HTMLAttributes<HTMLSpanElement> {
  type?: TMarkType;
  size?: TMarkSize;
  width?: string;
  height?: string;
  src?: string;
}

namespace StyleMark {
  export const Mark = styled.div<IMarkStyle>`
    position: relative;
    display: inline-flex;
    justify-content: start;

    ${({ size }) =>
      (size === 'large' &&
        `
        position: absolute;
        top : 50%;
        left : 50%;
        transform : translate(-50%, -50%);
        justify-content: center;
        align-items: center;
    `) ||
      `
        align-items: start;
    `}
    z-index: 5;
  `;

  export const Icon = styled.img<{ margin?: string } & IMarkStyle>`
    position: absolute;
    display: inline-block;
    ${({ margin }) => margin && `margin: ${margin};`}

    ${({ src }) =>
      src &&
      `
        background: url('${src}') no-repeat center center;
        background-size: 100%;
    `}

    ${({ size }) =>
      size &&
      `
        width: ${labelSize[size]}px;
        height: ${labelSize[size]}px;
        ${size === 'middle' && `transform : translate(-${Math.floor(labelSize[size] / 3)}px, 0);`}
    `}

    ${({ width }) => width && `width: ${width}px;`}
    ${({ height }) => height && `height: ${height}px;`}
  `;
}

const labelSize = {
  small: 50,
  middle: 100,
  large: 200,
};

export default StyleMark;
