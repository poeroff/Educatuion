import styled from '@emotion/styled';

export namespace DivexplanationStyle {
  export const Container = styled.div`
    width: 350px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    position: relative;
  `;

  export const DivStyle = styled.div`
    padding: 8px 24px;
    background-color: var(--color-white);
    border-radius: 16px;
    display: flex;
    align-items: center;
    white-space: nowrap;
  `;

  export const explContainer = styled.div<{ explanation?: boolean }>`
    ${({ explanation }) =>
      explanation
        ? `
        & > span:nth-of-type(1) {
          bottom: 26px;
          left: 38px;
        }
        & > span:nth-of-type(1)::after {
          content: '';
          display: inline-block;
          width: 42px;
          height: 15px;
          margin-left: 6px;
          margin-bottom: 5px;
          border-right: 2px solid var(--color-grey-700);
          border-bottom: 2px solid var(--color-grey-700);
        }
        & > span:nth-of-type(1)::before {
          content: '';
          display: inline-block;
          width: 42px;
          height: 15px;
          margin-right: 6px;
          margin-bottom: 5px;
          border-left: 2px solid var(--color-grey-700);
          border-bottom: 2px solid var(--color-grey-700);
        }`
        : `
        & > span:nth-of-type(1) {
          
          color: #eb1807;
          bottom: 26px;
          left: -13px;
        }
        & > span:nth-of-type(1)::after {
          content: '';
          display: inline-block;
          width: 35px;
          height: 15px;
          margin-left: 6px;
          margin-bottom: 5px;
          border-right: 2px solid var(--color-grey-700);
          border-bottom: 2px solid var(--color-grey-700);
        }`}

    & > span:nth-of-type(2) {
      color: #eb1807;
      bottom: 1px;
      right: 135px;
    }

    & > span:nth-of-type(2)::after {
      content: '';
      position: absolute;
      bottom: 23px;
      right: 38px;
      height: 27px;
      border-right: 2px solid var(--color-grey-700);
    }

    & > span:nth-of-type(3) {
      color: #eb1807;
      bottom: 26px;
      right: 80px;
    }

    & > span:nth-of-type(3)::before {
      content: '';
      display: inline-block;
      width: 35px;
      height: 15px;
      margin-right: 6px;
      margin-bottom: 5px;
      border-left: 2px solid var(--color-grey-700);
      border-bottom: 2px solid var(--color-grey-700);
    }
  `;

  export const explStyle = styled.span`
    font-size: var(--font-size-20);
    font-weight: var(--font-weight-bold);
    position: absolute;
    > span {
      color: #eb1807;
    }
  `;
}

export default DivexplanationStyle;
