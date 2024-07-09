import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  IQuestionProps,
  Recorder,
  List,
  Typography,
  Tag,
  Scroll,
  Textarea,
  ETagLine,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  BottomSheet,
  Label,
} from '@maidt-cntn/ui';
// import { LabelTypes } from '@/assets/styles';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import styled from 'styled-components';
import { initDataType, correctDataType } from '@maidt-cntn/api';

interface Props {
  layout: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
  };
  pageData: pageData;
  contentInfo: string[];
}

type INITIAL = {
  isValChk: boolean;
  isComplete: boolean;
  isSolutionData: { answer?: { text: string }[]; interpretation?: { text: string }[] };
};

type pageData = {
  pageNumber: number;
  mainKey: number;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
  getSolutionData: (mainKey: number) => {
    answer?: { text: string }[];
    interpretation?: { text: string }[];
  }[];
};

const EEL11C01A09P03 = ({ layout, pageData, contentInfo }: Props) => {
  const CONST = { ...layout };
  const { pageNumber, mainKey, getDefaultData, getCorrectData, getSolutionData } = pageData;

  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const INITIAL: INITIAL = {
    isValChk: getValueInputData(mainKey, 'RECORDER-01') && getValueInputData(mainKey, 'RECORDER-02') ? true : false,
    isComplete: isSubmittedInput(mainKey, 'RECORDER-01') && isSubmittedInput(mainKey, 'RECORDER-02'),
    isSolutionData: getSolutionData(mainKey)[0],
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fnClickComplete = () => {
    if (INITIAL.isComplete) {
      setIsOpen(!isOpen);
    } else {
      submitPageData();
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      submitDisabled={INITIAL.isValChk ? false : true}
      submitLabel={INITIAL.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={INITIAL.isValChk ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      onSubmit={() => fnClickComplete()}
    >
      <Scroll>
        <BoxWrap gap='40px' {...{ marginTop: '50px' }}>
          <Box useFull textAlign='center'>
            <LabelTypes info='title' fontSize={32} background='#0091FF' color='#fff' type='paint' value={contentInfo[0]} />
            <Box {...{ marginTop: '20px' }} hAlign='center' height='195px'>
              <Recorder recorderIndex={0} readOnly={INITIAL.isComplete} onSubmit={data => changeInputData(mainKey, 'RECORDER-01', data)} />
            </Box>
          </Box>
          <Box useFull textAlign='center'>
            <LabelTypes info='title' fontSize={32} background='#9747ff' color='#fff' type='paint' value={contentInfo[1]} />
            <Box {...{ marginTop: '20px' }} hAlign='center' height='195px'>
              <Recorder recorderIndex={1} readOnly={INITIAL.isComplete} onSubmit={data => changeInputData(mainKey, 'RECORDER-02', data)} />
            </Box>
          </Box>
        </BoxWrap>
        {isOpen && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
            <Box marginTop='25px' background='gray' padding='28px' useRound>
              <Box margin='25px 0'>
                <Tag fontSize='22px' height='auto' label='예시 답안' type={ETagLine.GREEN} width='auto' />
                <Box margin='25px 0 50px'>
                  {/* <List
                    data={getSolutionData(pageNumber)}
                    row={({ value }) => (
                      <Box hAlign='flex-start'>
                        <Typography>{value?.answer}</Typography>
                      </Box>
                    )}
                  /> */}
                  {INITIAL.isSolutionData.answer?.map((item: { text: string }) => {
                    return (
                      <Box key={item.text} hAlign='flex-start'>
                        {item.text}
                        <Typography>{item?.text}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box margin='25px 0'>
                <Tag fontSize='22px' height='auto' label='해석' type={ETagLine.GREEN} width='auto' />
                <Box margin='25px 0 50px'>
                  {/* <List
                    data={getSolutionData(pageNumber)}
                    row={({ value }) => (
                      <Box hAlign='flex-start'>
                        <Typography>{value?.interpretation}</Typography>
                      </Box>
                    )}
                  /> */}
                  {INITIAL.isSolutionData.interpretation?.map((item: { text: string }) => {
                    return (
                      <Box key={item.text} hAlign='flex-start'>
                        {item.text}
                        <Typography>{item?.text}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </BottomSheet>
        )}
      </Scroll>
    </Container>
  );
};

export default EEL11C01A09P03;

export const LabelTypes = styled(Label)<{ fontSize?: number; info?: string }>`
  ${props => {
    if (props.info === 'title') {
      return `
      height: 90px !important;
      padding: 0 17px;
      min-width: 190px !important;
      border-radius: 22px !important;
      line-height: 42px;
    `;
    }
  }}
  ${({ fontSize }) => fontSize && 'font-size:' + String(fontSize) + 'px !important'};
`;
