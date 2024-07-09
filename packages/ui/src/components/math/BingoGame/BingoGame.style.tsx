import styled from 'styled-components';

namespace StyleBingo {
  export const StarWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > span + span {
      margin-left: 4px;
    }
  `;

  export const BingoWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);

    height: calc(100% - 42px);

    border-radius: 8px;
    border: 1px solid var(--color-h-math-yellow-strong);

    > button {
      &:first-of-type {
        border-radius: 7px 0 0 0;
      }

      &:nth-of-type(3) {
        border-radius: 0 7px 0 0;
      }

      &:nth-of-type(7) {
        border-radius: 0 0 0 7px;
      }

      &:last-of-type {
        border-radius: 0 0 7px 0;
      }
    }
  `;

  export const BingoBox = styled.button<{ backgroundColor: string }>`
    display: flex;
    align-items: center;
    justify-content: center;

    border: 0.5px solid var(--color-h-math-yellow-strong);
    background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'var(--color-h-math-yellow-normal)')};
  `;
}

export default StyleBingo;
