import styled from '@emotion/styled';
import { Button } from '../../atoms/Button/Button';
import { TShadowedType } from '@/type/ShadowedButton/ShadowedButtonType';
import { EStyleShadowedButtonTypes } from '../../../styles/types';

export interface IStyledShadowedButtonProps {
  type?: TShadowedType;
  state?: EStyleShadowedButtonTypes;
  contentLength?: number;
  maxWordLength?: number;
  fontSize?: string;
  tabIndex?: number;
  width?: string;
  height?: string;
  backgroundImage?: string;
}

namespace StyledShadowedButton {
  export const Btn = styled(Button)<IStyledShadowedButtonProps>`
    position: relative;
    align-items: center;

    border: 1px solid #d0d3d9;

    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || '60px'};
    padding: 10px 15px;

    ${({ state, backgroundImage }) => {
      switch (state) {
        case EStyleShadowedButtonTypes.WARNING:
          return `border-width: 3px !important;
          &::before {
            border-color: #eb1807;
            background: url(${`"${backgroundImage}"`}) center center no-repeat;
            content: '';
            display: inline-block;
            width: 24px;
            height: 24px;

            position: absolute;
            top: -12px;
            right: -12px;

            border-radius: 50%;

            border-width: 2px;
            border-style: solid;
            background-color: ${'var(--color-white)'};
          }
          `;
        case EStyleShadowedButtonTypes.SUCCESS:
          return `border-width: 3px !important;
          &::before {
            border-color: #70c954;
            background: url(${`"${backgroundImage}"`}) center center no-repeat;
            content: '';
            display: inline-block;
            width: 24px;
            height: 24px;

            position: absolute;
            top: -12px;
            right: -12px;

            border-radius: 50%;

            border-width: 2px;
            border-style: solid;
            background-color: ${'var(--color-white)'};
          }
          `;
      }
    }}

    font-size: ${({ maxWordLength, contentLength, fontSize }) =>
      maxWordLength && contentLength
        ? `calc(${fontSize} * ${maxWordLength} / ${contentLength < maxWordLength ? maxWordLength : contentLength}) !important`
        : ''};
  `;

  export const Svg = styled.span`
    display: inline-block;
    position: absolute;
    top: -5px;
    right: -5px;
    width: 24px;
    height: 24px;
  `;

  export const Box = styled.div<IStyledShadowedButtonProps>`
    padding: 12px;
    flex-direction: column;
    align-items: start;
    border: 2px solid ${'var(--color-white)'};
  `;
}

export default StyledShadowedButton;
