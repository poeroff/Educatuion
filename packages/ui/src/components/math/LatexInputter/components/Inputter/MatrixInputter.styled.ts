import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

export const Input = styled.input<{ $warning: boolean }>`
  width: 55px;
  height: 43px;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  font-family: var(--font-SUIT);
  text-align: center;

  ${props =>
    props.$warning === true
      ? css`
          color: #c11d00;
          background-color: #fff4f3;
          :focus {
            outline: 2px solid #eb1807;
          }
        `
      : css`
          border: 1px solid #8d9299;
          background-color: white;
          :focus {
            outline: 2px solid -webkit-focus-ring-color;
          }
        `}
  border-radius: 8px;
`;

export const ErrorMessage = styled.div`
  font-family: var(--font-SUIT);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;

  color: #c11d00;
`;

export const SubmitButton = styled.div<{ $disabled: boolean }>`
  width: 153px;
  height: 40px;
  padding: 6px 16px;
  border-radius: 24px;
  font-family: var(--font-SUIT);
  font-size: 16px;
  font-weight: 700;
  line-height: 28px;
  text-align: center;
  ${props =>
    props.$disabled
      ? css`
          background-color: #eff0f2;
          color: #c0c5cc;
        `
      : css`
          background-color: #1e6efa;

          color: #f8f8f8;
        `}
`;
