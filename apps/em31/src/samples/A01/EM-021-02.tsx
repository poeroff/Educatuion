import { Box, IQuestionProps, Input, Label, SvgIcon, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import arrow from '../../assets/icon/v_arrow.svg';
import { useState } from 'react';

const EM02102 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '곱셈과 나눗셈의 관계 알아보기',
    iconType: 'search',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' type='paint' background='#969590' color='var(--color-white)' />
        곱셈식을 나눗셈식 2개로 나타내 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

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
      <Box display='flex' hAlign='center'>
        <Box background='yellow' minWidth='329px' useRound hAlign='center'>
          <Typography>20×4 = 20</Typography>
        </Box>

        <SvgIcon src={arrow} width='140px' height='124px' />

        <Box>
          <Box type='dashed' useRound hAlign='center' padding='24px'>
            <Typography>20 ÷</Typography>
            <Input width='121px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='20을 나누는 수 입력란' />
            <Typography>=</Typography>
            <Input width='121px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='20 나누기 N의 몫' />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='24px' marginTop='44px'>
            <Typography>20 ÷</Typography>
            <Input width='121px' value={value3} onChange={e => setValue3(e.target.value)} ariaLabel='20을 나누는 수 입력란' />
            <Typography>=</Typography>
            <Input width='121px' value={value4} onChange={e => setValue4(e.target.value)} ariaLabel='20 나누기 N의 몫' />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM02102;
