import { useState } from 'react';
import { Box, IQuestionProps, Label, Recorder, Scroll, SimpleAudioPlayer, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const ME11702 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'sounds',
  };

  const questionInfo: IQuestionProps = {
    text: '강조된 부분에 유의하여 듣고, 따라 말해 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='완료하기'
    >
      <Box useFull hAlign='center' flexDirection='column'>
        <Scroll tabIndex={0} width='700px' height='auto'>
          <Box hAlign='center' alignItems='baseline'>
            <Label size='number' type='line' marginRight={10}>
              <Typography useGap={false} weight='var(--font-weight-bold)' align='center' lineHeight='42px'>
                1
              </Typography>
            </Label>
            <Box vAlign='flex-start' flexDirection='column'>
              <Typography lineHeight='42px'>
                Would you like to see some&nbsp;
                <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)' lineHeight='42px'>
                  p
                </Typography>
                ictures?
              </Typography>

              <Typography>
                I have some on my&nbsp;
                <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)' lineHeight='42px'>
                  ph
                </Typography>
                one.
              </Typography>

              <Typography>
                I don’t know mu
                <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)' lineHeight='42px'>
                  ch
                </Typography>
                about it. Can you tell me more about it? I don’t know mu
                <Typography useGap={false} color='var(--color-required)' weight='var(--font-weight-bold)' lineHeight='42px'>
                  ch
                </Typography>
                about it. Can you tell me more about it?
              </Typography>
            </Box>
          </Box>
        </Scroll>
        <Box hAlign='center' marginTop='32px'>
          <SimpleAudioPlayer audioSrc='' onEnded={() => {}} ariaLabel='듣기' />
          <Box width={8} />
          <Recorder recorderIndex={0} onSubmit={() => {}} onRefresh={() => {}} />
        </Box>
      </Box>
    </Container>
  );
};

export default ME11702;
