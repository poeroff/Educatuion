import styled from '@emotion/styled';
import { Property } from 'csstype';

export interface IMContainerStyle {}

namespace StyleMContainer {
  export const Content = styled.div<{
    vAlign?: Property.AlignContent;
    useExtend?: boolean;
    isScroll?: boolean;
    cardType?: 'problem' | 'mainText';
  }>`
    flex: 1;
    padding-top: ${({ useExtend, cardType }) => (useExtend ? '0' : cardType === 'mainText' ? '48px' : '30px')};
    padding-left: ${({ useExtend }) => (useExtend ? '0' : '40px')};
    padding-right: ${({ useExtend, isScroll }) => (useExtend ? '0' : isScroll ? '24px' : '32px')};
    display: flex;
    flex-direction: column;
    font-size: 28px;
    font-weight: var(--font-weight-medium);
    position: relative;

    ${({ vAlign }) =>
      vAlign &&
      `
        justify-content: ${vAlign};
    `}
  `;

  export const Title = styled.h3`
    width: 100%;
    padding-top: 12px;
  `;

  export const SubmitBtn = styled.div`
    position: absolute;
    right: 40px;
    bottom: 8px;

    button + * {
      margin-left: 8px;
    }
  `;

  export const AudioWrapper = styled.div`
    display: flex;
  `;

  export const HeaderWrapper = styled.div`
    display: flex;
    position: relative;
  `;

  export const Background = styled.div<{
    background?: string;
    useRound?: boolean;
  }>`
    position: absolute;
    z-index: -1;
    top: 36px;
    left: 24px;
    right: 24px;
    bottom: 48px;

    ${({ background }) =>
      background &&
      `
        background: ${background};
        padding: 10px;
    `}

    ${({ useRound }) =>
      useRound &&
      `
        border-radius: 20px;
    `}
  `;

  export const Mark = styled.div`
    position: absolute;
    right: 0;

    gap: 6px;
    display: flex;
    padding: 6px 0 10px 0;
    align-items: center;

    font-family: SUIT;
    font-weight: 700;
  `;

  export const MarkIcon = styled.div`
    width: 69px;
    height: 28px;
    border: 2px solid var(--color-yellow-500);
    border-radius: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 16px;
    color: var(--color-yellow-700);
  `;

  export const MarkText = styled.div`
    font-size: 18px;
    line-height: 32px;
  `;
}

export default StyleMContainer;
