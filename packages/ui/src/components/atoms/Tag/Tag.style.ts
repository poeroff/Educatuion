import styled from '@emotion/styled';
import { ETagLine, ETagPaint } from '../../../type/Tag/TagType';
import { css } from '@emotion/react';

export type TTagType = ETagPaint | ETagLine;

export interface ITagStyle {
  width?: string;
  height?: string;
  fontSize?: string;
  lineHeight?: string;
  type?: TTagType;
  useTypoPadding?: boolean;
  style?: React.CSSProperties;
}

namespace StyleTag {
  export const Container = styled.div<ITagStyle>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${({ useTypoPadding }) => (useTypoPadding ? '4px 12px' : '2px 18px')};

    ${({ width }) => width && `width: ${width}`};
    ${({ height }) => height && `height: ${height}`};
    ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
    ${({ lineHeight = '16px' }) => `line-height: ${lineHeight}`};

    font-weight: var(--font-weight-bold);
    text-align: center;
    word-break: break-word;
    white-space: nowrap;

    border-radius: 40px;
    ${({ type }) => {
      switch (type) {
        case ETagLine.GREEN:
          return css`
            border: var(--color-tag-green-border);
            background-color: var(--color-tag-green-background);
            color: var(--color-tag-green-color);
            line-height: 32px;
            padding: 1px 16px;
          `;
        case ETagLine.BLUE:
          return css`
            border: 2px solid #75c2ff;
            background-color: #f4f8ff;
            color: #37acff;
            line-height: 32px;
          `;
        case ETagLine.YELLOW:
          return css`
            border: 2px solid #ffb400;
            background-color: #fffaef;
            color: #cf8900;
            line-height: 32px;
          `;
        case ETagPaint.PRIMARY:
          return css`
            padding: 4px 32px;
            border-radius: 26px;
            background: ${'var(--color-blue-500)'};
            color: ${'var(--color-white)'};
          `;
        case ETagPaint.DEFAULT:
          return css`
            padding: 4px 32px;
            border-radius: 26px;
            background: ${'var(--color-grey-900)'};
            color: ${'var(--color-white)'};
          `;
        case ETagPaint.YELLOW_PAINT:
          return css`
            padding: 2px 18px;
            border-radius: 16px;
            background-color: #f4a100;
            color: ${'var(--color-white)'};
            font-size: 24px;
            line-height: 30px;
          `;
        case ETagPaint.GREEN_PAINT:
          return css`
            padding: 4px 12px;
            border-radius: 8px;
            background-color: var(--color-h-math-primary-strong);
            color: ${'var(--color-white)'};
            font-size: 14px;
          `;
      }
    }}
  `;
}

export default StyleTag;
