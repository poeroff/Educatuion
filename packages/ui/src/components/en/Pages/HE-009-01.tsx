import { TMainHeaderInfoTypes } from '@/type/Layout';

import { Box, IQuestionProps, List, BoxWrap, Label, SimpleAudioPlayer, Recorder, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

export interface IListenAndAnswer {
  type: string;
  conversationType: string;
  content: React.ReactNode;
  color?: string;
  audioSrc?: string;
}
export interface IHE00901 {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo?: IAudioPlayerProps;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  onSubmit?: () => void;
}

const HE00901 = ({ headerInfo, audioInfo, questionInfo, data, onSubmit }: IHE00901) => {
  const [isRecordingDone, setIsRecordingDone] = useState(Array(data.length).fill(false));
  const [isDisabled, setIsDisabled] = useState(false);
  const onEventRecorder = (index: number, status: boolean) => {
    const newArray = [...isRecordingDone];
    newArray[index] = status;
    setIsRecordingDone(newArray);
  };

  return (
    <Container
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={isRecordingDone.some(value => !value) || isDisabled}
      onSubmit={() => {
        setIsDisabled(true);
        onSubmit && onSubmit();
      }}
    >
      <List data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap>
            <Box height={'80px'}>
              <Label value={value?.type || ''} type={'paint'} background={value?.color} />
            </Box>
            <Box width={'70%'} height={'80px'}>
              {value?.content}
            </Box>
            {(index === 1 || isRecordingDone[index - 2]) && (
              <Box width={'30%'} hAlign='flex-end' gap='6px'>
                {value?.conversationType === 'listen' && (
                  <SimpleAudioPlayer
                    audioSrc={value?.audioSrc ?? ''}
                    onEnded={() => onEventRecorder(index - 1, true)}
                    ariaLabel={index + '번 지문 듣기 버튼'}
                  />
                )}
                {value?.conversationType === 'speak' && (
                  <Recorder
                    recorderIndex={index - 1}
                    onSubmit={() => {
                      onEventRecorder(index - 1, true);
                    }}
                    onRefresh={() => onEventRecorder(index - 1, false)}
                  />
                )}
              </Box>
            )}
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default HE00901;
