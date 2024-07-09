import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  TMainHeaderInfoTypes,
  Drawing,
  Image,
  Recorder,
  IRecorderRef,
  IAudioData,
  EStyleButtonTypes,
  IQuestionProps,
  PinchZoom,
  Box,
} from '@maidt-cntn/ui';
import { useRef } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';

export interface IImageProps {
  src: string;
  alt: string;
  title: string;
  width?: string;
  height?: string;
}

export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string;
}

export interface EEL01C03A08P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  pageInfo: IPageInfo;
  text: string;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: null;
    }[][];
  }[];
}

const EEL01C03A08P01 = ({ headerInfo, questionInfo, text, imageInfo, pageInfo, getCorrectData, getDefaultData }: EEL01C03A08P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const isComplete: boolean = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);
  const initialAudioData: IAudioData | null = getValueInputData(pageInfo.mainKey, pageInfo.subKey);

  const backgroundImage = {
    src: '/writing.png',
    alt: '판서 기능',
  };

  const recorderRef = useRef<IRecorderRef>(null);

  const submitRecorder = (audioData: IAudioData) => {
    handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, audioData);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={initialAudioData ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      onSubmit={submitPageData}
      submitDisabled={!initialAudioData || isComplete}
    >
      <BoxWrap useFull>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={20} marginLeft={-35}>
          <Box
            backgroundColor={'#2f38c7'}
            padding={'4px 12px 4px 12px'}
            height={'48px'}
            borderRadius={'8px'}
            fontSize={'28px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            fontWeight={500}
            color={'#ffffff'}
            textAlign={'center'}
          >
            {text}
          </Box>
          <PinchZoom>
            <Image
              src={imageInfo.src}
              alt={imageInfo.alt}
              title={imageInfo.title}
              width={imageInfo.width}
              height={imageInfo.height}
              style={{ borderRadius: '8px' }}
            />
          </PinchZoom>
          <Recorder
            ref={recorderRef}
            recorderIndex={1}
            initialData={initialAudioData}
            onSubmit={audioData => {
              submitRecorder(audioData);
            }}
            readOnly={isComplete}
          />
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={20} justifyContent={'center'} alignItems={'center'}>
          <Drawing width={'480px'} height={'90px'} image={backgroundImage} />
          <Drawing width={'480px'} height={'90px'} image={backgroundImage} />
          <Drawing width={'480px'} height={'90px'} image={backgroundImage} />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EEL01C03A08P01;
