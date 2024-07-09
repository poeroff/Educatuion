import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Image, Input, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, Unit } from '@maidt-cntn/ui/math';
import { useState } from 'react';

interface IPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const EM41102 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='center'>
        <Box marginRight='12px' vAlign='center'>
          <Input width='48px' />
        </Box>
        안에 알맞은 수를 써넣으세요.
      </Box>
    ),
  };

  const [value1, setValue1] = useState<string>(' ');
  const [value2, setValue2] = useState<string>(' ');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <BoxWrap justifyContent='center' boxGap={86} marginTop={21.5} useFull>
        <Box position='relative' zIndex={3}>
          <Image
            src='/example/EM-411-02/MC41251_1.jpg'
            alt='연을 학생 1명이 들고 있고 네 각중 세 각이 각각 100도, 95도, 95도 입니다.'
            width='222px'
            height='361px'
          />
          <InputWrapper position={{ top: '92px', right: '-55px' }}>
            <Input width='98px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='사각형 네각의 합에서 290도를 뺀 각' />
            <Unit unit={'degree'} height={50} />
          </InputWrapper>
        </Box>
        <Box position='relative' zIndex={2}>
          <Image
            src='/example/EM-411-02/MC41251_2.jpg'
            alt='연을 학생 2명이 들고 있고 네 각중 세각이 각각 100도, 100도, 75도 입니다.'
            width='277px'
            height='361px'
          />
          <InputWrapper position={{ top: '25px', right: '-64px' }}>
            <Input width='98px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='사각형 네각의 합에서 275도를 뺀 각' />
            <Unit unit={'degree'} height={50} />
          </InputWrapper>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM41102;

const InputWrapper = styled.div<{ position?: IPosition }>`
  position: absolute;
  ${({ position }) =>
    position &&
    `
      top: ${position.top ? position.top : 'unset'};
      bottom: ${position.bottom ? position.bottom : 'unset'};
      left: ${position.left ? position.left : 'unset'};
      right: ${position.right ? position.right : 'unset'};
    `}
`;
