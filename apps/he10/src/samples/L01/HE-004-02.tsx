import { BoxWrap, Box, TMainHeaderInfoTypes, List, Label, Radio, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE00402 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'What is the girl going to do tomorrow?',
  };

  const data = [
    {
      text: 'debate width new friends',
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
    right: 10,
    top: 10,
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull>
        <Box vAlign='center' useFull>
          <List gap={24} data={data}>
            {({ value, index = 1 }) => (
              <Radio type={'box'} align='vertical' name={'radio-question-A'} label={value?.text} value={index - 1 === 0}>
                <Box padding={'6px 0'}>
                  <Label value={index} /> <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          </List>
        </Box>
        <Box vAlign='center' useFull>
          <List
            gap={24}
            data={data}
            row={({ value, index = 1 }) => (
              <Radio type={'box'} align='vertical' name={'radio-question-A'} label={value?.text}>
                <Box padding={'6px 0'}>
                  <Label value={index + 3} /> <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE00402;
