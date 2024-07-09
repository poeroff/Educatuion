import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import { VideoPlayer, Image, BoxWrap, Box, List, Label, Radio, BottomSheet, ETagLine, Tag } from '@maidt-cntn/ui';
import { TMainHeaderInfoTypes, EStyleButtonTypes, IQuestionProps } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';
import styled from 'styled-components';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: { src: string; alt: string }[];
  video: { src: string; srt: string; haveSrt?: boolean; srtErr: string };
  label: string[];
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
  data: { src: string; alt: string }[];
  label: string[];
  video: { src: string; srt: string; haveSrt?: boolean; srtErr: string };
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  isCorrect: boolean | undefined;
  isComplete: boolean;
  isCorrectData: string | boolean | number | string[];
  isSolutionData: { script?: { text: string }[]; interpretation?: { text: string }[] };
}

const EEL01C02A02P03 = ({
  headerInfo,
  questionInfo,
  video,
  data,
  label,
  mainKey,
  subKey,
  getDefaultData,
  getCorrectData,
  getSolutionData,
}: Props) => {
  const gradeData = useRecoilValue(currentPageGradeData);
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

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
    label: label,
    video: video,
    isCorrect: gradeData.find(data => data.mainKey === mainKey)?.isCorrect,
    isComplete: isSubmittedInput(mainKey, subKey),
    isCorrectData: getCorrectData(mainKey)[0].inputDatas[0][0].value,
    isSolutionData: getSolutionData(mainKey)[0],
  };
  const [isOpen, setIsOpen] = useState(false);

  const onSumbit = () => {
    if (!CONST.isComplete) {
      gradeSubmitPageData();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      submitDisabled={getValueInputData(mainKey, subKey) === 0}
      submitLabel={CONST.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={CONST.isComplete ? (isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={onSumbit}
      useExtend
    >
      <Box useFull>
        <BoxWrap gap='10px' useFull>
          <Box hAlign={'start'} width='450px'>
            <VideoPlayer videoSrc={CONST.video.src} srtFile={CONST.video.haveSrt ? CONST.video.srt : CONST.video.srtErr} />
          </Box>
          <Box vAlign={'center'} hAlign={'center'} width='532px'>
            <List
              data={CONST.data}
              align='horizontal'
              row={({ value, index = 1 }) => (
                <RadioBox
                  type={'square'}
                  name={'radio-question-A'}
                  label={String(index)}
                  ariaLabel={index + '번 보기'}
                  {...{ checked: index === getValueInputData(mainKey, subKey), onChange: () => changeInputData(mainKey, subKey, index) }}
                  //defaultValue={index === getValueInputData(mainKey, 'P01')}
                  //value={index === getValueInputData(mainKey, 'P01')}
                  //onClick={() => onHandler(index)}
                  disabled={CONST.isComplete}
                  isError={CONST.isComplete && !CONST.isCorrect}
                  tabIndex={101 + index}
                >
                  <Label value={index} />
                  <Box width='226px' height='226px' hAlign='center' border='none'>
                    <Image src={value?.src as string} width='100%' alt={value?.alt} />
                  </Box>
                </RadioBox>
              )}
            />
          </Box>
        </BoxWrap>

        {isOpen && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
            <Box background='lightGray' borderRadius='12px' marginTop='48px'>
              {label.map((item, idx) => {
                return (
                  <Box marginTop={idx === 0 ? '0' : '48px'}>
                    <Box>
                      <Tag type={ETagLine.GREEN} label={item} />
                    </Box>
                    <Box marginTop='12px'>
                      {idx === 0 && CONST.isCorrectData}
                      {idx === 1 &&
                        CONST.isSolutionData.script?.map((item: { text: string }) => {
                          return (
                            <Box key={item.text} marginTop='12px'>
                              {item.text}
                            </Box>
                          );
                        })}
                      {idx === 2 &&
                        CONST.isSolutionData.interpretation?.map((item: { text: string }) => {
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
      </Box>
    </Container>
  );
};

export default EEL01C02A02P03;

export const RadioBox = styled(Radio)<{ isError?: boolean | null }>`
  & + * {
    box-sizing: border-box;
    border: 2px solid transparent !important;
  }
  &:checked + * {
    background: #f4f8ff !important;
    border: 2px solid #75c2ff !important;
    color: #000 !important;

    & > * {
      filter: none !important;
      -webkit-filter: none !important;
      filter: none !important;
    }
  }
  ${props => {
    if (props.isError !== null) {
      return (
        props.isError &&
        `
        &:checked + * {
          background: #fff4f3 !important;
          border: 2px solid #eb1807 !important;
          color: #000 !important;
          & > span {
            border: 1px solid #8d9299 !important;
          }
        }
      `
      );
    }
  }}
`;
