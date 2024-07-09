import styled from '@emotion/styled';
import { ITextViewStyle } from '../TextView/TextView.style';
import { css } from '@emotion/react';
import { ETextViewColor } from '@maidt-cntn/ui';

namespace StyleTextViewStyle {
  export const Title = styled.div<ITextViewStyle>`
    text-align: center;

    width: fit-content;
    height: fit-content;
    white-space: nowrap;

    ${({ type, titleColor }) => {
      switch (type) {
        case ETextViewColor.SKYBLUE:
          return css`
            padding: 8px 24px;
            border-radius: 16px;
            background-color: var(--color-blue-200);

            color: var(--color-blue-700);
            font-size: var(--font-size-24);
            font-weight: var(--font-weight-bold);
            line-height: 26px;
          `;
        case ETextViewColor.YELLOW:
          return css`
            padding: 8px 24px;
            border-radius: 16px;
            background-color: var(--color-yellow-300);

            color: var(--color-grey-900);
            font-size: var(--font-size-24);
            font-weight: var(--font-weight-bold);
            line-height: 26px;
          `;
        case ETextViewColor.DEFAULT:
          return css`
            border-radius: 12px;
            background-color: ${titleColor || 'var(--color-grey-700)'};

            color: var(--color-white);
            padding: 0 16px;
            font-size: var(--font-size-18);
            font-weight: var(--font-weight-bold);
            line-height: 28px;
          `;
        case ETextViewColor.LIGHT_YELLOW:
          return css`
            padding: 8px 24px;
            border-radius: 16px;
            background-color: var(--color-yellow-100);

            color: var(--color-yellow-700);
            font-size: var(--font-size-24);
            font-weight: var(--font-weight-bold);
            line-height: 26px;
          `;
      }
    }}

    ${({ icon }) =>
      icon &&
      css`
        &::before {
          content: '';
          display: inline-block;
          vertical-align: -5px;
          margin-right: 8px;
          width: 26px;
          height: 26px;
          background: url(${'"' + icon + '"'}) center no-repeat;
        }
      `}
  `;
}

export default StyleTextViewStyle;
