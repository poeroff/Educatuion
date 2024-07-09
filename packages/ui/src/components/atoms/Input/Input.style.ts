import { Property } from 'csstype';
import styled from '@emotion/styled';
import { InputStatus } from '@/type/Input/InputType';
import { IWAI } from '@emotion/react';
import handPointing from '../../../assets/icons/HandPointing.svg';

export type TInputSize = 'x-small' | 'small' | 'medium' | 'large';

export interface IStyleInput extends IWAI {
  status?: InputStatus;
  inputSize?: TInputSize;
  width?: string;
  height?: string;
  minWidth?: string;
  marginLeft?: number;
  textAlign?: Property.TextAlign;
}

namespace StyleInput {
  export const Input = styled.input<IStyleInput>`
    &[type='button'] {
      cursor: pointer;
    }

    text-overflow: ellipsis;
    :focus {
      background-color: var(--color-blue-50);
      outline: 0;
      border: 2px solid #1e6efa;
      padding: 5px 11px;
      color: var(--color-grey-900);
    }

    ${({ status }) => {
      switch (status) {
        case 'enable':
          return `
            background-color: var(--color-white);
            border: 1px solid var(--color-grey-600);
          `;
        case 'correct':
          return `
            background-color: #E5F4EA;
            border: 1px solid #058943;
            color : #007637;
          `;
        case 'error':
          return `
            background-color: #FFF4F3;
            border: 1px solid #EB1807;
            color : var(--color-red-800);
          `;
        case 'default':
        default:
          return `
            background-color: #f8f8f8;
            border: 1px solid var(--color-grey-600);
            color: var(--color-grey-700);
            font-weight: var(--font-weight-medium);
          `;
      }
    }}
    border-radius: 8px;

    padding: 6px 12px;
    ${({ inputSize }) => {
      switch (inputSize) {
        case 'x-small':
          return `
            height: 48px;
            font-size: var(--font-size-24);
            line-height: 36px;
          `;
        case 'small':
          return `
            height: 52px;
            font-size: var(--font-size-28);
            line-height: 40px;
          `;
        case 'medium':
          return `
            height: 58px;
            font-size:  var(--font-size-32);
            line-height: 42px;
            padding: 8px 12px;
          `;
        case 'large':
          return `
            height: 70px;
            font-size: var(--font-size-36);
            line-height: 58px;
          `;
        default:
          return '';
      }
    }}

    width: ${({ width }) => width || '200px'};
    ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
    ${({ height }) => height && `height: ${height};`}

    ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
    ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}px;`}
  `;

  export const InputViewer = styled(Input)`
    background: var(--color-white);
    color: var(--color-red-800);

    ${({ width }) => width && `width: ${width};`}
    ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
    ${({ height }) => height && `height: ${height};`}
  `;

  export const StickBtnWrap = styled.div<{ width?: string; height?: string; minWidth?: string }>`
    position: relative;
    display: inline-flex;
    width: fit-content;
    min-width: 50px;
    height: 50px;
    align-items: center;
    margin: 0 5px;
    ${({ width }) => width && `width: ${width};`}
    ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
    ${({ height }) => height && `height: ${height};`}
  `;

  export const StickButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 50px;
    margin: 0 auto;
    border: 1px solid #78aeff;
    border-radius: 8px;

    background: url(${handPointing}) center center no-repeat;
    background-size: auto 26px;
    background-color: #d9e8ff;
    z-index: 1;
  `;

  export const StickText = styled.div`
    display: inline-flex;
    opacity: 0;
    height: 50px;
  `;
}

export default StyleInput;
