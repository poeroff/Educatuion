import styled from '@emotion/styled';

export namespace StyleTimer {
  export const Time = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    font-family: 'SUIT';
    font-weight: var(--font-weight-bold);
    font-size: 48px;
    line-height: 40px;
    color: var(--color-grey-900);
    cursor: default;
    span {
      text-align: center;
      width: 62px;
    }
    input {
      width: 73px;
      height: 48px;
      border-radius: 8px;
      border: 1px solid var(--color-grey-500);
      background-color: var(--color-grey-50);
      font-family: 'SUIT';
      font-weight: var(--font-weight-bold);
      font-size: 48px;
      line-height: 40px;
      text-align: center;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }
  `;

  export const ButtonWrapper = styled.div`
    display: flex;
    gap: 12px;
  `;

  export const Button = styled.button<{ width?: string; borderColor: string; fontColor: string; bgColor: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: ${({ width = '124px' }) => width};
    height: 44px;
    border: 1px solid var(${({ borderColor }) => borderColor});
    border-radius: 24px;
    padding: 10px 0px;
    font-family: 'SUIT';
    font-weight: var(--font-weight-bold);
    font-size: 16px;
    line-height: 24px;
    color: var(${({ fontColor }) => fontColor});
    background-color: var(${({ bgColor }) => bgColor});
  `;
}

export default StyleTimer;
