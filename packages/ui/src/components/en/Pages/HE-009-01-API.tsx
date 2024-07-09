import { TMainHeaderInfoTypes } from '@/type/Layout';

import {
  Box,
  IQuestionProps,
  List,
  BoxWrap,
  Label,
  SimpleAudioPlayer,
  Recorder,
  IAudioData,
  EStyleButtonTypes,
  IRecordRefSubmitFunctionProps,
  IRecorderRef,
  ISimpleAudioPlayerRef,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import React, { useMemo, useRef } from 'react';

export interface IListenAndAnswer {
  type: string;
  conversationType: string;
  content: React.ReactNode;
  color?: string;
  audioSrc?: string;
}
export interface IHE00901 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  listeningData?: boolean[];
  audioData?: { [key: string]: IAudioData | null };
  recorderProcessInfo: IRecordRefSubmitFunctionProps[];
  onListeningEnd?: (subKey: number) => void;
  onSubmit?: () => void;
  isSubmitted?: boolean;
}

const HE00901 = ({
  headerInfo,
  questionInfo,
  data,
  listeningData,
  audioData,
  recorderProcessInfo,
  onListeningEnd,
  onSubmit,
  isSubmitted,
}: IHE00901) => {
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);
  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[recorderProcessInfo[index].subKey]?.onSubmitRecorderProcess(recorderProcessInfo[index]);
  };

  const onEventListening = (index: number) => {
    onListeningEnd && onListeningEnd(index);
  };

  const isDisabled = useMemo(() => {
    return (
      (listeningData && listeningData.some(value => !value)) ||
      (audioData &&
        !Object.keys(audioData).every(
          key => audioData[key]?.blob || audioData?.convertedText || audioData?.recordingTime || audioData?.totalAudioVolumes,
        ))
    );
  }, [listeningData, audioData]);

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={isDisabled || isSubmitted}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : !isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        onSubmit && onSubmit();
      }}
    >
      <List data={data}>
        {({ value, index = 1 }) => {
          return (
            <BoxWrap marginBottom={'20px'}>
              <Box>
                <Label value={value?.type || ''} type={'paint'} background={value?.color} />
              </Box>
              <Box width={'80%'}>{value?.content}</Box>
              {
                <Box width={'20%'} hAlign='flex-end' vAlign='flex-start'>
                  {(index === 1 ||
                    (value?.conversationType === 'listen' && audioData?.[recorderProcessInfo[(index - 1) / 2 - 1].subKey]?.convertedText)) && (
                    <SimpleAudioPlayer
                      audioSrc={value?.audioSrc ?? ''}
                      ariaLabel={(index - 1) / 2 + 1 + '번 지문 듣기 버튼'}
                      onEnded={() => onEventListening(index)}
                      onChangeStatus={() => {
                        handleAudioReset(index);
                        handleRecorderClose(0);
                      }}
                      ref={ref => {
                        audioRefs.current[index] = ref;
                      }}
                    />
                  )}
                  {value?.conversationType === 'speak' && listeningData?.[index / 2 - 1] === true && (
                    <Recorder
                      initialData={audioData?.[recorderProcessInfo[index / 2 - 1].subKey]}
                      recorderIndex={recorderProcessInfo[index / 2 - 1].subKey}
                      readOnly={isSubmitted}
                      onClick={() => {
                        handleRecorderClose(index);
                        handleAudioReset(0);
                      }}
                      onSubmit={() => onSubmitRecorder(index / 2 - 1)}
                      ref={ref => {
                        recorderRef.current[index] = ref;
                      }}
                    />
                  )}
                </Box>
              }
            </BoxWrap>
          );
        }}
      </List>
    </Container>
  );
};

export default HE00901;
