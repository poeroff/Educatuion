import {
  Box,
  TMainHeaderInfoTypes,
  Recorder,
  IQuestionProps,
  IAudioData,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useMemo, useState } from 'react';
type TAnswerLabelType = '모범답안' | '예시답안';
export interface IListenAndAnswer {
  originText: string;
  translation: string;
}
export interface IHE02102 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  textNode?: React.ReactNode;
  answer?: { [key: string]: string };
  solution?: IListenAndAnswer;
  audioData?: IAudioData;
  onRecordEnd?: (audioData: IAudioData) => void;
  onSubmit?: () => void;
  isSubmitted?: boolean;
  answerLabel?: TAnswerLabelType;
}

const HE02102 = ({
  headerInfo,
  questionInfo,
  textNode,
  answer,
  solution,
  audioData,
  onRecordEnd,
  onSubmit,
  isSubmitted,
  answerLabel = '예시답안',
}: IHE02102) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const onEventRecorder = (audioData: IAudioData) => {
    onRecordEnd && onRecordEnd(audioData);
  };
  const handleSubmit = () => {
    if (isSubmitted) {
      setIsShow(prevState => !prevState);
      return;
    } else {
      onSubmit && onSubmit();
    }
  };

  const isDisabled = useMemo(() => {
    const answerDisabled = answer && Object.keys(answer).some(key => !answer[key]);
    const audioDisabled = audioData && !(audioData?.blob || audioData?.convertedText || audioData?.recordingTime || audioData?.totalAudioVolumes);
    return answerDisabled || audioDisabled || (!solution && isSubmitted);
  }, [answer, audioData, solution, isSubmitted]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitDisabled={isDisabled}
      submitLabel={solution && isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={solution && !isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
    >
      {textNode}
      {audioData && (
        <Box hAlign='center' marginTop='20px'>
          <Recorder
            initialData={audioData}
            recorderIndex={0}
            onSubmit={audioData => onEventRecorder(audioData)}
            onRefresh={() => onEventRecorder({})}
          />
        </Box>
      )}

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={answerLabel} />
          </Box>
          <Box vAlign='flex-start' marginTop='10px' textAlign='left' tabIndex={103} flexDirection='column' gap='10px'>
            <Typography> {solution?.originText} </Typography>
            <Typography> {solution?.translation} </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02102;
