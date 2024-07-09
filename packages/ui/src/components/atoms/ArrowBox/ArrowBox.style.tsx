import styled from '@emotion/styled';

export type TArrowType = 'arrow' | 'line-arrow' | 'none';

export interface IStyleArrowBox {
  size?: number;
  height?: number;
  width?: number;
  left?: number;
  right?: number;
  top?: number;
  arrowColor?: string;
  useTail?: boolean;
  tailType?: TArrowType;
  direction?: 'up' | 'down';
  rotate?: number;
  arrowWeight?: number;
}

namespace StyleArrowBox {
  export const Wrap = styled.div`
    position: relative;
  `;

  export const ArrowWrap = styled.span<IStyleArrowBox>`
    position: absolute;
    left: ${({ left = 0 }) => left}px;
    top: ${({ top = 0 }) => top}px;
    display: flex;

    ${({ width, height }) =>
      `
        width: ${width}px;
        height: ${height}px;
    `};

    ${({ direction }) =>
      direction == 'up' &&
      `
      transform: rotate(180deg);
    `}
  `;

  export const ArrowSingleWrap = styled.span<{ rotate?: number; width?: number; height?: number; left?: number; top?: number }>`
    position: relative;
    display: inline-flex;
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    ${({ rotate }) => rotate && `transform: rotate(${rotate}deg);`}
    align-items: center;
    justify-content: center;
    left: ${({ left = 0 }) => left}px;
    top: ${({ top = 0 }) => top}px;
  `;

  export const Arrow = styled.span<IStyleArrowBox>`
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: -5px;
      width: 0;
      height: 0;
      ${({ arrowColor = '#E54D90', size = 7 }) => `border-bottom: ${size}px solid ${arrowColor};`}
      ${({ size = 7 }) => `border-top: ${size}px solid transparent;`}
      ${({ size = 7 }) => `border-left: ${size - 3}px solid transparent;`}
      ${({ size = 7 }) => `border-right: ${size - 3}px solid transparent;`}
      ${({ size = 7 }) => ` margin-top: -${size}px;`}

      ${({ tailType, arrowColor, size = 7, arrowWeight = 1 }) =>
        tailType === 'line-arrow' &&
        `
        width: ${size}px;
        height: ${size}px;
        margin-top: 0;
        border: 0;
        border-top: ${arrowWeight}px solid ${arrowColor};
        border-right: ${arrowWeight}px solid ${arrowColor};
        transform: rotate(-45deg)
      `}

      ${({ tailType }) =>
        tailType === 'none' &&
        `
          border: 0; 
      `}
    }
  `;

  export const ArrowLeft = styled(Arrow)`
    position: relative;
    height: ${({ height }) => `${height}px`};
    width: 10px;
    margin-left: 5px;

    ${({ arrowColor = '#E54D90', arrowWeight = 1 }) => `
        border-left: ${arrowWeight}px solid ${arrowColor};
    `}

    ${({ useTail, arrowColor = '#E54D90', arrowWeight = 1 }) =>
      useTail &&
      `
      border-bottom: ${arrowWeight}px solid ${arrowColor};
      border-bottom-left-radius: 5px;
    `}

    &:before {
      left: -5px;
    }
  `;

  export const ArrowRight = styled(Arrow)`
    position: relative;
    height: ${({ height }) => `${height}px`};
    width: 10px;
    margin-right: 5px;

    ${({ arrowColor = '#E54D90', arrowWeight = 1 }) => `
        border-right: ${arrowWeight}px solid ${arrowColor};
    `}

    ${({ useTail, arrowColor = '#E54D90', arrowWeight = 1 }) =>
      useTail &&
      `
      border-bottom: ${arrowWeight}px solid ${arrowColor};
      border-bottom-right-radius: 5px;
    `}

    &:before {
      right: -5px;
    }
  `;

  export const ArrowCenter = styled.span<IStyleArrowBox>`
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: center;
    border-bottom: ${({ arrowColor = '#E54D90', arrowWeight = 1 }) => `${arrowWeight}px solid ${arrowColor}`};
  `;

  export const ArrowCenterText = styled.span<IStyleArrowBox>`
    padding: 0 7px;
    font-size: 24px;
    line-height: 20px;
    font-weight: var(--font-weight-semiBold);
    color: var(--color-grey-900);
    background: transparent;
    margin-bottom: -35px;
    ${({ direction }) =>
      direction == 'up' &&
      `
      transform: rotate(180deg);
    `}
  `;
}
export default StyleArrowBox;
