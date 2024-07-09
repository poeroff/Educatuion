import { useState } from 'react';
import { ExampleBox, Container } from '@maidt-cntn/ui/en';
import { Input, Recorder, Typography, TMainHeaderInfoTypes, Box, BoxWrap, Question, EStyleButtonTypes } from '@maidt-cntn/ui';

const HE03101 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Write and talk about your hopes for the year.',
  };

  const [input, setInput] = useState<string>('');

  const [isRecordingDone, setIsRecordingDone] = useState(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={EStyleButtonTypes.TERTIARY}
      submitDisabled={!isRecordingDone}
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <ExampleBox color={'purple'} title={'My Hopes for This Year'}>
        <Question type={'dot'} size='small'>
          I hope
          <Typography weight={800}>I can Complete a 5 km race.</Typography>
        </Question>
        <Question type={'dot'} size='small'>
          I hope
          <Typography weight={800}>I'll have a chance to learn Spanish.</Typography>
        </Question>
      </ExampleBox>
      <BoxWrap alignItems={'baseline'} paddingLeft={'14px'} marginTop={'20px'}>
        <Question type={'dot'} size='small'>
          I
        </Question>
        <Box flex='1'>
          <Input
            name='value3'
            value={input}
            width='100%'
            onChange={e => setInput(e.target.value)}
            placeholder='e.g. my family can go camping together'
          />
        </Box>
      </BoxWrap>
      <Box display='flex' justifyContent={'center'} marginTop={'20px'}>
        <Recorder recorderIndex={0} onSubmit={() => setIsRecordingDone(true)} onRefresh={() => setIsRecordingDone(false)} />
      </Box>
    </Container>
  );
};

export default HE03101;
