import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  Box,
  BoxWrap,
  VideoPlayer,
  Typography,
  List,
  Tag,
  BottomSheet,
  ETagLine,
  IQuestionProps,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  ChipButton,
  EChipButtonType,
} from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  srtFile?: string;
  mainKey: number;
  subKey: string;
  data: string;
  video: {
    src: string;
    srt: string;
    haveSrt?: boolean;
    srtErr: string;
  };
  label: string[];
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
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  video: {
    src: string;
    srt: string;
    haveSrt?: boolean;
    srtErr: string;
  };
  data: string;
  isCorrect: boolean | undefined;
  isComplete: boolean;
  isCorrectData?: string | boolean | number | string[];
  isSolutionData?: { script?: { text: string }[]; interpretation?: { text: string }[] };
}

const EEL01C04A02P03 = ({
  headerInfo,
  questionInfo,
  label,
  mainKey,
  subKey,
  data,
  video,
  getDefaultData,
  getCorrectData,
  getSolutionData,
}: Props) => {
  const gradeData = useRecoilValue(currentPageGradeData);
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });
  const [isOpen, setIsOpen] = useState(false);

  const CONST: CONST = {
    headerInfo: headerInfo,
    questionInfo: {
      text: questionInfo.text,
      mark: isSubmittedInput(mainKey, subKey)
        ? gradeData.find(data => data.mainKey === mainKey)?.isCorrect === undefined
          ? 'none'
          : gradeData.find(data => data.mainKey === mainKey)?.isCorrect
          ? 'correct'
          : 'star'
        : 'none',
      markSize: 'middle',
    },
    data: data,
    video: video,
    isCorrect: gradeData.find(data => data.mainKey === mainKey)?.isCorrect,
    isComplete: isSubmittedInput(mainKey, subKey),
    isCorrectData: getCorrectData(mainKey)[0].inputDatas[0][0].value,
    isSolutionData: getSolutionData(mainKey)[0],
  };

  const onSumbit = () => {
    if (!CONST.isComplete) {
      gradeSubmitPageData();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Container
      useExtend
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      submitDisabled={getValueInputData(mainKey, subKey) === 0}
      submitLabel={CONST.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={CONST.isComplete ? (isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={onSumbit}
    >
      <BoxWrap useFull>
        <Box width='450px' useFull>
          <VideoPlayer videoSrc={CONST.video.src} srtFile={CONST.video.haveSrt ? CONST.video.srt : CONST.video.srtErr} />
        </Box>
        <Box vAlign='center' hAlign='center' width='532px' useFull>
          <BoxWrap>
            <Box width='380px' vAlign='end' marginRight='0'>
              <Typography style={{ padding: '0 12px', margin: '-3px 0 0 0' }}>{CONST.data}</Typography>
            </Box>
            <Box vAlign='start'>
              <List
                data={['O', 'X']}
                align='horizontal'
                row={({ value, index = 1 }) => (
                  <ChipButton
                    key={index}
                    type='radio'
                    name='radio-group'
                    status={index === 1 ? EChipButtonType.O : EChipButtonType.X}
                    isActive={index === getValueInputData(mainKey, subKey)}
                    size='44px'
                    onClick={() => changeInputData(mainKey, subKey, index)}
                    isError={CONST.isComplete && !CONST.isCorrect}
                    readOnly={CONST.isComplete}
                    isDisabled={CONST.isComplete}
                  ></ChipButton>
                )}
              />
            </Box>
          </BoxWrap>
        </Box>
      </BoxWrap>
      {isOpen && (
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            {label.map((item: string, idx: number) => {
              return (
                <Box key={idx} marginTop={idx === 0 ? '0' : '48px'}>
                  <Box>
                    <Tag type={ETagLine.GREEN} label={item} />
                  </Box>
                  <Box marginTop='12px'>
                    {idx === 0 && CONST.isCorrectData === 1 ? 'O' : 'X'}
                    {idx === 1 &&
                      CONST.isSolutionData?.script?.map((item: { text: string }) => {
                        return (
                          <Box key={item.text} marginTop='12px'>
                            {item.text}
                          </Box>
                        );
                      })}
                    {idx === 2 &&
                      CONST.isSolutionData?.interpretation?.map((item: { text: string }) => {
                        return (
                          <Box key={item.text} marginTop='12px'>
                            {item.text}
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </BottomSheet>
      )}
    </Container>
  );
};
export default EEL01C04A02P03;
