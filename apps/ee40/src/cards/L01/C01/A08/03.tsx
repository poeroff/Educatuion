import { useState, useEffect } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  IQuestionProps,
  Recorder,
  BottomSheet,
  Tag,
  Textarea,
  ETagLine,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { LabelTypes } from '@/assets/styles';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData, getSolutionData } from './pageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { ConvertedText } from '@/components/Recorder/atoms/ResultStep.style';

type Props = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: { text: string; color: string }[];
  isValChk: boolean;
  isComplete: boolean;
  isSolutionData: { script: { text: string }[]; interpretation: { text: string }[] };
};

const P03 = () => {
  const mainKey = 3;
  const subKey = 'P0301';
  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });
  const [isOpen, setIsOpen] = useState(false);

  const CONST: Props = {
    headerInfo: { headerText: 'Mission 1_Try It' },
    data: [
      { text: '안부를 묻는 말', color: '#0091ff' },
      { text: '안부를 묻는 말에 대답하는 말', color: '#9747ff' },
    ],
    questionInfo: {
      text: '가족이나 친구의 안부를 묻고 답하는 말을 해봅시다.',
      mark: isSubmittedInput(mainKey, subKey)
        ? getValueInputData(mainKey, 'P0301') && getValueInputData(mainKey, 'P0302')
          ? 'correct'
          : 'none'
        : 'none',
      markSize: 'middle',
    },
    isValChk: getValueInputData(mainKey, 'P0301') && getValueInputData(mainKey, 'P0302') ? true : false,
    isComplete: isSubmittedInput(mainKey, 'P0301') && isSubmittedInput(mainKey, 'P0302'),
    isSolutionData: getSolutionData(mainKey)[0],
  };

  const fnClickCompleate = () => {
    if (CONST.isComplete) {
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
      submitDisabled={CONST.isValChk ? false : true}
      submitLabel={CONST.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={CONST.isValChk ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={() => fnClickCompleate()}
    >
      <BoxWrap gap='40px' {...{ marginTop: '50px' }}>
        {[...Array(2)].map((item, idx: number) => {
          return (
            <Box useFull key={idx}>
              <LabelTypes info='title' fontSize={32} background={CONST.data[idx].color} color='#fff' type='paint' value={CONST.data[idx].text} />
              <Box {...{ marginTop: '20px' }}>
                <Textarea
                  height='195px'
                  placeholder='내용을 넣어 주세요.'
                  readOnly={true}
                  disabled={true}
                  //value={getValueInputData(mainKey, String('P030' + (idx + 1))) as string}
                  value={
                    getValueInputData(mainKey, String('P030' + (idx + 1))).convertedText
                      ? getValueInputData(mainKey, String('P030' + (idx + 1))).convertedText
                      : ''
                  }
                />
              </Box>
              <Box {...{ marginTop: '20px' }} hAlign='center'>
                <Recorder
                  initialData={CONST.isComplete ? getValueInputData(mainKey, String('P030' + (idx + 1))) : null}
                  recorderIndex={idx}
                  readOnly={CONST.isComplete}
                  onSubmit={audioData => changeInputData(mainKey, String('P030' + (idx + 1)), audioData)}
                  onRefresh={() => {
                    changeInputData(mainKey, String('P030' + (idx + 1)), '');
                    console.log('refresh');
                    changeInputData(mainKey, String('P0301'), '');
                    console.log(getValueInputData(mainKey, String('P0301')));
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </BoxWrap>

      {isOpen && (
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Box>
              <Box>
                <Tag type={ETagLine.GREEN} label={'예시 답안'} />
              </Box>
              {CONST.isSolutionData.script.map((item: { text: string }) => {
                return (
                  <Box key={item.text} marginTop='12px'>
                    {item.text}
                  </Box>
                );
              })}
            </Box>
            <Box marginTop='48px'>
              <Box>
                <Tag type={ETagLine.GREEN} label={'해석'} />
              </Box>
              {CONST.isSolutionData.interpretation.map((item: { text: string }) => {
                return (
                  <Box key={item.text} marginTop='12px'>
                    {item.text}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </BottomSheet>
      )}
    </Container>
  );
};

export default P03;
