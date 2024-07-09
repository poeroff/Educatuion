import styled from 'styled-components';

export const HeaderTitleNumber = styled.div`
  position: relative;
  font-family: SUIT;
  font-size: 36px;
  font-weight: 800;
  line-height: 58px;
  color: var(--color-yellow-700);
`;

export const HeaderTitleText = styled.span<{ $isSup?: boolean }>`
  font-family: SUIT;
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  margin-top: ${({ $isSup }) => ($isSup ? '-8px' : '0')};

  & sup {
    font-size: smaller;
  }
`;

export const Sup = styled.sup`
  vertical-align: super;
  font-size: initial;
`;

export const Number = styled.span`
  font-family: MathJax_Main;
`;
