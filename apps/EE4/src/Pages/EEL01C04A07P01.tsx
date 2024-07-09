import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  TMainHeaderInfoTypes,
  Drawing,
  Image,
  Recorder,
  EStyleButtonTypes,
  IQuestionProps,
  PinchZoom,
  Box,
  SimpleAudioPlayer,
  TextView,
  IAudioData,
} from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import styled from 'styled-components';

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

export interface IData {
  text: string;
}

export interface IBubbleTextProps {
  text: string;
  top: string;
  left: string;
}

export interface IEEL01C04A07P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  pageInfo: IPageInfo;
  audioSrc?: string;
  data: IData[];
  bubbleText?: IBubbleTextProps;
  number?: string;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: null;
    }[][];
  }[];
}

const EEL01C04A07P01 = ({
  headerInfo,
  questionInfo,
  data,
  bubbleText,
  number,
  imageInfo,
  audioSrc,
  pageInfo,
  getCorrectData,
  getDefaultData,
}: IEEL01C04A07P01) => {
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
        <Box position={'relative'} marginTop={number ? '0px' : '30px'} marginLeft={-35}>
          {Number && <Number>{number}</Number>}
          <PinchZoom pinchType='image'>
            <Image src={imageInfo.src} alt={imageInfo.alt} title={imageInfo.title} width={imageInfo.width} height={imageInfo.height} />
          </PinchZoom>
          {bubbleText && (
            <BubbleText top={bubbleText?.top} left={bubbleText?.left}>
              {bubbleText?.text}
              {audioSrc && <SimpleAudioPlayer audioSrc={audioSrc} />}
            </BubbleText>
          )}
        </Box>
        <Box width={'556px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={20}>
          <TextView title='보기' height='120px'>
            <Box
              width={'556px'}
              height={'106px'}
              display={'flex'}
              flexDirection={'row'}
              gap={40}
              justifyContent={'center'}
              alignItems={'center'}
              fontSize={'32px'}
              fontWeight={500}
            >
              {data.map((value, index) => (
                <div key={index}>{value?.text}</div>
              ))}
            </Box>
          </TextView>
          <Drawing width='556px' height='107px' image={backgroundImage} />
          <Recorder
            recorderIndex={1}
            initialData={initialAudioData}
            onSubmit={audioData => {
              submitRecorder(audioData);
            }}
            readOnly={isComplete}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

const BubbleText = styled.div<{ top?: string; left?: string }>`
  position: absolute;
  top: ${({ top }) => top || '0%'};
  left: ${({ left }) => left || '0%'};
  height: 76px;
  border-radius: 12px;
  padding: 16px;
  background-color: #ffffff;
  font-size: 24px;
  font-weight: 500;
  color: var(--color-grey-900);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 20px solid white;
  }
`;

const Number = styled.div`
  color: #996500;
  font-weight: 800;
  font-size: 36px;
  line-height: 58px;
`;

export default EEL01C04A07P01;
