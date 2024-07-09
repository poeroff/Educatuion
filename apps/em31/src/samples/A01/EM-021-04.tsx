import { Box, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM02104 = () => {
  const [isShow, setShow] = useState(false);
  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '한 줄에 선 학생 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' color='var(--color-white)' background='#969590' />한 줄에 선 학생 수를 구해 보세요.
      </>
    ),
  };

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
      vAlign='flex-start'
    >
      <Box type='paint' backgroundColor='var(--color-blue-100)' padding='33px 53px' useRound textAlign='center'>
        <Typography fontSize='var(--font-size-36)' weight='var(--font-weight-medium)' lineHeight='54px'>
          오늘은 소방 훈련을 하는 날이야. 소화기 사용법을 배우려고 학생 42명이 3줄로 똑같이 나누어 섰어.
        </Typography>
      </Box>
      <Box hAlign='center' marginTop='24px'>
        <Input placeholder='' name={`value1`} value={value} onChange={e => setValue(e.target.value)} width='120px' ariaLabel={`답 입력란`} />
        <Typography weight='var(--font-weight-medium)'>÷</Typography>
        <Input placeholder='' name={`value2`} value={value2} onChange={e => setValue2(e.target.value)} width='120px' ariaLabel={`답 입력란`} />
        <Typography weight='var(--font-weight-medium)'>=</Typography>
        <Input placeholder='' name={`value3`} value={value3} onChange={e => setValue3(e.target.value)} width='120px' ariaLabel={`답 입력란`} />
      </Box>
    </Container>
  );
};

export default EM02104;
