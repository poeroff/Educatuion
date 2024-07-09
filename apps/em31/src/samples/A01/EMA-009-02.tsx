import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';
import { COLOR_09 } from './EMA-009-01';

const EMA00902 = () => {
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
            <Label type='icon' size='small' value={1} />
          </LabelWrapper>
          <Box>4장의 수 카드를 한 번씩만 이용하여 몫이 가장 작은</Box>
        </Box>
        <Box>(세 자리수)÷(한 자리 수)의 나눗셈을 만들고, 몫과 나머지를구해 보세요.</Box>
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
      <BoxWrap boxGap={0} flexDirection='column' justifyContent='center' alignItems='center' paddingTop={14}>
        <BoxWrap ariaLabel='숫자가 적힌 카드 4장이 7, 4, 8, 2 의 순서대로 있습니다.' justifyContent='center' marginBottom={24}>
          <CardWrapper backgroundColor={COLOR_09.red[200]} borderColor={COLOR_09.red[400]}>
            <Label value='7' background={COLOR_09.red[100]} lineColor={COLOR_09.red[300]} size='number' fontSize={32} />
          </CardWrapper>
          <CardWrapper backgroundColor={COLOR_09.yellow[200]} borderColor={COLOR_09.yellow[400]}>
            <Label value='4' background={COLOR_09.yellow[100]} lineColor={COLOR_09.yellow[300]} size='number' fontSize={32} />
          </CardWrapper>
          <CardWrapper backgroundColor={COLOR_09.green[200]} borderColor={COLOR_09.green[400]}>
            <Label value='8' background={COLOR_09.green[100]} lineColor={COLOR_09.green[300]} size='number' fontSize={32} />
          </CardWrapper>
          <CardWrapper backgroundColor={COLOR_09.purple[200]} borderColor={COLOR_09.purple[400]}>
            <Label value='2' background={COLOR_09.purple[100]} lineColor={COLOR_09.purple[300]} size='number' fontSize={32} />
          </CardWrapper>
        </BoxWrap>
        <Box width='100%' display='flex' flexDirection='column' alignItems='flex-end' rowGap={16}>
          <Box width={376} display='flex' alignItems='center' justifyContent='center'>
            <LabelWrapper2>
              <Label
                value='나눗셈'
                color='var(--color-yellow-800)'
                background='var(--color-yellow-100)'
                lineColor='var(--color-yellow-700)'
                fontSize={22}
                marginRight={0}
              />
            </LabelWrapper2>
            <Box display='flex' columnGap={8}>
              <Input width='52px' ariaLabel='몫이 가장 작은 나눗셈의 세자리 수 중 백의 자리 수를 적어주세요.' />
              <Input width='52px' ariaLabel='몫이 가장 작은 나눗셈의 세자리 수 중 십의 자리 수를 적어주세요.' />
              <Input width='52px' ariaLabel='몫이 가장 작은 나눗셈의 세자리 수 중 일의 자리 수를 적어주세요.' />
            </Box>
            <Typography fontSize='36px'>÷</Typography>
            <Input width='52px' ariaLabel='몫이 가장 작은 나눗셈의 나눠지는 한자리 수를 적어주세요.' />
          </Box>
          <BoxWrap width={376} alignItems='center' justifyContent='flex-end'>
            <Box display='flex'>
              <Box display='flex' alignItems='center' margin='7px 10px'>
                <Label
                  value='몫'
                  color='var(--color-yellow-800)'
                  background='var(--color-yellow-100)'
                  lineColor='var(--color-yellow-700)'
                  fontSize={22}
                  marginRight={0}
                />
              </Box>
              <Input width='130px' ariaLabel='몫을 적어주세요.' />
            </Box>
            <Box display='flex'>
              <LabelWrapper2>
                <Label
                  value='나머지'
                  color='var(--color-yellow-800)'
                  background='var(--color-yellow-100)'
                  lineColor='var(--color-yellow-700)'
                  fontSize={22}
                  marginRight={0}
                />
              </LabelWrapper2>
              <Input width='52px' ariaLabel='나머지를 적어주세요.' />
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EMA00902;

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

const LabelWrapper2 = styled.div`
  display: flex;
  align-items: center;
  margin: 7px 10px 7px 0px;
  & > span {
    padding-inline: 14px;
  }
`;
