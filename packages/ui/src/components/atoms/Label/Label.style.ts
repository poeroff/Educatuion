import styled from '@emotion/styled';
import icon from '../../../assets/icons/labelIcon.png';
import icSlimWtArrow from '../../../assets/icons/icSlimWtArrow.svg';
import topIcon from '../../../assets/Label/top.svg';
import middleIcon from '../../../assets/Label/middle.svg';
import lowIcon from '../../../assets/Label/low.svg';
import star from '../../../assets/Label/star.svg';

type TLableFontSize = 'xxx-small' | 'xx-small' | 'x-small' | 'medium-small' | 'small' | 'middle' | 'large' | 'number';
type TLableType = 'line' | 'paint' | 'text' | 'icon' | 'math_icon' | 'step' | 'svg' | 'arrow' | 'level' | 'rhombus' | 'star' | 'dot';
type TLabelShape = 'circle' | 'square';

export interface ILabelStyle {
  type?: TLableType;
  shape?: TLabelShape;
  size?: TLableFontSize;
  color?: string;
  background?: string;
  lineColor?: string;
  useShadow?: boolean;
  marginRight?: number;
  marginLeft?: number;
  disabled?: boolean;
  svgWidth?: number;
  svgHeight?: number;
  level?: 'high' | 'middle' | 'low';
  direction?: 'right' | 'down' | 'up' | 'left';
  fontSize?: number;
  lineHeight?: number;
}

namespace StyleLabel {
  export const Wrap = styled.span<ILabelStyle>`
    ${({ background }) => background && `background: ${background};`}
    ${({ color }) => color && `color: ${color};`}
    ${({ marginRight }) => marginRight && `margin-right: ${marginRight}px;`}
    margin-left: ${({ marginLeft }) => (marginLeft ? ` ${marginLeft}px;` : '3px')};
    border-radius: ${({ shape = 'circle' }) => (shape === 'square' ? `5px` : '50px')};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;

    ${({ type }) =>
      type === 'rhombus' &&
      `
      width: 24px;
      height: 24px;
      font-size: var(--font-size-14);
      font-weight: var(--font-weight-extraBold);
      line-height: 24px;
      color : var(--color-white);
      `}
  `;

  export const Label = styled(Wrap)`
    height: ${({ size = 'middle', svgHeight }: ILabelStyle) => svgHeight || gatLabelSize[size]}px;
    min-width: ${({ size = 'middle', svgWidth }: ILabelStyle) => svgWidth || gatLabelSize[size]}px;
    ${({ lineColor }) => lineColor && `border: 1px solid ${lineColor};`}
    ${({ type, lineColor = '#8d9299' }) => type === 'line' && `border: 1px solid ${lineColor};`}
    ${({ useShadow }) => useShadow && `box-shadow: 0px 4px 4px 0px #00000040;`}
    font-size: ${({ size = 'middle', fontSize }) => (fontSize ? fontSize : getFontSize[size])}px;
    ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}px`};

    ${({ type }) =>
      type === 'icon' &&
      `
    color: var(--color-white);
    font-size: 16px;
    font-weight: var(--font-weight-semiBold);
    ::before {
      content:'';
      display: inline-block;
      vertical-align: top;
      width:36px;
      height:36px;
      background: transparent url("${icon}") center no-repeat;
      background-size: cover;
      position:absolute;
      z-index:-1;
    }
    `}

    ${({ type }) =>
      type === 'svg' &&
      `
      width: inherit;
      height: inherit;
    `}

    ${({ type, background }) =>
      type === 'math_icon' &&
      `
      min-width: 24px;
      height: 24px;
      color: #fff;
      font-size: 14px;
      font-weight: var(--font-weight-extraBold);
      background: ${background ? background : 'var(--color-header-blue)'}
    `}
    ${({ disabled = false }) =>
      disabled &&
      `
      opacity: 0.3;
    `}

    ${({ type }) =>
      type === 'step' &&
      `
      font-size: 36px;
      font-weight: var(--font-weight-extraBold);
      line-height: 36px;
      color : #2294B4;

      > span {
        color : #B0B6C0;
      }
    `}
  `;

  export const Step = styled.p`
    color: #2294b4;
    font-size: 24px;
    font-weight: var(--font-weight-semiBold);
    line-height: 36px;
    text-shadow: -1px 0px #d0edf5, 0px 1px #d0edf5, 1px 0px #d0edf5, 0px -1px #d0edf5;

    margin-right: 2px;
  `;

  export const Level = styled(Wrap)`
    width: 15px;
    height: 20px;
    position: absolute;
    left: 0;
    top: 0px;
    ${({ level }) => {
      switch (level) {
        case 'high':
          return `background: url(${topIcon}) center center no-repeat;`;
        case 'middle':
          return `background: url(${middleIcon}) center center no-repeat;`;
        case 'low':
          return `background: url(${lowIcon}) center center no-repeat;`;
      }
    }};
  `;

  export const Arrow = styled(Wrap)`
    width: 20px;
    height: 20px;
    border-radius: 5px;
    position: relative;

    ${({ direction }) => {
      switch (direction) {
        case 'up':
          return `transform: rotate(-135deg);`;
        case 'down':
          return `transform: rotate(45deg);`;
        case 'left':
          return `transform: rotate(135deg);`;
        default:
          return `transform: rotate(-45deg);`;
      }
    }}

    ${({ type }) =>
      type !== 'rhombus'
        ? `
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          background: url('${icSlimWtArrow}') center right no-repeat;
          transform: rotate(45deg);
        }
      `
        : `
        position: absolute;
        z-index: -1;
      `};
  `;

  export const Star = styled.span`
    position: relative;

    ::after {
      content: '';
      background: url(${star}) center center no-repeat;
      position: absolute;
      right: -12px;

      width: 24px;
      height: 24px;
    }
  `;

  export const Dot = styled.span<{ width?: number; height?: number }>`
    position: relative;
    display: inline-block;
    min-width: ${({ width = 10 }) => width}px;
    height: inherit;

    ::before {
      content: '';
      background: #232426;
      display: inline-flex;
      width: ${({ width = 10 }) => width}px;
      height: ${({ height = 10 }) => height}px;
      border-radius: 50px;
      vertical-align: middle;
    }
  `;
}

const getFontSize = {
  'xxx-small': 7,
  'xx-small': 12,
  'x-small': 18,
  'medium-small': 22,
  small: 22,
  middle: 24,
  large: 28,
  number: 28,
};

const gatLabelSize = {
  'xxx-small': 7,
  'xx-small': 12,
  'x-small': 32,
  'medium-small': 36,
  small: 38,
  middle: 38,
  large: 56,
  number: 42,
};

export default StyleLabel;
