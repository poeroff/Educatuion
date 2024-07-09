import { useState } from 'react';
import { Image, Box, Typography, Input, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM04103 = () => {
  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '6',
    text: '친구들이 놀이터에 도착한 시간입니다. 놀이터에 가장 먼저 도착한 친구와 도착한 시각을 구해 보세요.',
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      vAlign='start'
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box hAlign='center' flexDirection='column'>
        <Box padding='24px 120px 12px' type='line' justifyContent='space-between' hAlign='center' useFull useRound>
          <Box hAlign='center' flexDirection='column'>
            <Image src='../../assets/example/EM-041-03/mc31524_1.png' width='130px' alt='9시 10분 20초를 가리키고 있는 시계바늘' />
            <Box marginTop='8px'>
              <Typography useGap={false}>소연</Typography>
            </Box>
          </Box>
          <Box hAlign='center' flexDirection='column'>
            <Image src='../../assets/example/EM-041-03/mc31534_2.png' width='130px' alt='9시 13분 00초를 가리키고 있는 시계바늘' />
            <Box marginTop='8px'>
              <Typography useGap={false}>찬성</Typography>
            </Box>
          </Box>
          <Box hAlign='center' flexDirection='column'>
            <Image src='../../assets/example/EM-041-03/mc31534_3.png' width='130px' alt='9시 11분 5초를 가리키고 있는 시계바늘' />
            <Box marginTop='8px'>
              <Typography useGap={false}>재진</Typography>
            </Box>
          </Box>
        </Box>
        <Box marginTop='12px'>
          <Box>
            <Typography lineHeight='48px'>가장 먼저 도착한 친구는</Typography>
            <Input width='98px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='가장 먼저 도착한 친구의 이름을 적어주세요' />
            <Typography useGap={false} lineHeight='48px'>
              이고
            </Typography>
          </Box>
          <Box marginTop='8px'>
            <Typography lineHeight='48px'>도착한 시각은</Typography>
            <Input width='52px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='도착한 시간을 적어주세요' />
            <Typography useGap={false} lineHeight='48px'>
              시
            </Typography>
            <Input width='52px' marginLeft={12} value={value3} onChange={e => setValue3(e.target.value)} ariaLabel='도착한 분을 적어주세요' />
            <Typography useGap={false} lineHeight='48px'>
              분
            </Typography>
            <Input width='98px' marginLeft={12} value={value4} onChange={e => setValue4(e.target.value)} ariaLabel='도착한 초를 적어주세요' />
            <Typography useGap={false} lineHeight='48px'>
              초 입니다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM04103;
