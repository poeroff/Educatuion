import { Box, IQuestionProps, Input, Label, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM02101 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '배달한 물건 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='#969590' color='var(--color-white)' />
        드론으로 배달한 물건 수를 구해 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' padding={'20px 44px'} useRound>
          <Input value={value1} onChange={e => setValue1(e.target.value)} width='130px' ariaLabel='사랑 마을에 배달한 개수' />
          <Typography>+</Typography>
          <Input value={value2} onChange={e => setValue2(e.target.value)} width='130px' ariaLabel='행복 마을에 배달한 개수' />
          <Typography>=</Typography>
          <Input value={value3} onChange={e => setValue3(e.target.value)} width='130px' ariaLabel='사랑 마을과 행복 마을에 배달한 개수' />
        </Box>
      </Box>
    </Container>
  );
};

export default EM02101;
