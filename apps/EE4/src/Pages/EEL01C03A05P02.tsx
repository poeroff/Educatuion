import {
  Box,
  IQuestionProps,
  IAudioPlayerProps,
  SimpleAudioPlayer,
  Recorder,
  TMainHeaderInfoTypes,
  PinchZoom,
  Image,
  Typography,
  ToggleButton,
  EStyleButtonTypes,
  IAudioData,
} from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/en';
import { initDataType } from '@maidt-cntn/api';
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
}

interface ImageInfo {
  width: string;
  height: string;
  src: string;
  alt: string;
}

interface EEL01C03A05P02 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: any[];
  pageInfo: IPageInfo;
  imageInfo: ImageInfo;
  audioInfo: IAudioPlayerProps;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | null;
    }[][];
  }[];
}

const EEL01C03A05P02 = ({ headerInfo, questionInfo, pageInfo, getCorrectData, getDefaultData, imageInfo, audioInfo, data }: EEL01C03A05P02) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const isSubmit = useRecoilValue(currentPageSubmittedData);

  const isRecording = (): boolean => {
    const initialDataList = Array.from({ length: data.length }, (_, index) => getRecorderData(index));
    return initialDataList.every(data => data !== null);
  };

  const getRecorderData = (index: number): IAudioData | null => {
    const data = getValueInputData(pageInfo.mainKey, `RECORDER-${index}`);
    return data && data !== '' ? data : null;
  };

  const handleRecoderSubmit = (index: number, audioData: IAudioData) => {
    handleChangeInputData(pageInfo.mainKey, `RECORDER-${index}`, audioData);
  };

  const handleSubmit = () => {
    submitPageData();
  };

  return (
    <Container
      headerInfo={headerInfo}
      submitLabel={'완료하기'}
      submitBtnColor={isRecording() ? (isSubmit ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isRecording() || isSubmit}
      onSubmit={handleSubmit}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
    >
      <Box hAlign='center'>
        <Box useFull width='467px' height='394px' marginRight={20} display='flex' alignItems='center'>
          <PinchZoom pinchType='image'>
            <Image width={imageInfo.width} height={'auto'} src={imageInfo.src} alt={imageInfo.alt} />
          </PinchZoom>
        </Box>
        <Box width='498px' height='382px'>
          <AlignWrap>
            <ToggleButton id='toggle' isTranslation isChecked={isOpen} onClick={() => setIsOpen(prev => !prev)} />
            {data.map((item, index) => {
              const parts = item.en.split(new RegExp(`(${item.red})`, 'gi'));
              return (
                <ToggleWrap key={index}>
                  <ToggleBox>
                    <Typography weight={800}>
                      {parts.map((part: any, i: number) => (
                        <span key={i} style={{ color: part.toLowerCase() === item.red.toLowerCase() ? 'red' : 'inherit' }}>
                          {part}
                        </span>
                      ))}
                      {isOpen && <KoreanSpeech>{item.ko}</KoreanSpeech>}
                    </Typography>
                  </ToggleBox>
                  <BtnWrap>
                    <SimpleAudioPlayer audioSrc={item.audioSrc} />
                    <Recorder
                      recorderIndex={index}
                      onSubmit={audioData => handleRecoderSubmit(index as number, audioData)}
                      initialData={getRecorderData(index)}
                    />
                  </BtnWrap>
                </ToggleWrap>
              );
            })}
          </AlignWrap>
        </Box>
      </Box>
    </Container>
  );
};

export default EEL01C03A05P02;

const AlignWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const ToggleWrap = styled.div`
  width: 100%;
  height: 162px;
  display: flex;
  flex-direction: column;
`;

const KoreanSpeech = styled.p`
  color: #2f38c7;
  font-weight: normal;
`;

const ToggleBox = styled.div`
  width: 100%;
  height: 100px;
`;

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  right: 30px;
  button:first-of-type {
    margin-right: 5px;
  }
`;
