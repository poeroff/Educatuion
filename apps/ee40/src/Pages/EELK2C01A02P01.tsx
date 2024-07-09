import {
  Box,
  IQuestionProps,
  List,
  BoxWrap,
  EStyleButtonTypes,
  SimpleAudioPlayer,
  Recorder,
  IAudioData,
  TMainHeaderInfoTypes,
  Label,
  Typography,
} from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/en';
import { initDataType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
export interface IListenAndAnswer {
  content: React.ReactNode;
  subContent?: React.ReactNode;
  audioSrc: string;
}

export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string[];
}

export interface IEELK2C01A02P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  pageInfo: IPageInfo;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | null;
    }[][];
  }[];
}

const EELK2C01A02P01 = ({ headerInfo, questionInfo, data, pageInfo, getCorrectData, getDefaultData }: IEELK2C01A02P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const submitRecorder = (index: number, audioData?: IAudioData | null) => {
    handleChangeInputData(pageInfo.mainKey, pageInfo.subKey[index], audioData);
  };

  const initialAudioData = (index: number): IAudioData | null => {
    return getValueInputData(pageInfo.mainKey, pageInfo.subKey[index]);
  };

  const isComplete = (index: number): boolean => {
    return isSubmittedInput(pageInfo.mainKey, pageInfo.subKey[index]);
  };

  const checkAudioDataNotNull = (): boolean => {
    return data.every((item, index) => initialAudioData(index));
  };

  const isAllComplete = (): boolean => {
    return data.every((item, index) => isComplete(index));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitDisabled={!checkAudioDataNotNull() || isAllComplete()}
      submitBtnColor={checkAudioDataNotNull() ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      onSubmit={submitPageData}
    >
      <List data={data}>
        {({ value, index = 0 }) => (
          <BoxWrap>
            <BoxWrap width={'70%'} height={value?.subContent ? '128px' : '64px'} paddingLeft={'70px'}>
              <Box>
                <Label background='#FFB400' type='paint' size='xx-small' />
              </Box>
              <Box display='flex' flexDirection='column' gap={10}>
                <Typography weight={500} fontSize='32px'>
                  {value?.content}
                </Typography>
                <Typography weight={500} fontSize='32px'>
                  {value?.subContent}
                </Typography>
              </Box>
            </BoxWrap>
            <Box width={'30%'} height={'80px'} hAlign='flex-end' gap='6px' paddingRight={'70px'}>
              <SimpleAudioPlayer audioSrc={value?.audioSrc ?? ''} />
              <Recorder
                recorderIndex={index - 1}
                onSubmit={audioData => submitRecorder(index - 1, audioData)}
                onRefresh={() => submitRecorder(index - 1, null)}
                initialData={initialAudioData(index - 1)}
              />
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default EELK2C01A02P01;
