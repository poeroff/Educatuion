import { TMainHeaderInfoTypes } from '@/type/Layout';

import {
  IQuestionProps,
  List,
  BoxWrap,
  Recorder,
  IAudioData,
  EStyleButtonTypes,
  IRecordRefSubmitFunctionProps,
  IRecorderRef,
  Box,
} from '@maidt-cntn/ui';
import { Container, ExampleBox } from '@maidt-cntn/ui/en';
import { useMemo, useRef } from 'react';

type ColorTypes = 'purple' | 'blue' | 'green' | 'yellow' | 'emerald' | 'pink';

export interface IExampleAndAnswerInfoProps {
  title?: string;
  color?: ColorTypes;
  data: IExampleAndAnswerData[];
}
export interface IExampleAndAnswerData {
  type?: string;
  content: React.ReactNode;
}
export interface IHE03101 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  exampleData: IExampleAndAnswerInfoProps;
  answerData: IExampleAndAnswerInfoProps;
  audioData?: { [key: string]: IAudioData | null };
  recorderProcessInfo: IRecordRefSubmitFunctionProps[];
  inputs: {};
  onSubmit?: () => void;
  isSubmitted?: boolean;
}

const HE03101 = ({ headerInfo, questionInfo, exampleData, answerData, audioData, recorderProcessInfo, inputs, onSubmit, isSubmitted }: IHE03101) => {
  const recorderRef = useRef<(IRecorderRef | null)[]>([]);
  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.[index]?.onSubmitRecorderProcess(recorderProcessInfo[index - 1]);
  };
  function allValuesPresent(obj: {}) {
    return Object.values(obj).every(value => value !== '');
  }
  const isDisabled = useMemo(() => {
    return (
      !allValuesPresent(inputs) ||
      (audioData &&
        !Object.keys(audioData).every(
          key => audioData[key]?.blob || audioData?.convertedText || audioData?.recordingTime || audioData?.totalAudioVolumes,
        ))
    );
  }, [audioData, inputs]);

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
      <ExampleBox color={exampleData.color ?? 'purple'} title={exampleData.title}>
        <List data={exampleData.data}>{({ value }) => <BoxWrap>{value?.content}</BoxWrap>}</List>
      </ExampleBox>
      <Box alignItems={'baseline'} paddingLeft={'14px'} marginTop={'20px'}>
        {answerData.data.map(val => (
          <>{val.content}</>
        ))}
      </Box>
      <BoxWrap display='flex' justifyContent={'center'} marginTop={'20px'}>
        <Recorder
          recorderIndex={recorderProcessInfo[0].subKey}
          initialData={audioData?.[recorderProcessInfo[0].subKey]}
          readOnly={isSubmitted}
          onSubmit={() => onSubmitRecorder(recorderProcessInfo[0].subKey)}
          ref={ref => {
            recorderRef.current[recorderProcessInfo[0].subKey] = ref;
          }}
        />
      </BoxWrap>
    </Container>
  );
};

export default HE03101;
