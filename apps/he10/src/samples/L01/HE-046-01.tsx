import { useState } from 'react';
import { Box, Image, Typography, TMainHeaderInfoTypes, IQuestionProps, IAudioPlayerProps, Question, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

const HE04601 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '2',
    text: 'Complete the opinions of the debaters using information from the debate.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
    right: -5,
    top: -5,
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} vAlign='flex-start'>
      <Box display='flex' useFull>
        <Box useFull borderRight='1px solid #2294B4'>
          <Box useFull borderBottom='1px solid #2294B4' height='52px' padding='0 0 4px 20px' marginBottom='4px'>
            <Typography weight={700} color='#275CE7'>
              Pros
            </Typography>
          </Box>
          <Question type='dot' size='small'>
            AI art can be as creatieve and
          </Question>
          <Box marginLeft='17px'>
            <Box hAlign='flex-start'>
              <Typography>(1)</Typography>
              <Input placeholder='내용을 넣어주세요.' width='241px' value={value1} onChange={e => setValue1(e.target.value)} />
            </Box>
            <Typography>as human art.</Typography>
          </Box>

          <Question type='dot' size='small'>
            AI can produce content much
          </Question>
          <Box marginLeft='17px'>
            <Box hAlign='flex-start'>
              <Typography>(2)</Typography>
              <Input placeholder='내용을 넣어주세요.' width='241px' value={value2} onChange={e => setValue2(e.target.value)} />
            </Box>
            <Typography>and at a lower cost.</Typography>
          </Box>
        </Box>

        <Box useFull>
          <Box useFull borderBottom='1px solid #2294B4' height='52px' padding='0 0 4px 20px' marginBottom='4px'>
            <Typography weight={700} color='#C11D00'>
              Cons
            </Typography>
          </Box>
          <Question type='dot' size='small'>
            AI art lacks true creativity and
          </Question>
          <Box marginLeft='17px'>
            <Box hAlign='flex-start'>
              <Typography>artistic (3)</Typography>
              <Input placeholder='내용을 넣어주세요.' width='241px' value={value3} onChange={e => setValue3(e.target.value)} />
            </Box>
            <Typography>which are essential to real art.</Typography>
          </Box>

          <Box hAlign='start'>
            <Question type='dot' size='small'>
              AI just (4)
            </Question>
            <Input placeholder='내용을 넣어주세요.' width='241px' value={value4} onChange={e => setValue4(e.target.value)} />
          </Box>
          <Box marginLeft='17px'>
            <Typography>human works based on big data.</Typography>
          </Box>
        </Box>
      </Box>

      <BackgroundImage>
        <Image src={'/example/HE2-L04-C04-A02-2-1.png'} alt='' width='920px' height='364px' />
      </BackgroundImage>
    </Container>
  );
};

const BackgroundImage = styled.div`
  position: absolute;
  top: 10px;
  left: 40px;
  z-index: -1;
`;

export default HE04601;
