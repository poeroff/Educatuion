import { useState } from 'react';
import { Box, TMainHeaderInfoTypes, List, Typography, Label, Recorder, RecordButton, Dialog, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IListenAndAnswer {
  type: string;
  content: React.ReactNode;
  color: string;
}

const HE00801 = () => {
  const [isShow, setShow] = useState(false);
  const [isRecordingDone, setIsRecordingDone] = useState([false, false, false, false]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Your Turn',
  };

  const questionInfo = {
    text: 'Listen to the dialogue and repeat.',
  };

  const onEventRecorder = (index: number, status: boolean) => {
    const newArray = [...isRecordingDone];
    newArray[index] = status;
    setIsRecordingDone(newArray);
  };

  const data: IListenAndAnswer[] = [
    {
      type: 'A',
      color: 'var(--color-blue-100)',
      content: (
        <>
          What do you hope for this year?
          <br />
          Personally, I hope I can complete a 5 km race.
        </>
      ),
    },
    {
      type: 'B',
      color: 'var(--color-orange-200)',
      content: (
        <>
          That sounds great!
          <br />I hope I’ll have a chance to learn Spanish.
        </>
      ),
    },
    {
      type: 'C',
      color: 'var(--color-green-100)',
      content: <>Well, I hope my school soccer team can win first place.</>,
    },
    {
      type: 'D',
      color: 'var(--color-yellow-100)',
      content: <>Great! Let’s hope everything we want will come true.</>,
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
      useExtend
      submitLabel='완료하기'
      submitDisabled={isRecordingDone.some(value => !value)}
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <List<IListenAndAnswer> data={data}>
        {({ value, index = 1 }) => (
          <Box hAlign='flex-start'>
            <Box useFull hAlign='flex-start'>
              <Box marginRight='8px' alignSelf='start'>
                <Label value={value?.type || ''} type={'paint'} background={value?.color} />
              </Box>
              <Typography>{value?.content}</Typography>
            </Box>

            <RecordButton label='listen' onClick={() => {}} />
            <Box marginLeft='4px'>
              <Recorder recorderIndex={index} onSubmit={() => onEventRecorder(index - 1, true)} onRefresh={() => onEventRecorder(index - 1, false)} />
            </Box>
          </Box>
        )}
      </List>
      <Dialog isShow={isShow} useFooter onClose={() => setShow(!isShow)} onConfirm={() => setShow(!isShow)}>
        contents
      </Dialog>
    </Container>
  );
};

export default HE00801;
