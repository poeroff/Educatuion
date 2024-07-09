import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 0.7px solid #d0d3d9;
  border-radius: 1.4px;

  :focus {
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

export const LatexButton = styled(BaseButton)`
  position: relative;
`;

export const CloseButton = styled(BaseButton)`
  align-self: flex-end;

  width: fit-content;
  background-color: #f8f8f8;
  padding: 4px 20px;
  border-radius: 20px;

  font-size: 16px;
  line-height: 16px;
  color: #6a6d73;
  font-weight: 700;
  font-family: var(--font-SUIT);
`;

export const CapitalButton = styled(BaseButton)<{ $largeText: boolean; $clicked: boolean }>`
  background-color: #e2f2ff;

  ${props =>
    props.$largeText
      ? css`
          font-family: scd-Medium;
          font-size: 18px;
        `
      : css`
          font-size: 12px;
          font-family: SUIT;
        `}
  ${props =>
    props.$clicked === true
      ? css`
          color: #fff;
          background-color: #1e6efa;
        `
      : css`
          color: #000;
          background-color: #e2f2ff;
        `}
`;

export const KeypadButton = styled(BaseButton)<{ $clicked: boolean }>`
  &.large {
    border-radius: 100px;
  }

  &.small {
    border-radius: 15px;
  }

  ${props =>
    props.$clicked
      ? css`
          background-color: #1e6efa;
          border-color: #1e6efa;
        `
      : css`
          background-color: #e2f2ff;
        `}
`;

export const DeleteButton = styled(BaseButton)`
  background-color: #f8f8f8;
`;
