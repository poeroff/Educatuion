import styled from '@emotion/styled';

export namespace StyleStopWatch {
  export const Time = styled.p`
    display: flex;
    align-items: center;
    font-family: 'SUIT';
    font-weight: var(--font-weight-bold);
    font-size: 48px;
    line-height: 40px;
    height: 48px;
    color: var(--color-grey-900);
    cursor: default;
    text-align: center;
    span {
      width: 62px;
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

export default StyleStopWatch;
