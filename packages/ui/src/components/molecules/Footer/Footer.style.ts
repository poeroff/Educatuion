import styled from '@emotion/styled';

namespace StyleFooter {
  export const FooterContainer = styled.div<{ color: string }>`
    width: 100%;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => (color === 'dark' ? 'var(--color-grey-600)' : 'transparent')};

    * + * {
      margin-left: 16px;
    }

    .divider {
      color: var(--color-grey-500);
      font-family: var(--font-SUIT);
      font-size: var(--font-size-18);
      font-weight: var(--font-weight-bold);
      text-align: center;
      line-height: 28px;
    }
  `;

  export const TextBtn = styled.button<{ isEnd: boolean }>`
    padding: 4px 24px;
    background-color: var(--color-white);
    border-radius: 24px;
    font-family: var(--font-SUIT);
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-bold);
    line-height: 24px;

    &:active {
      background-color: var(--color-grey-50);
      color: var(--color-grey-500);
    }

    &:first-of-type {
      background-color: ${({ isEnd }) => (isEnd ? 'white' : 'var(--color-grey-50)')};
      color: ${({ isEnd }) => (isEnd ? 'var(--color-grey-700)' : 'var(--color-grey-900)')};
    }

    &:last-of-type {
      background-color: ${({ isEnd }) => (isEnd ? 'white' : 'var(--color-grey-50)')};
      color: ${({ isEnd }) => (isEnd ? 'var(--color-grey-700)' : 'var(--color-grey-900)')};
    }
  `;

  export const NumSpan = styled.span<{ color: string }>`
    font-family: var(--font-SUIT);
    font-size: var(--font-size-18);
    font-weight: var(--font-weight-bold);
    line-height: 28px;
    border: none;
    width: 32px;
    height: 32px;
    padding-top: 3px;
    text-align: center;
    border-radius: 70%;
    background-color: ${({ color }) => {
      if (color === 'dark') return 'var(--color-white)';
      if (color === 'yellow') return 'var(--color-yellow-100)';
      return 'var(--color-grey-800)';
    }};

    color: ${({ color }) => {
      if (color === 'dark') return 'var(--color-grey-900)';
      if (color === 'yellow') return 'var(--color-yellow-800)';
      return 'var(--color-white)';
    }};
  `;

  export const NumBtn = styled.button<{ isSelected: boolean; color: string }>`
    font-family: var(--font-SUIT);
    font-size: var(--font-size-18);
    font-weight: var(--font-weight-bold);
    line-height: 28px;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 70%;
    background-color: ${({ isSelected, color }) => {
      if (color === 'dark') return isSelected ? 'var(--color-white)' : 'var(--color-grey-800)';
      if (color === 'yellow') return isSelected ? 'var(--color-yellow-100)' : 'var(--color-grey-50)';
      return isSelected ? 'var(--color-grey-800)' : 'var(--color-grey-50)';
    }};

    color: ${({ isSelected, color }) => {
      if (color === 'dark') return isSelected ? 'var(--color-grey-900)' : 'var(--color-white)';
      if (color === 'yellow') return isSelected ? 'var(--color-yellow-800)' : 'var(--color-grey-700)';
      return isSelected ? 'var(--color-white)' : 'var(--color-grey-700)';
    }};
  `;
}

export default StyleFooter;
