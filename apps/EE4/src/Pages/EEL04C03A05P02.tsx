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
  IRecorderRef,
} from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { Container } from '@maidt-cntn/ui/en';
import { correctDataType, initDataType } from '@maidt-cntn/api';
import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { currentPageSubmittedData } from '@/stores';
import { useEffect } from 'react';

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

interface EEL04C03A05P02 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: any[];
  pageInfo: IPageInfo;
  imageInfo: ImageInfo;
  audioInfo: IAudioPlayerProps;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
}

const EEL04C03A05P02 = ({ headerInfo, questionInfo, pageInfo, getCorrectData, getDefaultData, imageInfo, audioInfo, data }: EEL04C03A05P02) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const isSubmit = useRecoilValue(currentPageSubmittedData);
  // const [isRecorded, setIsRecorded] = useState<boolean[]>(new Array(data.length).fill(false));
  // const recorderRef = useRef<IRecorderRef>(null);

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

    // setIsRecorded(prevState => {
    //   const newState = [...prevState];
    //   newState[index] = true;
    //   return newState;
    // });
  };

  const handleSubmit = () => {
    submitPageData();
  };

  // useEffect(() => {
  //   console.log('녹음체크 >>> ', isRecorded);
  // }, [isRecorded]);

  return (
    <Container
      headerInfo={headerInfo}
      submitLabel={'완료하기'}
      // submitBtnColor={isRecorded.every(Boolean) ? (isSubmit ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      // submitDisabled={isSubmit || !isRecorded.every(Boolean)}
      submitBtnColor={isRecording() ? (isSubmit ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isRecording() || isSubmit}
      onSubmit={handleSubmit}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
    >
      <Box hAlign='center'>
        <Box useFull width='389px' height='394px' marginRight={20} display='flex' alignItems='center'>
          <PinchZoom pinchType='image'>
            <Image width={'100%'} height={'auto'} src={imageInfo.src} alt={imageInfo.alt} />
          </PinchZoom>
        </Box>

        <Box width='498px' height='382px'>
          <AlignWrap>
            <ToggleButton id='toggle' isTranslation isChecked={isOpen} onClick={() => setIsOpen(prev => !prev)} />

            {data.map((item, index) => {
              const reds: string[] = Array.isArray(item.red) ? item.red : [item.red];
              const parts = item.en.split(new RegExp(`(${reds.join('|')})`, 'gi'));
              return (
                <ToggleWrap key={index}>
                  <ScriptWrap style={{ height: item?.en.includes('\n') ? '225px' : '100%' }}>
                    <Typography weight={800}>
                      {parts.map((part: any, i: number) => (
                        <span key={i} style={{ color: reds.includes(part.toLowerCase()) ? 'red' : 'inherit' }}>
                          {part}
                        </span>
                      ))}
                    </Typography>
                    {isOpen && <Typography color='#2F38C7'>{item.ko}</Typography>}
                  </ScriptWrap>
                  <BtnWrap>
                    <SimpleAudioPlayer audioSrc={item.audioSrc} />

                    <Recorder
                      recorderIndex={index}
                      onSubmit={audioData => handleRecoderSubmit(index as number, audioData)}
                      // ref={recorderRef}
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

export default EEL04C03A05P02;

export const AlignWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export const ToggleWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
`;

export const ScriptWrap = styled.div`
  width: 343px;
  /* height: 162px; */
  display: flex;
  flex-direction: column;
  word-break: keep-all;
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 12px;
  button:first-of-type {
    margin-right: 5px;
  }
`;
