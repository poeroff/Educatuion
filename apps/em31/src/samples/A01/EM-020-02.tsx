import { useState } from 'react';

import { Box, ESvgType, IQuestionProps, Input, Label, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EM02002 = () => {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} size='small' />
        <Box>
          <Box vAlign='center'>
            <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
            &nbsp;안에 알맞은 수를 찾아 써넣어 문제를 풀고, 덧셈 문제
          </Box>
          를 만들어 해결해 보세요.
        </Box>
      </>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='start'
      useRound
    >
      <Box marginTop='10px' vAlign='flex-start'>
        <Box height={'60px'} display='flex' alignItems='center'>
          <Label value='ㄱ' lineColor='none' background='#969590' color='var(--color-white)' />
        </Box>
        <Box marginLeft='8px'>
          <Typography fontSize='36px' lineHeight='56px'>
            지난달 쓰담 달리기에서 페트병을{' '}
            <Input
              textAlign='center'
              width='130px'
              value={ans1}
              onChange={event => setAns1(event.target.value)}
              ariaLabel='빈칸에 알맞은 수를 입력하세요.'
            />
            개, 유리병을{' '}
            <Input
              textAlign='center'
              width='130px'
              value={ans2}
              onChange={event => setAns2(event.target.value)}
              ariaLabel='빈칸에 알맞은 수를 입력하세요.'
            />
            개 주었습니다. 지난달에 주운 페트병과 유리병은 모두 몇 개인가요?
          </Typography>
        </Box>
      </Box>
      <Box marginTop='24px' flexDirection='column' vAlign='center'>
        <Box width='312px' vAlign='center'>
          <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Box marginLeft='8px'>
            <Input textAlign='center' width='255px' value={ans3} onChange={event => setAns3(event.target.value)} ariaLabel='식을 입력하세요.' />
          </Box>
        </Box>
        <Box marginTop='8px' width='312px' vAlign='center'>
          <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Box marginLeft='8px'>
            <Input textAlign='center' width='155px' value={ans4} onChange={event => setAns4(event.target.value)} ariaLabel='답을 입력하세요.' />
            <Typography>개</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM02002;
