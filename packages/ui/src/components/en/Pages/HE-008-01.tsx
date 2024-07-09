import { TMainHeaderInfoTypes } from '@/type/Layout';

import { Box, IQuestionProps, List, BoxWrap, Label, SimpleAudioPlayer, Recorder, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

export interface IListenAndAnswer {
  type?: string;
  content: React.ReactNode;
  color?: string;
  audioSrc: string;
}
export interface IHE00801 {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo?: IAudioPlayerProps;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  onSubmit?: () => void;
  onlyListen?: boolean;
}

const HE00801 = ({ headerInfo, audioInfo, questionInfo, data, onSubmit, onlyListen = false }: IHE00801) => {
  const [isRecordingDone, setIsRecordingDone] = useState(Array(data.length).fill(false));
  const [isDisabled, setIsDisabled] = useState(false);
  const onEventRecorder = (index: number, status: boolean) => {
    const newArray = [...isRecordingDone];
    newArray[index] = status;
    setIsRecordingDone(newArray);
  };

  const handleSubmit = () => {
    setIsDisabled(true);
    onSubmit && onSubmit();
  };

  return (
    <Container
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={isRecordingDone.some(value => !value) || isDisabled}
      onSubmit={!onlyListen ? handleSubmit : undefined}
    >
      <List data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap>
            {value?.type && (
              <Box>
                <Label value={value?.type || ''} type={'paint'} background={value?.color} />
              </Box>
            )}
            <Box useFull height={'80px'} display={'flex'}>
              <div>{value?.content}</div>
            </Box>
            <Box hAlign='flex-end' gap='6px'>
              <SimpleAudioPlayer audioSrc={value?.audioSrc ?? ''} />
              {!onlyListen && (
                <Recorder
                  recorderIndex={index - 1}
                  onSubmit={() => onEventRecorder(index - 1, true)}
                  onRefresh={() => onEventRecorder(index - 1, false)}
                />
              )}
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default HE00801;
