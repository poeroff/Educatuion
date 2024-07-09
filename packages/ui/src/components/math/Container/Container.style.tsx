import styled from '@emotion/styled';
import { Property } from 'csstype';

export interface IContainerStyle {}

namespace StyleContainer {
  export const Content = styled.div<{
    topHeight?: number;
    useExtend?: boolean;
    vAlign?: Property.AlignContent;
    width?: number | undefined;
  }>`
    flex: 1;
    height: 100%;
    padding: 10px 40px;
    display: flex;
    flex-direction: column;
    font-size: 28px;
    font-weight: var(--font-weight-medium);
    position: relative;
    ${({ width }) =>
      width &&
      `
        width: ${width}px;
    `};
    ${({ useExtend }) =>
      useExtend &&
      `
        padding: 10px 0;
    `}

    ${({ vAlign }) =>
      vAlign &&
      `
        justify-content: ${vAlign};
    `}
  `;

  export const Title = styled.h3`
    width: 100%;
    padding: 3px 24px;
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
}

export default StyleContainer;
