import { useState } from 'react';
import { Box, ESvgType, IQuestionProps, Label, Recorder, SimpleAudioPlayer, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import arrow_down from '../../assets/icon/teenyicons_arrow_solid_down.svg';
// import arrow_up from '../../assets/icon/teenyicons_arrow_solid_up.svg';

const ME11701 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'sounds',
  };

  const questionInfo: IQuestionProps = {
    text: '억양에 유의하여 잘 듣고, 따라 말해 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='완료하기'
    >
      <Box hAlign='center' marginBottom={24}>
        <Label size='number' type='line' marginRight={10}>
          <Typography useGap={false} weight='var(--font-weight-bold)' align='center' lineHeight='42px'>
            1
          </Typography>
        </Label>
        <Typography lineHeight='42px'>What’s the weather like today?</Typography>
        <Box width={4} />
        <SvgIcon type={ESvgType.IMG} src={arrow_down} size='32px' alt='아래로 향하는 화살표' />
        {/* <SvgIcon type={ESvgType.IMG} src={arrow_up} size='32px' alt='위로 향하는 화살표' /> */}
      </Box>
      <Box hAlign='center'>
        <SimpleAudioPlayer audioSrc='' onEnded={() => {}} ariaLabel='듣기' />
        <Box width={8} />
        <Recorder recorderIndex={0} onSubmit={() => {}} onRefresh={() => {}} />
      </Box>
    </Container>
  );
};

export default ME11701;
