import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  TMainHeaderInfoTypes,
  Image,
  Recorder,
  EStyleButtonTypes,
  IQuestionProps,
  PinchZoom,
  Box,
  Drawing,
  Textarea,
  Tag,
  Typography,
  ETagLine,
  Scroll,
} from '@maidt-cntn/ui';
import { useState } from 'react';
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

export interface IEEL10C03A06P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  pageInfo: IPageInfo;
  bubbleText?: string;
  number?: string;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | null;
    }[][];
  }[];
}

const EEL10C03A06P01 = ({ headerInfo, questionInfo, imageInfo, pageInfo, getCorrectData, getDefaultData }: IEEL10C03A06P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const completeQnA = () => {
    if (!isComplete) return gradeSubmitPageData();
    setShowIs(!showIs);
  };

  const [showIs, setShowIs] = useState(false);
  const isComplete: boolean = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);
  const correctAnswer = getCorrectData(pageInfo.pageNum)[0].inputDatas[0][0].value;

  const currentAnswer = getValueInputData(pageInfo.mainKey, pageInfo.subKey);

  const validationCheck = () => {
    return currentAnswer === null || (typeof currentAnswer === 'string' && currentAnswer.trim().length === 0);
  };

  const backgroundImage = {
    src: '/writing.png',
    alt: '판서 기능',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isComplete ? (showIs ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!validationCheck() ? (showIs ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={validationCheck()}
      onSubmit={completeQnA}
      useExtend
    >
      <Box useFull>
        <BoxWrap>
          <Box useFull borderRadius={8}>
            <PinchZoom pinchType='image'>
              <Image src={imageInfo.src} alt={imageInfo.alt} title={imageInfo.title} width={imageInfo.width} height={imageInfo.height} />
            </PinchZoom>
          </Box>
          <Box width={'480px'} display='flex' flexDirection='column' justifyContent='center'>
            <Box marginBottom={40}>
              <Textarea
                placeholder='내용을 넣어 주세요.'
                value={currentAnswer as string}
                onChange={e => handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, e.target.value)}
                width={'480px'}
                height={'120px'}
                disabled={isComplete}
              />
            </Box>
            <Drawing width='480px' height='107px' image={backgroundImage} />
          </Box>
        </BoxWrap>
        {showIs && (
          <Box marginTop='25px' background='gray' padding='28px' useRound>
            <Box margin='25px 0'>
              <Tag fontSize='22px' height='auto' label='답안' type={ETagLine.GREEN} width='auto' />
              <Box margin='25px 0 50px'>
                <Typography>{correctAnswer}</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default EEL10C03A06P01;
