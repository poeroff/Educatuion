import { Container } from '@maidt-cntn/ui/en';
import {
  ETagLine,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Box,
  PinchZoom,
  Image,
  Textarea,
  Typography,
  IQuestionProps,
  Tag,
  IAudioPlayerProps,
  BottomSheet,
} from '@maidt-cntn/ui';
import { useState } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { correctDataType, initDataType } from '@maidt-cntn/api';

type Image = {
  src: string | string[];
  alt: string;
  value?: string;
  title?: string;
};

type pageData = {
  pageNumber: number;
  mainKey: number;
  subKey: string;
  getDefaultData: (mainKey: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
};

interface Props {
  layout: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    audioInfo?: IAudioPlayerProps;
  };
  imgArr: Image[];
  pageData: pageData;
}

const EE40L01C01A05P01 = ({ layout, imgArr, pageData }: Props) => {
  const CONST = { ...layout };
  const { mainKey, subKey, pageNumber, getDefaultData, getCorrectData } = pageData;

  const [isOpen, setIsOpen] = useState(false);
  const [images] = useState<Image[]>(imgArr);

  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const getCorrectAnswer = (pageNumber: number, mainKey: number, subKey: string) => {
    const data = getCorrectData(pageNumber).find(item => item.mainKey === mainKey);
    if (data) {
      return data?.inputDatas?.flat().find(item => item.subKey === subKey)?.value;
    }
    return null;
  };

  const isComplete: boolean = isSubmittedInput(mainKey, subKey);
  const correctAnswer = getCorrectAnswer(pageData.pageNumber, mainKey, subKey);
  const currentAnswer = getValueInputData(mainKey, subKey);

  const validationCheck = () => {
    return currentAnswer === null || (typeof currentAnswer === 'string' && currentAnswer.trim().length === 0);
  };

  const completeQnA = () => {
    if (isComplete) {
      setIsOpen(!isOpen);
      return;
    }
    submitPageData();
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      useExtend
      submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={!validationCheck() ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={validationCheck()}
      onSubmit={completeQnA}
      audioInfo={CONST.audioInfo}
    >
      <Box useFull>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' marginBottom='32px'>
          <PinchZoom
          // tabIndex={102}
          >
            <Image src={images[0].src} alt={images[0].alt} height='360px' width='480px' title={images[0].title} style={{ borderRadius: '8px' }} />
          </PinchZoom>
          <Box width='480px' height='394px' hAlign='center' gap='24px'>
            <Textarea
              placeholder='내용을 넣어주세요.'
              value={getValueInputData(mainKey, subKey) as string}
              onChange={e => {
                handleChangeInputData(mainKey, subKey, e.target.value);
              }}
              width='480px'
              height='180px'
              // fontSize='32px'
              // fontWeight='500'
              // lineHeight='48px'
              disabled={isComplete}
            />
          </Box>
        </Box>
        {isOpen && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
            <Box marginBottom='25px' background='gray' padding='28px' useRound>
              <Box margin='25px 0'>
                <Tag fontSize='22px' height='auto' label='예시 답안' type={ETagLine.GREEN} width='auto' />
                <Box margin='25px 0 50px'>
                  <Typography>{correctAnswer as string}</Typography>
                </Box>
              </Box>
            </Box>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

export default EE40L01C01A05P01;
