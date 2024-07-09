import styled from '@emotion/styled';
import { TType } from '@maidt-cntn/ui';
import { PlacesType } from 'react-tooltip';
import CloudTail from '@maidt-cntn/assets/icons/tooltip_cloud_tail.svg';
import { css } from '@emotion/react';

namespace StyleOverlayTooltip {
  export const CloudTooltip = styled.div<{ place: PlacesType }>`
    position: relative;

    background-color: #fff;

    width: max-content;
    padding: 14px 18px;

    border-radius: 24px;
    border: 2px solid #6b5138;

    color: #5f4f42;
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;

    &::before {
      content: '';
      background: url('${CloudTail}') no-repeat;
      display: inline-block;
      height: 19px;
      width: 30px;

      position: absolute;
      ${({ place }) => {
        switch (place) {
          case 'bottom':
            return css`
              top: -17px;
              left: 50%;
              transform: translateX(-50%) rotate(180deg);
            `;
          case 'top':
            return css`
              bottom: -17px;
              left: 50%;
              transform: translateX(-50%);
            `;
          case 'left':
            return css`
              top: 50%;
              right: -23px;
              transform: translateY(-50%) rotate(-90deg);
            `;
          case 'right':
            return css`
              top: 50%;
              left: -23px;
              transform: translateY(-50%) rotate(90deg);
            `;
        }
      }}
    }
  `;

  export const StyleDiv = styled.div<{
    type: TType;
    fontSize?: string;
    backgroundColor?: string;
    isShadow?: boolean;
    padding?: string;
    borderRadius?: string;
  }>`
    .style {
      border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '8px')};
      transition: none;
      background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'rgba(71, 73, 77, 1)')};
      ${({ isShadow }) => isShadow && 'box-shadow: 0px 4px 16px 0px #47494D3D'};
      ${({ color }) => color && `color: ${color}`};
      padding: ${({ padding }) => (padding ? padding : '16px 20px')};
      ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
      opacity: 1;
      z-index: 999;
    }
  `;

  export const CloseBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 4px;
  `;

  export const CloseButton = styled.button`
    color: var(--color-grey-700);
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-bold);
    line-height: 24px;
    cursor: pointer;
  `;
}

export default StyleOverlayTooltip;
