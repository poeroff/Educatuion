import { useMemo, useRef } from 'react';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  IAudioData,
  IQuestionProps,
  IRecordRefSubmitFunctionProps,
  IRecorderRef,
  ISimpleAudioPlayerRef,
  Label,
  List,
  Recorder,
  SimpleAudioPlayer,
  TMainHeaderInfoTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

interface IME11702 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  textData: IListenAndAnswer[];
  audioData?: { [key: string]: IAudioData | null };
  audioSrc: string;
  isSubmitted?: boolean;
  onSubmit?: () => void;
  recorderProcessInfo: IRecordRefSubmitFunctionProps[];
}

export interface IListenAndAnswer {
  label?: string;
  labelColor?: string;
  originText: React.ReactNode;
  inLine?: boolean;
}

const ME11702 = ({ headerInfo, questionInfo, textData, audioData, audioSrc, isSubmitted, onSubmit, recorderProcessInfo }: IME11702) => {
  const isDisabled = useMemo(() => {
    return (
      audioData &&
      !Object.keys(audioData).every(
        key => audioData[key]?.blob || audioData?.convertedText || audioData?.recordingTime || audioData?.totalAudioVolumes,
      )
    );
  }, [audioData]);

  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess(recorderProcessInfo[index - 1]);
  };

  const handleRecorderClose = (index: number) => {
    recorderRef.current.forEach((ref, idx) => {
      idx !== index && ref?.closeModal();
    });
  };

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={isDisabled || isSubmitted}
      submitBtnColor={isDisabled || isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      onSubmit={() => {
        onSubmit && onSubmit();
      }}
    >
      <Box useFull hAlign='center' flexDirection='column'>
        <Box hAlign='center' marginBottom={24}>
          <List<IListenAndAnswer> data={textData}>
            {({ value, index = 1 }) => (
              <BoxWrap boxGap={10}>
                <Box hAlign='center' alignItems='baseline'>
                  {value?.label && (
                    <Box>
                      <Label background={value?.labelColor} shape='square' marginRight={10} value={value?.label} />
                    </Box>
                  )}
                  <Box vAlign='flex-start' flexDirection='column' marginLeft={value?.inLine ? '51px' : '0px'}>
                    {value?.originText}
                  </Box>
                </Box>
              </BoxWrap>
            )}
          </List>
        </Box>
        <Box hAlign='center' marginTop='32px'>
          <SimpleAudioPlayer
            ref={ref => {
              audioRefs.current[1] = ref;
            }}
            audioSrc={audioSrc}
            ariaLabel={'듣기'}
            onChangeStatus={() => {
              handleAudioReset(1);
              handleRecorderClose(0);
            }}
          />
          <Box width={8} />
          <Recorder
            recorderIndex={recorderProcessInfo[0].subKey}
            initialData={audioData?.[recorderProcessInfo[0].subKey]}
            readOnly={isSubmitted}
            onSubmit={() => onSubmitRecorder(recorderProcessInfo[0].subKey)}
            ref={ref => {
              recorderRef.current[recorderProcessInfo[0].subKey] = ref;
            }}
            onClick={() => {
              handleRecorderClose(1);
              handleAudioReset(0);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ME11702;
