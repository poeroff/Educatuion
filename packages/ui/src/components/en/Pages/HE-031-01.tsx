import { TMainHeaderInfoTypes } from '@/type/Layout';

import { Box, IQuestionProps, Dialog, List, BoxWrap, Recorder } from '@maidt-cntn/ui';
import { Container, ExampleBox } from '@maidt-cntn/ui/en';
import { useState } from 'react';

export interface IExampleAndAnswerInfoProps {
  title: string;
  data: IExampleAndAnswerData[];
}
export interface IExampleAndAnswerData {
  type: string;
  content: React.ReactNode;
}
export interface IHE03101 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  exampleData: IExampleAndAnswerInfoProps;
  answerData: IExampleAndAnswerInfoProps;
  inputs: {};
  onSubmit?: () => void;
}

const HE03101 = ({ headerInfo, questionInfo, exampleData, answerData, inputs, onSubmit }: IHE03101) => {
  const [isRecordingDone, setIsRecordingDone] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  function allValuesPresent(obj: {}) {
    return Object.values(obj).every(value => value !== '');
  }
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={!isRecordingDone || !allValuesPresent(inputs) || isDisabled}
      onSubmit={() => {
        setIsDisabled(true);
        onSubmit && onSubmit();
      }}
    >
      <ExampleBox color={'purple'} title={exampleData.title}>
        <Box marginTop={'20px'}>
          <List data={exampleData.data}>{({ value, index = 1 }) => <BoxWrap>{value?.content}</BoxWrap>}</List>
        </Box>
      </ExampleBox>
      <Box marginTop='20px' vAlign='center' paddingLeft={'14px'}>
        <List data={answerData.data}>{({ value, index = 1 }) => <BoxWrap>{value?.content}</BoxWrap>}</List>
      </Box>
      <BoxWrap justifyContent={'center'} marginTop={'20px'}>
        <Recorder recorderIndex={0} onSubmit={() => setIsRecordingDone(true)} onRefresh={() => setIsRecordingDone(false)} />
      </BoxWrap>
    </Container>
  );
};

export default HE03101;
