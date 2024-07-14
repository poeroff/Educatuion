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
  Textarea,
  Tag,
  Typography,
  ETagPaint,
  ETagLine,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';

export interface IImageProps {
  src: string;
  alt: string;
  title: string;
  width?: string;
  height?: string;
  imgNum?: number;
}

export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string;
}

export interface IData {
  text: string;
}

export interface IEEL03C04A06P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  pageInfo: IPageInfo;
  data: IData[];
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

  // textareaWidth?: string;
  // textareaHeight?: string;
}

const EE4L04C03A07a = ({
  headerInfo,
  questionInfo,
  data,
  imageInfo,
  pageInfo,

  // textareaWidth,
  // textareaHeight,
  getCorrectData,
  getDefaultData,
}: IEEL03C04A06P01) => {
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
  const gradeData = useRecoilValue(currentPageGradeData);
  const isCorrect = gradeData.find(data => data.mainKey === pageInfo.mainKey)?.isCorrect;
  const correctAnswer = getCorrectData(pageInfo.pageNum)[0].inputDatas[0][0].value;

  const currentAnswer = getValueInputData(pageInfo.mainKey, pageInfo.subKey);

  const validationCheck = () => {
    return currentAnswer === null || (typeof currentAnswer === 'string' && currentAnswer.trim().length === 0);
  };
  const handleRecoderSubmit = () => {
    changeInputData(pageInfo.mainKey, 'RECORDER-1', true);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={{
        ...questionInfo,
        mark: isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
        markSize: 'middle',
      }}
      submitLabel={isComplete ? (showIs ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!validationCheck() ? (showIs ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={validationCheck()}
      onSubmit={completeQnA}
      useExtend
    >
      <Box useFull>
        <Box
          width={'440px'}
          height={120}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          margin={'auto'}
          marginBottom={40}
          float='left'
          marginTop={'5%'}
        >
          <TextView title='보기' height='346px'>
            <Box
              width={'308px'}
              height={'306px'}
              display={'flex'}
              flexDirection={'column'}
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
        </Box>

        <Box useFull height={184} marginTop='2.5%'>
          <Box width='480px' marginLeft='47.5%'>
            <Image src={imageInfo.src} alt={imageInfo.alt} title={imageInfo.title} width={imageInfo.width} height={imageInfo.height} />

            <Box marginBottom={40} marginTop={20}>
              <Textarea
                placeholder='내용을 넣어 주세요.'
                value={currentAnswer as string}
                onChange={e => handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, e.target.value)}
                width={imageInfo.width}
                height={'75px'}
                disabled={isComplete}
              />
            </Box>
            <Box vAlign='center' hAlign='center'>
              <Recorder
                recorderIndex={1}
                onSubmit={() => {
                  handleRecoderSubmit();
                }}
              />
            </Box>
          </Box>
        </Box>
        {showIs && (
          <Box marginTop='205px' background='gray' padding='28px' useRound>
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

export default EE4L04C03A07a;
