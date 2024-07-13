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
  ISimpleAudioPlayerRef,
} from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/en';
import { initDataType } from '@maidt-cntn/api';
import { useEffect, useState, useRef } from 'react';

export interface IListenAndAnswer {
  content: React.ReactNode;
  audioSrc: string;
}

export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string[];
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
      value: string | null | number;
    }[][];
  }[];
}

const EE4L05C03A06bP01 = ({ headerInfo, questionInfo, data, pageInfo, getCorrectData, getDefaultData }: IEEL01C03A07P01) => {
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

  const audioPlayerRefs = useRef<ISimpleAudioPlayerRef[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const setRef = (index: number, ref: ISimpleAudioPlayerRef | null) => {
    if (ref) {
      audioPlayerRefs.current[index] = ref;
    }
  };

  const handleChangeStatus = (index: number, isPlaying: boolean) => {
    if (isPlaying) {
      setPlayingIndex(index);
    } else if (playingIndex === index) {
      setPlayingIndex(null);
    }
  };

  useEffect(() => {
    audioPlayerRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index !== playingIndex) {
          ref.changePlayStatus(false);
        }
      }
    });
  }, [playingIndex]);

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
            <Box width={'70%'} height={'80px'} display={'flex'} paddingLeft={'70px'} alignItems='center'>
              <div>{value?.content}</div>
            </Box>
            <Box width={'30%'} height={'80px'} hAlign='flex-end' gap='6px' paddingRight={'70px'}>
              <SimpleAudioPlayer
                audioSrc={value?.audioSrc ?? ''}
                onChangeStatus={isPlaying => handleChangeStatus(index, isPlaying)}
                ref={ref => setRef(index, ref)}
              />
              <Recorder
                recorderIndex={index - 1}
                onSubmit={audioData => submitRecorder(index - 1, audioData)}
                onRefresh={() => submitRecorder(index - 1, null)}
                initialData={initialAudioData(index - 1)}
                readOnly={isComplete(index - 1)}
              />
            </Box>
          </BoxWrap>
        )}
      </List>
    </Container>
  );
};

export default EE4L05C03A06bP01;
