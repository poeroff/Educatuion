import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  TMainHeaderInfoTypes,
  Image,
  EStyleButtonTypes,
  IQuestionProps,
  PinchZoom,
  Box,
  IAudioPlayerProps,
  List,
  Radio,
  Label,
  Typography,
  Tag,
  ETagLine,
  BottomSheet,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';

export interface IImageProps {
  src: string;
  alt: string;
  title: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}

export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string;
}

export interface EEL01C04A04P01 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  pageInfo: IPageInfo;
  audioInfo: IAudioPlayerProps;
  data: Array<{ text: string }>;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: number;
    }[][];
  }[];
}

const EEL01C04A04P01 = ({ headerInfo, questionInfo, data, imageInfo, audioInfo, pageInfo, getCorrectData, getDefaultData }: EEL01C04A04P01) => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: any) => {
    changeInputData(mainKey, subKey, value);
  };

  const gradeData = useRecoilValue(currentPageGradeData);
  const [isOpen, setIsOpen] = useState(false);

  const isComplete: boolean = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);
  const isCorrect = gradeData.find(data => data.mainKey === pageInfo.mainKey)?.isCorrect;
  const correctAnswer = {
    value: getCorrectData(1)[0].inputDatas[0][0].value,
  };
  const currentAnswer = getValueInputData(pageInfo.mainKey, pageInfo.subKey);
  questionInfo.mark = isComplete ? (isCorrect ? 'correct' : 'star') : 'none';

  const handleSubmit = () => {
    if (!isComplete) {
      gradeSubmitPageData();
      return;
    }
    setIsOpen(!isOpen);
  };

  const validationCheck = () => {
    return currentAnswer == null || currentAnswer == undefined || typeof currentAnswer != 'number';
  };

  const handleClick = (index: number) => {
    if (currentAnswer == index) handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, null);
    else handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, index);
  };

  return (
    <>
      <Container
        headerInfo={headerInfo}
        questionInfo={questionInfo}
        submitDisabled={validationCheck()}
        submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
        submitBtnColor={validationCheck() || isOpen ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW}
        onSubmit={handleSubmit}
        audioInfo={audioInfo}
        bodyId='targetContainer'
      >
        <BoxWrap useFull>
          <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} flexDirection={'row'} marginLeft={-35}>
              <Box hAlign={'center'} marginRight={'40px'}>
                <PinchZoom>
                  <Image
                    src={imageInfo.src}
                    alt={imageInfo.alt}
                    title={imageInfo.title}
                    width={imageInfo.width}
                    height={imageInfo.height}
                    style={imageInfo.style}
                  />
                </PinchZoom>
              </Box>
              <Box useFull useRound width={'146px'} hAlign={'center'} vAlign={'center'}>
                <List
                  gap={20}
                  data={data}
                  row={({ value, index = 1 }) => (
                    <Radio
                      type='square'
                      align='horizontal'
                      isError={isComplete && !isCorrect}
                      label={index.toString()}
                      value={index === (getValueInputData(pageInfo.mainKey, pageInfo.subKey) as Number)}
                      onClick={() => {
                        handleClick(index);
                      }}
                      disabled={isComplete}
                    >
                      <Box display={'flex'} alignItems={'center'} gap={'10px'} width={'120px'}>
                        <Label value={index} /> {value?.text}
                      </Box>
                    </Radio>
                  )}
                />
              </Box>
            </Box>
            <Box display={'flex'} flexDirection={'row'} marginLeft={-35}>
              {isOpen && (
                <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
                  <Box background='lightGray' marginBottom={25} borderRadius='12px' marginTop='48px' width={'952px'}>
                    <Box margin='25px 0'>
                      <Tag fontSize={'22px'} height={'auto'} label={'답안'} type={ETagLine.GREEN} width={'auto'} />
                      <Box margin={'25px 0 50px'}>
                        <Typography>{correctAnswer.value}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </BottomSheet>
              )}
            </Box>
          </Box>
        </BoxWrap>
      </Container>
    </>
  );
};

export default EEL01C04A04P01;
