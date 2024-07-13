import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/en';
import { Image, BoxWrap, Box, List, Label, Typography, Radio, BottomSheet, ETagLine, Tag } from '@maidt-cntn/ui';
import { TMainHeaderInfoTypes, EStyleButtonTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  data: { text: string }[];
  image: { src: string; alt: string };
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
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;
  label: string[];
  data: { text: string }[];
  image: { src: string; alt: string };
  isValChk: boolean;
  isCorrect: boolean | undefined;
  isComplete: boolean;
  isCorrectData: string | boolean | number | string[];
  isSolutionData: { script?: { text: string }[]; interpretation?: { text: string }[] };
}

const EE4L06C01A06b = ({
  headerInfo,
  questionInfo,
  audioInfo,
  data,
  label,
  image,
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

    label: label,
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
    image: image,
    isValChk: getValueInputData(mainKey, subKey) === '' ? true : false,
    isCorrect: gradeData.find(data => data.mainKey === mainKey)?.isCorrect,
    isComplete: isSubmittedInput(mainKey, subKey),
    isCorrectData: getCorrectData(mainKey)[0].inputDatas[0][0].value,
    isSolutionData: getSolutionData(mainKey)[0],
  };
  const [isOpen, setIsOpen] = useState(false);

  const onSumbit = () => {
    if (!CONST.isComplete) {
      gradeSubmitPageData();
    }
    // else {
    //   setIsOpen(!isOpen);
    // }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      submitDisabled={getValueInputData(mainKey, subKey) === 0}
      // submitLabel={CONST.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitLabel={'채점하기'}
      submitBtnColor={CONST.isComplete ? (isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      audioInfo={audioInfo}
      onSubmit={onSumbit}
    >
      <Box useFull>
        <BoxWrap gap='40px' useFull>
          <Box hAlign={'start'} width='460px' useFull>
            <Image src={CONST.image.src} alt={CONST.image.alt} width='460px' height='340px' style={{ objectFit: 'cover' }} />
          </Box>
          <Box vAlign={'left'} hAlign={'center'} useFull>
            <List data={CONST.data}>
              {({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
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
                  <BoxWrap>
                    <Box hAlign={'center'}>
                      <Label value={index} />
                    </Box>
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            </List>
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

export default EE4L06C01A06b;
