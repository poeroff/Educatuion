import { Box, IQuestionProps, List, BoxWrap, EStyleButtonTypes, SimpleAudioPlayer, Recorder, TMainHeaderInfoTypes, Checkbox } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/en';
import { initDataType } from '@maidt-cntn/api';
import { useState } from 'react';

export interface IListenAndAnswer {
  content: React.ReactNode;
  audioSrc: string;
}

export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string;
}

export interface IEEL01C03A07P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  pageInfo: IPageInfo;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string;
    }[][];
  }[];
}

const EE4L04C03A07bP01 = ({ headerInfo, questionInfo, data, pageInfo, getCorrectData, getDefaultData }: IEEL01C03A07P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const [isRecordingDone, setIsRecordingDone] = useState(Array(data.length).fill(false));
  const [isDisabled, setIsDisabled] = useState(isSubmittedInput(pageInfo.mainKey, pageInfo.subKey));
  const onEventRecorder = (index: number, status: boolean) => {
    const newArray = [...isRecordingDone];
    newArray[index] = status;
    setIsRecordingDone(newArray);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={isRecordingDone.some(value => !value) || isDisabled}
      submitBtnColor={!isRecordingDone.some(value => !value) ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        setIsDisabled(true);
        submitPageData();
      }}
    >
      <List data={data}>
        {({ value, index = 1 }) => (
          <BoxWrap>
            <Box width={'70%'} height={'80px'} display={'flex'} paddingLeft={'70px'} alignItems='center'>
              <div>{value?.content}</div>
            </Box>
            <Box width={'30%'} height={'80px'} hAlign='flex-end' gap='6px' paddingRight={'70px'}>
              <SimpleAudioPlayer audioSrc={value?.audioSrc ?? ''} />
              <Recorder
                recorderIndex={index - 1}
                onSubmit={() => onEventRecorder(index - 1, true)}
                onRefresh={() => onEventRecorder(index - 1, false)}
              />
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default EE4L04C03A07bP01;
