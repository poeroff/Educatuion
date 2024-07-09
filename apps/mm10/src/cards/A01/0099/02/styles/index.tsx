import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const HeaderTitle = styled.span<{ $isSup?: boolean }>`
  display: flex;
  font-family: SUIT;
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  margin-top: ${({ $isSup }) => ($isSup ? '-8px' : '0')};

  & sup {
    font-size: smaller;
  }
`;

export const SupWrap = styled.span`
  margin-top: -5px;
  font-family: 'NOTO';
`;

export const Sup = styled.sup`
  vertical-align: super;
  font-size: initial;
`;

export const HeaderTitleIndexWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 54px;
  margin-right: 14px;
`;

export const HeaderTitleIndex = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  color: #fe5663;
  font-size: 36px;
  font-weight: 600;
  line-height: 42px;
  text-align: center;

  figure {
    transform: translate(-32px, 12px);
  }
`;

export const ItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AnswerContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
`;

export const Item = styled.li<{ $isChecked: boolean; $isError?: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px;

  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  text-align: left;

  input {
    display: none;
  }

  label {
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  label::before {
    content: attr(data-number);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 38px;
    height: 38px;
    margin-right: 10px;
    border: 1px solid var(--color-grey-600);
    border-radius: 22px;

    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
  }

  ${({ $isChecked, $isError }) =>
    $isChecked &&
    !$isError &&
    `
      background-color: #1e6efa;
      border: 2px solid #1e6efa;
      border-radius: 8px;
      width: 400px;
      height: 48px;
      
      label {
        color: #ffffff;
        
        &::before {
          border: 1px solid #ffffff;
        }
      }
    `}

  ${({ $isChecked, $isError }) =>
    $isChecked &&
    $isError &&
    `
      background-color: #fff4f3;
      border-radius: 8px;
      border: 2px solid #eb1807;
      width: 400px;
      height: 48px;
      
      label {
        color: #c11d00;
        
        &::before {
          border: 1px solid #c11d00;
        }
      }
    `}
`;

export const OptionButtonLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px 10px 12px;
  border-radius: 8px;

  & input {
    display: none;
  }

  &:has(input:checked) {
    background-color: #1e6efa;
    color: #ffffff;
  }
`;

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  border: 1px solid;
`;

export const RawItem = styled.li<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  height: 38px;

  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  text-align: left;

  input {
    display: none;
  }

  label {
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  ${({ isChecked }) =>
    isChecked &&
    `
      background-color: #1e6efa;
      border-radius: 8px;
      width: 400px;
      
      label {
        color: #ffffff;
        
        &::before {
          border: 1px solid #ffffff;
        }
      }
    `}
`;

export const Number = styled.span`
  font-family: NOTO;
`;

export const Problem = styled.div`
  span {
    font-family: 'NOTO';
  }
`;

export const LevelIcon = styled.span<{ $colored: boolean }>`
  display: inline-flex;
  width: 6px;
  height: 12px;
  border-radius: 3px;
  background-color: ${({ $colored }) => ($colored ? '#fe5663' : '#C0C5CC')};
  margin-bottom: -12px;
`;

export const Option = styled.label`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  font-family: SUIT;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;

  & input {
    display: none;
  }

  & input + span {
    font-family: SUIT;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
  }

  & input:checked + span {
    background-color: #1e6efa;
    border-color: #1e6efa;
    color: #ffffff;
  }
`;

export const ExampleTag = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  top: -14px;
  height: 28px;
  padding: 2px 18px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  text-align: center;
  background-color: #6a6d73;
  color: #ffffff;
`;

export const ProblemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MoonjaeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Moonjae = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  height: 40px;
`;

export const MoonjaeIndex = styled.div`
  position: relative;
  font-family: SUIT;
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
`;

export const MoonjaeText = styled.div`
  font-weight: 400;
  line-height: 42px;
  font-family: 'NOTO';
`;

export const DapLan = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 51px;
`;
export const Dap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 600;
`;
