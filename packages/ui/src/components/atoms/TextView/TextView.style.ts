import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ETextViewColor } from '@maidt-cntn/ui';

export type TAlign = 'center' | 'start' | ' end';
export interface ITextViewStyle {
  type?: ETextViewColor;
  isBorder?: boolean;
  height?: string;
  icon?: string;
  padding?: string;
  titleColor?: string;
  borderColor?: string;
}

namespace StyleTextView {
  export const Container = styled.div<ITextViewStyle>`
    position: relative;
    max-width: 100%;
    height: ${({ height }) => height || '100%'};
    padding: ${({ padding }) => padding || '20px 28px'};

    border-radius: 8px;
    text-align: center;

    ${({ isBorder, type, borderColor }) =>
      isBorder &&
      (type === ETextViewColor.LIGHT_YELLOW
        ? `border: 1px solid ${borderColor || 'var(--color-yellow-700)'};`
        : `border: 1px solid ${borderColor || 'var(--color-grey-500)'};`)}
    ${({ type }) => (type === ETextViewColor.DEFAULT ? 'margin-top : 15px' : 'margin-top : 21px')};
  `;

  export const TextViewTitleWrap = styled.div<{ type: ETextViewColor }>`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    ${({ type }) => {
      switch (type) {
        case ETextViewColor.SKYBLUE:
          return css`
            top: -28px;
          `;
        case ETextViewColor.YELLOW:
          return css`
            top: -28px;
          `;
        case ETextViewColor.DEFAULT:
          return css`
            top: -15px;
          `;
        case ETextViewColor.LIGHT_YELLOW:
          return css`
            top: -25px;
            padding: 0px 24px;
            border-radius: 16px;
            background-color: var(--color-yellow-100);

            border-radius: var(--border-radius);
            border: 1px solid var(--color-yellow-700);
          `;
      }
    }}
  `;

  export const Content = styled.div<{ vAlign: TAlign; hAlign: TAlign }>`
    display: flex;
    justify-content: ${({ vAlign }) => vAlign};
    align-items: ${({ hAlign }) => hAlign};
    flex-direction: column;

    height: 100%;
  `;
}

export default StyleTextView;
