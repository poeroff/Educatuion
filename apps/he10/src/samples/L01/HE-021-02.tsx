import { Box, TMainHeaderInfoTypes, Dialog, Typography, Recorder, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE02102 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
  };
  const questionInfo = {
    text: 'Write and talk about why we are willing to help people in need.',
  };

  const [isRecordingDone, setIsRecordingDone] = useState(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={!isRecordingDone}
      vAlign='flex-start'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Typography weight={700}>영상을 보고 느낀 점을 자유롭게 서술하고 말해 보세요.</Typography>

      <Box height='220px' marginTop='10px' useFull>
        <Textarea width='100%' height='100%' placeholder='내용을 넣어 주세요.' />
      </Box>

      <Box hAlign='center' marginTop='10px'>
        <Recorder recorderIndex={0} onSubmit={() => setIsRecordingDone(true)} onRefresh={() => setIsRecordingDone(false)} />
      </Box>

      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE02102;
