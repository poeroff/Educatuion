import { TMainHeaderInfoTypes, Input, Typography, Box, IAudioPlayerProps, BottomSheet, Question } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';
import styled from '@emotion/styled';
import Img from '@/assets/L04/HE1-L04-C02-A03-01.jpg';

const HE01103 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Complete the poster using information from the dialogue.',
  };

  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');

  const [isShow, setShow] = useState(false);

  const onSubmit = () => {
    setShow(!isShow);
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={onSubmit}
      submitLabel={'채점하기'}
      submitDisabled={ans1 !== '' && ans2 !== '' && ans3 !== '' ? false : true}
      audioInfo={audioInfo}
    >
      <BackgroundWrap>
        <Box hAlign='center' paddingTop='15px'>
          <Typography useGap={false} weight={800}>
            World Bee Day
          </Typography>
        </Box>
        <Content>
          <Box>
            <BoldText>Date :</BoldText> <Typography>(1)</Typography>
            <Input value={ans1} onChange={event => setAns1(event.target.value)} textAlign='left' width='280px' maxLength={30} />
            <Typography>20th</Typography>
          </Box>
          <Box marginTop='10px'>
            <BoldText>Purpose</BoldText> : to inform people about the key roles of bees
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Question type='dot' size='small'>
              maintainging our(2)
            </Question>
            <Input value={ans2} onChange={event => setAns2(event.target.value)} width='280px' maxLength={30} />
          </Box>
          <Box marginTop='10px' hAlign='flex-start'>
            <Question type='dot' size='small'>
              contributing to a third of our (3)
            </Question>
            <Input value={ans3} onChange={event => setAns3(event.target.value)} width='280px' maxLength={30} />
            <Typography> production</Typography>
          </Box>
        </Content>
      </BackgroundWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow}>
        <div>
          1. answer <br />
          2. answer <br />
          3. answer
        </div>
      </BottomSheet>
    </Container>
  );
};

const BackgroundWrap = styled.div`
  min-height: 400px;
  width: 100%;
  background: top right / cover no-repeat url(${Img});
  background-size: 184px 167px;
  background-color: var(--color-blue-1000);
`;

const Content = styled.div`
  padding: 14px 0 0 20px;
`;

const BoldText = styled.span`
  font-weight: var(--font-weight-bold);
  font-size: 32px;
  line-height: 40px;
`;

export default HE01103;
