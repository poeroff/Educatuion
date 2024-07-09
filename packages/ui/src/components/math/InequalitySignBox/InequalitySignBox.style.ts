import styled from '@emotion/styled';
import { TInequalitySignBox, IInequalitySignType } from '..';

namespace StyleInequalitySignBox {
  export const Container = styled.div<{ type?: IInequalitySignType; size?: TInequalitySignBox; isError?: boolean }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 5px 16px;

    width: ${({ type }) => (type === 'single' ? 'auto' : '100%')};
    height: 62px;

    border-radius: 8px;

    ${({ isError }) => (isError ? `border: 2px solid #EB1807; background-color: #FFF4F3; color: #EB1807;` : `background-color: #f8f8f8;`)}
    ${({ type }) => type === 'single' && `background-color: #fff;`};

    > p {
      display: inline-block;
      width: 100%;
      padding: 12px;
      text-align: center;
      font-weight: var(--font-weight-medium);
    }

    > button {
      min-width: 48px;
      min-height: 48px;
    }

    ${({ size }) =>
      size === 'large' &&
      `
      padding: 6px 16px;
      height: 84px;

      > p {
        font-weight: var(--font-weight-bold);
      }

      > button {
        min-width: 48px;
        min-height: 48px;
      }
      `}
  `;
}

export default StyleInequalitySignBox;
