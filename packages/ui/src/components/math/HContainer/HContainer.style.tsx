import styled from '@emotion/styled';
import { Property } from 'csstype';

export interface IHContainerStyle {}

namespace StyleHContainer {
  export const Content = styled.div<{
    topHeight?: number;
    useExtend?: boolean;
    vAlign?: Property.AlignContent;
  }>`
    flex: 1;
    height: 100%;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    font-size: 28px;
    position: relative;

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
    padding: 3px 12px;
  `;

  export const SubTitleWrap = styled.div`
    position: absolute;
    right: 0;
    top: 0;
  `;

  export const SubTitle = styled.span`
    display: inline-flex;
    align-items: center;
    position: relative;
    flex: 1;

    & + * {
      margin-left: 8px;
      padding-left: 8px;

      &:before {
        content: '';
        position: absolute;
        display: inline-block;
        width: 1px;
        height: 12px;
        background: #afb4db;
        left: 0;
        top: 50%;
        margin-top: -6px;
      }
    }
  `;

  export const SubTitleText = styled.span`
    display: inline-block;
    font-size: 16px;
    line-height: 24px;
    color: #646db4;
    margin-left: 4px;
  `;

  export const Predicate = styled.span`
    display: inline-block;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: #6a6d73;

    & + * {
      margin-left: 16px;
    }
  `;

  export const PredicateText = styled.span`
    display: inline-block;
    padding: 4px 12px;
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

  export const HeaderWrapper = styled.div<{ minHeight?: number }>`
    display: flex;
    position: relative;
    ${({ minHeight }) => minHeight && `min-height: ${minHeight}px;`}
  `;
}

export default StyleHContainer;
