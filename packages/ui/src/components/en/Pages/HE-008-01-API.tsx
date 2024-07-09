import { TMainHeaderInfoTypes } from '@/type/Layout';

import {
  Box,
  IQuestionProps,
  List,
  Label,
  SimpleAudioPlayer,
  Recorder,
  IAudioPlayerProps,
  IAudioData,
  EStyleButtonTypes,
  IRecorderRef,
  IRecordRefSubmitFunctionProps,
  ISimpleAudioPlayerRef,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useMemo, useRef } from 'react';

export interface IListenAndAnswer {
  type?: string;
  content: React.ReactNode;
  color?: string;
  audioSrc: string;
  recorded?: boolean;
}
export interface IHE00801 {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo?: IAudioPlayerProps;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  listeningData?: boolean[];
  onListeningEnd?: (subKey: number) => void;
  audioData?: { [key: string]: IAudioData | null };
  recorderProcessInfo: IRecordRefSubmitFunctionProps[];
  onSubmit?: () => void;
  onlyListen?: boolean;
  isSubmitted?: boolean;
}

const HE00801 = ({
  headerInfo,
  audioInfo,
  questionInfo,
  data,
  listeningData,
  onListeningEnd,
  audioData,
  recorderProcessInfo,
  onSubmit,
  onlyListen = false,
  isSubmitted,
}: IHE00801) => {
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);
  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess(recorderProcessInfo[index - 1]);
  };
  const onEventListening = (index: number) => {
    onListeningEnd && onListeningEnd(index);
  };

  const handleSubmit = () => {
    onSubmit && onSubmit();
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
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={isDisabled || isSubmitted}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : !isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
      onSubmit={!onlyListen ? handleSubmit : undefined}
      useExtend
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

            <SimpleAudioPlayer
              audioSrc={value?.audioSrc ?? ''}
              ariaLabel={index + '번 지문 듣기 버튼'}
              onChangeStatus={() => {
                handleRecorderClose(0);
                handleAudioReset(index);
              }}
              onEnded={() => onEventListening(index - 1)}
              ref={ref => {
                audioRefs.current[index] = ref;
              }}
            />
            <Box marginLeft='4px'>
              {!onlyListen && (
                <Recorder
                  initialData={audioData?.[index]}
                  recorderIndex={recorderProcessInfo[index - 1].subKey}
                  readOnly={isSubmitted}
                  onClick={() => {
                    handleRecorderClose(index);
                    handleAudioReset(0);
                  }}
                  onSubmit={() => onSubmitRecorder(index)}
                  ref={ref => {
                    recorderRef.current[index] = ref;
                  }}
                />
              )}
            </Box>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default HE00801;
