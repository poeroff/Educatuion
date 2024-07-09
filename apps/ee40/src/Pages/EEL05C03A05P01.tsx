import {
  Box,
  IQuestionProps,
  List,
  BoxWrap,
  EStyleButtonTypes,
  SimpleAudioPlayer,
  Recorder,
  TMainHeaderInfoTypes,
  PinchZoom,
  Image,
  Typography,
  IAudioData,
} from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/en';
import { correctDataType, initDataType } from '@maidt-cntn/api';
import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { currentPageSubmittedData } from '@/stores';

export type IListenAndAnswer = {
  content: React.ReactNode;
  audioSrc: string;
};

interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string;
}

interface ImageInfo {
  width: string;
  height: string;
  src: string;
  alt: string;
}

interface IEEL05C03A05P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  pageInfo: IPageInfo;
  imageInfo: ImageInfo;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
}

const EEL05C03A05P01 = ({ headerInfo, questionInfo, data, pageInfo, getCorrectData, getDefaultData, imageInfo }: IEEL05C03A05P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const [isRecordingDone, setIsRecordingDone] = useState(Array(data.length).fill(false));
  const [isDisabled, setIsDisabled] = useState(isSubmittedInput(pageInfo.mainKey, pageInfo.subKey));
  const isSubmit = useRecoilValue(currentPageSubmittedData);

  const isRecording = (): boolean => {
    const initialDataList = Array.from({ length: data.length }, (_, index) => getRecorderData(index));
    return initialDataList.every(data => data !== null);
  };

  // const onEventRecorder = (index: number, status: boolean) => {
  //   const newArray = [...isRecordingDone];
  //   newArray[index] = status;
  //   setIsRecordingDone(newArray);
  // };

  const getRecorderData = (index: number): IAudioData | null => {
    const data = getValueInputData(pageInfo.mainKey, `RECORDER-${index}`);
    return data && data !== '' ? data : null;
  };

  const handleRecoderSubmit = (index: number, audioData: IAudioData) => {
    console.log(index);
    handleChangeInputData(pageInfo.mainKey, `RECORDER-${index}`, audioData);

    // setIsRecorded(prevState => {
    //   const newState = [...prevState];
    //   newState[index] = true;
    //   return newState;
    // });
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={isRecording() ? (isSubmit ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isRecording() || isSubmit}
      onSubmit={() => {
        // setIsDisabled(true);
        submitPageData();
      }}
      useExtend
    >
      <BoxWrap useFull display='flex' alignItems='center' justifyContent='center'>
        <Box marginRight={20}>
          <PinchZoom pinchType='image'>
            <Image width={imageInfo.width} height={imageInfo.height} src={imageInfo.src} alt={imageInfo.alt} />
          </PinchZoom>
        </Box>
        <List data={data}>
          {({ value, index = 1 }) => (
            <BtnList key={index}>
              <Typography weight={800}>{value?.content}</Typography>
              <SimpleAudioPlayer audioSrc={value?.audioSrc ?? ''} />
              <Recorder
                recorderIndex={index - 1}
                onSubmit={audioData => handleRecoderSubmit((index - 1) as number, audioData)}
                initialData={getRecorderData(index - 1)}
              />
            </BtnList>
          )}
        </List>
      </BoxWrap>
    </Container>
  );
};

export default EEL05C03A05P01;

const BtnList = styled.div`
  width: 498px;
  height: 58px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;

  & > span {
    width: 274px;
    font-size: 32px;
  }

  button:first-of-type {
    margin-right: 5px;
  }
`;
