import styled from '@emotion/styled';
import { Property } from 'csstype';

export interface IContainerStyle {}

namespace StyleDialogContainer {
  export const Wrap = styled.div`
    position: relative;
    height: 450px;
  `;

  export const Content = styled.div<{
    vAlign?: Property.AlignContent;
    width?: number | undefined;
  }>`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 28px;
    font-weight: var(--font-weight-medium);
    position: relative;
    padding: 10px 20px;

    ${({ width }) =>
      width &&
      `
        width: ${width}px;
    `};

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

  export const HeaderWrapper = styled.div`
    display: flex;
    position: relative;
  `;

  export const SubmitBtn = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
  `;
}

export default StyleDialogContainer;
