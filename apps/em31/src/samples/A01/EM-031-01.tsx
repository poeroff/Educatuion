import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Image, Box, TMainHeaderInfoTypes, BoxWrap, Input, Typography, Label, EStyleFontSizes, IQuestionProps, List, SvgIcon, ESvgType } from '@maidt-cntn/ui';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EM03001 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathStar',
    headerText: '이번 시간에 공부한 내용을 문제를 풀며 확인해 보세요.',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        <Box display='flex' alignItems='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣으세요.
        </Box>
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value5, setValue5] = useState<string>('');
  const [value6, setValue6] = useState<string>('');

  const data = [6, 4];

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
    >
      <BoxWrap useFull>
        <Box type='line' useFull useRound hAlign='center'>
          <Image src={'/example/EM-031-01/MA31306_example.jpg'} alt='당근이 24개 놓여져 있습니다.' width='382px' height='271px' />
        </Box>
        <Box useFull>
          <Box display='flex' alignItems='center' flexDirection='column'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>곱셈식</Typography>
            <Box type='dashed' useRound padding='8px 20px' width='100%'>
              <List data={data}>
                {({ value }) => (
                  <Box hAlign='center'>
                    <Typography>{value}×</Typography>
                    <Input width='152px' value={value1} onChange={e => setValue1(e.target.value)} />
                    <Typography>=</Typography>
                    <Input width='152px' value={value2} onChange={e => setValue2(e.target.value)} />
                  </Box>
                )}
              </List>
            </Box>
          </Box>
          <Box display='flex' alignItems='center' flexDirection='column' marginTop='24px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>나눗셈식</Typography>
            <Box type='dashed' useRound padding='8px 20px' width='100%'>
              <List data={data}>
                {({ value }) => (
                  <Box hAlign='center'>
                    <Input width='152px' value={value5} onChange={e => setValue5(e.target.value)} />
                    <Typography>÷{value}=</Typography>
                    <Input width='152px' value={value6} onChange={e => setValue6(e.target.value)} />
                  </Box>
                )}
              </List>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM03001;
