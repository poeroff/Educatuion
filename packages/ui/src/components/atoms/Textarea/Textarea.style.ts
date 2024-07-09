import { TextareaStatus } from '@/type/textarea/TextareaType';
import { IWAI } from '@emotion/react';
import styled from '@emotion/styled';
import { Property } from 'csstype';

export interface ITextareaStyle extends IWAI {
  status?: TextareaStatus;
  width?: string;
  height?: string;
  textAlign?: Property.TextAlign;
}

namespace StyleTextarea {
  export const Container = styled.div<ITextareaStyle>`
    ${({ width }) => `width: ${width};`}
    ${({ height }) => `height: ${height};`}
    padding : 6px 4px 6px 12px;

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
            font-weight: var(--font-weight-bold);
          `;
      }
    }}
    border-radius: 8px;

    :focus-within {
      background-color: var(--color-blue-50);
      outline: 0;
      border: 2px solid #1e6efa;
      padding: 5px 3px 5px 11px;
      color: var(--color-grey-900);
    }

    :disabled {
      background-color: #f8f8f8;
      color: var(--color-grey-700);
      font-weight: var(--font-weight-bold);
    }
  `;

  export const Textarea = styled.textarea<ITextareaStyle>`
    font-size: 28px;
    line-height: 40px;

    resize: none;
    width: 100%;
    height: 100%;

    padding: 0;
    resize: none;
    border: none;
    background: transparent;

    :focus,
    :focus-visible {
      outline: none;
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      width: 5px;

      background-color: var(--color-grey-500);
      border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--color-grey-100);
      background-clip: padding-box;
      border-radius: 6px;
      border-left: 2px solid transparent;
      border-right: 2px solid transparent;
    }
  `;
}

export default StyleTextarea;
