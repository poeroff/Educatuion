import { Box, EStyleFontSizes, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM01301 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '뺄셈의 어림셈으로 문제를 해결하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' color='var(--color-white)' background='#969590' />
        영상 체험관의 남은 자리는 몇 개 쯤일지 어림하는 식을 쓰고 어림셈을 해 보세요.
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <Typography size={EStyleFontSizes.MEDIUM}>
        3학년 학생이 모두 영상 체험관에서 영상을 보기로 했어.
        <br /> 영상 체험관의 자리는 700개이고 지금까지 입장한 사람은 198명이야.
        <br /> 3학년 학생 모두 영상 체험관에 들어갈 수 있을까?
      </Typography>

      <Box hAlign='center' marginTop='24px'>
        <Input width='130px' value={value1} onChange={e => setValue1(e.target.value)} />
        <Typography size={EStyleFontSizes.MEDIUM}>+</Typography>
        <Input width='130px' value={value2} onChange={e => setValue2(e.target.value)} />
        <Typography size={EStyleFontSizes.MEDIUM}>=</Typography>
        <Input width='130px' value={value3} onChange={e => setValue3(e.target.value)} />
      </Box>
    </Container>
  );
};

export default EM01301;
