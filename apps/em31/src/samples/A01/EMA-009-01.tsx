import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

export const COLOR_09 = {
  red: {
    100: '#FDEBEB',
    200: '#FADBDA',
    300: '#F4B1B3',
    400: '#F09198',
  },
  yellow: {
    100: '#FEF1DC',
    200: '#FDE8C5',
    300: '#FED38B',
    400: '#F9C056',
  },
  green: {
    100: '#E6F3EE',
    200: '#D7EBE5',
    300: '#B7DFD3',
    400: '#8CCFBE',
  },
  purple: {
    100: '#E8E6F3',
    200: '#D9D7EB',
    300: '#B7BBDF',
    400: '#8C93CF',
  },
};

const EMA00901 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box>
        <Box display='flex'>
          <LabelWrapper>
            <Label type='icon' size='small' value={3} />
          </LabelWrapper>
          <Box>3장의 수 카드 중에서 2장을 골라 한 번씩만 이용하여 가장</Box>
        </Box>
        <Box>큰 두 자리 수를 만들었습니다. 이 수를 남은 카드의 수로</Box>
        <Box>나누었을 때의 몫을 구해 보세요</Box>
      </Box>
    ),
  };

  const [isShow, setShow] = useState(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
      useRound
    >
      <BoxWrap flexDirection='column' justifyContent='center' alignItems='center' paddingTop={14}>
        <BoxWrap ariaLabel='숫자가 적힌 카드 3장이 3, 6, 9 의 순서대로 있습니다.' justifyContent='center' marginBottom={24}>
          <CardWrapper backgroundColor={COLOR_09.red[200]} borderColor={COLOR_09.red[400]}>
            <Label value='3' background={COLOR_09.red[100]} lineColor={COLOR_09.red[300]} size='number' fontSize={32} />
          </CardWrapper>
          <CardWrapper backgroundColor={COLOR_09.yellow[200]} borderColor={COLOR_09.yellow[400]}>
            <Label value='6' background={COLOR_09.yellow[100]} lineColor={COLOR_09.yellow[300]} size='number' fontSize={32} />
          </CardWrapper>
          <CardWrapper backgroundColor={COLOR_09.green[200]} borderColor={COLOR_09.green[400]}>
            <Label value='9' background={COLOR_09.green[100]} lineColor={COLOR_09.green[300]} size='number' fontSize={32} />
          </CardWrapper>
        </BoxWrap>
        <Input ariaLabel='3장의 카드 중 가장 큰 두 자리 수를 남은 카드의 수로 나눈 몫을 적어주세요.' />
      </BoxWrap>
    </Container>
  );
};

export default EMA00901;

const LabelWrapper = styled.div`
  float: left;
  padding-right: 12px;
  & > span {
    transform: translateY(-6px);
    margin: 0px;
  }
`;

const CardWrapper = styled.div<{ backgroundColor?: string; borderColor?: string }>`
  width: fit-content;
  padding: 4px !important;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 2px;
  & > span {
    margin: 0px;
    border-radius: 8px;
    height: 60px;
  }
`;
