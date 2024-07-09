import { Image, BoxWrap, Box, TMainHeaderInfoTypes, List, Label, Radio, IAudioPlayerProps, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE00403 = () => {
  const [isShow, setShow] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'What advice does the woman give to the boy?',
  };

  const data = [
    {
      text: 'Consult your teacher first.',
    },
    {
      text: 'Think twice before you speak.',
    },
    {
      text: 'Talk about your concern with your friend.',
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
        <Box width='317px' hAlign={'center'} useFull>
          <Image
            src={'/L04/HE1-L01-C03-A02.jpg'}
            width='329px'
            height='207px'
            alt='한 여성이 웃으며 무언가를 말하고 있는 모습'
            title='한 여성이 웃으며 무언가를 말하고 있는 모습'
          />
        </Box>
        <Box hAlign={'center'} useFull>
          <List gap={24} data={data}>
            {({ value, index = 1 }) => (
              <Radio type={'box'} align='vertical' name={'radio-question-A'} label={value?.text} value={index - 1 === 0}>
                <Box padding={'6px 0'} whiteSpace='nowrap'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          </List>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE00403;
