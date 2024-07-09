import { Box, TMainHeaderInfoTypes, Dialog, Input, Typography, Recorder, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';
import circleStar from '../../assets/icon/circle_star.svg';

const HE02101 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Think and Talk',
  };
  const questionInfo = {
    text: 'What do you think are the advantages working with others?',
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  const [isRecordingDone, setIsRecordingDone] = useState(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={!isRecordingDone}
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box hAlign='center'>
        <SvgIcon src={circleStar} size='38px' />
        <Typography color='var(--color-blue-500)'>Advantages</Typography>
      </Box>

      <Box hAlign='center' marginTop='20px'>
        <Box>
          <Typography>Perconally, I think working with others</Typography>
          <Box marginTop='8px'>
            <Typography>is</Typography>
            <Input value={value1} onChange={e => setValue1(e.target.value)} placeholder='내용을 넣어 주세요.' width='423px' />
          </Box>
          <Box marginTop='8px'>
            <Typography>because</Typography>
            <Input value={value2} onChange={e => setValue2(e.target.value)} placeholder='내용을 넣어 주세요.' width='340px' />
          </Box>
        </Box>
      </Box>
      <Box hAlign='center' marginTop='20px'>
        <Recorder recorderIndex={0} onSubmit={() => setIsRecordingDone(true)} onRefresh={() => setIsRecordingDone(false)} />
      </Box>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE02101;
