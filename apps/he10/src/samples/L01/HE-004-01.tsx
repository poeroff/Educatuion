import { Box, TMainHeaderInfoTypes, List, Label, Radio, IAudioPlayerProps, BottomSheet, Typography, Tag, ETagLine } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE00401 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'What is the girl going to do tomorrow?',
  };

  const data = [
    {
      text: 'debate with new friends',
    },
    {
      text: 'have an interview for a club',
    },
    {
      text: 'check out some recent news',
    },
  ];

  const audioInfo: IAudioPlayerProps = {
    audioSrc: 'audioSrc',
  };

  const [answer, setAnswer] = useState<number | null>(null);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box vAlign='center' useFull>
        <List gap={24} data={data}>
          {({ value, index = 1 }) => (
            <Radio
              type={'box'}
              align='vertical'
              name={'radio-question-A'}
              label={value?.text}
              value={index - 1 === 0}
              isError={answer !== null && answer !== 1}
              onClick={() => {
                setAnswer(index - 1);
              }}
            >
              <Box padding={'6px 0'}>
                <Label value={index} /> <Typography>{value?.text}</Typography>
              </Box>
            </Radio>
          )}
        </List>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>1</Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>해설 자리</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE00401;
