import { useState } from 'react';
import { Box, IQuestionProps, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const EMA00802 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        몫이 10인 나눗셈을 모두 찾아 선택해 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);

  const [buttons, setButton] = useState<boolean[]>([...Array(9)].map(__ => false));
  const handleButton = (buttonIndex: number) => {
    setButton(prev => prev.map((value, index) => (index === buttonIndex ? !value : value)));
  };
  const cardData = ['70÷7', '90÷3', '80÷4', '60÷6', '80÷8', '40÷2', '30÷3', '60÷3', '80÷2'];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <Box hAlign='center'>
        <Box display='grid' gridTemplateColumns='repeat(3, 228px)'>
          {cardData.map((value, index) => (
            <BoxButton key={index} isClick={buttons[index]} onClick={() => handleButton(index)}>
              {value}
            </BoxButton>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

const BoxButton = styled.button<{ isError?: boolean; isClick?: boolean }>`
  height: 53px;

  border: 1px solid var(--color-grey-200);

  font-size: 24px;
  line-height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isClick }) =>
    isClick &&
    css`
      border: 2px solid var(--color-blue-300);
      background-color: var(--color-blue-50);
    `}

  ${({ isError }) =>
    isError &&
    css`
      border: 2px solid var(--color-red-700);
      background-color: var(--color-red-50);
    `}
`;

export default EMA00802;
