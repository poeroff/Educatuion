import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  PinchZoom,
  Image,
  Textarea,
  Typography,
  IQuestionProps,
  Tag,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  ETagLine,
  BottomSheet,
} from '@maidt-cntn/ui';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { initDataType } from '@maidt-cntn/api';
import { currentPageGradeData } from '@/stores';
import { useRecoilValue } from 'recoil';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  image: { src: string; alt: string };
  mainKey: number;
  subKey: string;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | boolean | number | string[];
    }[][];
  }[];
  getSolutionData: (pageNumber: number) => {
    script?: { text: string }[];
    interpretation?: { text: string }[];
  }[];
}

interface CONST {
  image: { src: string; alt: string };
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  isValChk: boolean;
  isCorrect: boolean | undefined;
  isComplete: boolean;
  isCorrectData: string | boolean | number | string[];
  isSolutionData: { script?: { text: string }[]; interpretation?: { text: string }[] };
}

const EEL01C02A02P01 = ({ headerInfo, questionInfo, image, mainKey, subKey, getDefaultData, getCorrectData, getSolutionData }: Props) => {
  const gradeData = useRecoilValue(currentPageGradeData);
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const CONST: CONST = {
    headerInfo: headerInfo,
    questionInfo: {
      text: questionInfo.text,
      mark: isSubmittedInput(mainKey, subKey) ? (getValueInputData(mainKey, subKey) ? 'correct' : 'none') : 'none',
      markSize: 'middle',
    },
    image: image,
    isValChk: getValueInputData(mainKey, subKey) === '' ? true : false,
    isCorrect: gradeData.find(data => data.mainKey === mainKey)?.isCorrect,
    isComplete: isSubmittedInput(mainKey, subKey),
    isCorrectData: getCorrectData(mainKey)[0].inputDatas[0][0].value,
    isSolutionData: getSolutionData(mainKey)[0],
  };

  const [isOpen, setIsOpen] = useState(false);

  const completeQnA = () => {
    if (CONST.isComplete) {
      setIsOpen(!isOpen);
    }
    submitPageData();
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      submitLabel={CONST.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={!CONST.isValChk ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={CONST.isValChk}
      onSubmit={completeQnA}
    >
      <Box useFull>
        <BoxWrap gap='40px' useFull>
          <Box hAlign={'start'} width='460px' useFull>
            <PinchZoom>
              <Image src={image.src} alt={image.alt} height='340px' width='460px' />
            </PinchZoom>
          </Box>
          <Box hAlign='center' useFull>
            <Textarea
              placeholder='내용을 넣어주세요.'
              value={getValueInputData(mainKey, subKey) as string}
              onChange={e => changeInputData(mainKey, subKey, e.target.value)}
              width='100%'
              height='180px'
              disabled={CONST.isComplete}
            />
          </Box>
        </BoxWrap>
        {isOpen && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
            <Box background='lightGray' borderRadius='12px' marginTop='48px'>
              <Box>
                <Box>
                  <Tag type={ETagLine.GREEN} label={'예시 답안'} />
                </Box>
                <Box marginTop='12px'>
                  <Typography>{CONST.isCorrectData}</Typography>
                </Box>
              </Box>
            </Box>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};
export default EEL01C02A02P01;
