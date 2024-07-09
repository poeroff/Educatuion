import {
  Box,
  BoxWrap,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  Dropdown,
  Question,
  IQuestionProps,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  IAudioPlayerProps,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';
import { isNotEmptyString, isAnswer } from '@maidt-cntn/util/CommonUtil';

export interface IHE02301 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  questionText?: string;
  audioInfo?: IAudioPlayerProps;
  info: IHE02301Info;
  value: string[];
  dropdownWidth?: string;
  handleDropdownClick: (index: number, value: string | undefined) => void;
  isSubmitted?: boolean;
  submitAnswer?: () => void;
}

export interface IHE02301Info {
  text: React.ReactNode;
  data: Idata[];
  answer: string[];
}

export interface Idata {
  num: string;
  dropdownList: string[];
}

const HE02301 = ({
  headerInfo,
  questionInfo,
  questionText,
  audioInfo,
  info,
  value,
  dropdownWidth,
  handleDropdownClick,
  isSubmitted,
  submitAnswer,
}: IHE02301) => {
  const [isShow, setShow] = useState(false);
  const result = value.map((val, index) => !isAnswer(val, info.answer[index]));
  const getQuestionInfo: IQuestionProps = questionInfo || {
    size: 'medium',
    text: questionText,
    mark: 'none',
    markSize: 'middle',
  };

  const areArraysEqualIgnoringCaseAndWhitespace = (value: string[], answer: string[]): boolean => {
    // 배열의 길이가 다르면 false 반환
    if (value.length !== answer.length) {
      return false;
    }

    // 배열의 모든 요소가 동일한지 확인 (공백 제거 및 대소문자 무시)
    return value.every((val, index) => isAnswer(val, answer[index]));
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
      return;
    } else if (value.every(isNotEmptyString)) {
      if (!areArraysEqualIgnoringCaseAndWhitespace(value, info.answer)) {
        getQuestionInfo.mark = 'incorrect';
      } else {
        getQuestionInfo.mark = 'correct';
      }
      submitAnswer && submitAnswer();
    }
  };

  const submitAnswers: string[] = value;

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={getQuestionInfo}
      audioInfo={audioInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!value.every(isNotEmptyString)}
      submitBtnColor={value.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={() => {
        handleSubmit();
      }}
    >
      <BoxWrap useFull>
        <Box useFull useRound lineHeight='48px' paddingRight='16px' marginRight='24px' background='white'>
          <Scroll>
            <Box padding='4px 22px 4px 12px'>{info.text}</Box>
          </Scroll>
        </Box>
        <Box>
          <List data={info.data}>
            {({ index = 0, value }) => (
              <Box hAlign='center' marginBottom='10px' padding='10px'>
                <Question type='text' size='small'>
                  {value?.num}
                </Question>
                <Dropdown
                  width={dropdownWidth || '225px'}
                  marginLeft='10px'
                  dropdownList={value?.dropdownList}
                  onClick={value => handleDropdownClick(index, value)}
                  selectedValue={submitAnswers[index - 1] ? submitAnswers[index - 1] : undefined}
                  disabled={isSubmitted}
                  isError={isSubmitted ? result[index - 1] : false}
                ></Dropdown>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {info.answer.map((item, index) => (
              <Box key={index}>
                <Typography>
                  ({index + 1}) {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE02301;
