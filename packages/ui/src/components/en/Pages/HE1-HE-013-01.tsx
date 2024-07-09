import { Container } from '@maidt-cntn/ui/en';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { useState } from 'react';

export interface IHE1HE01301 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  parts: string[];
  underlineText: string;
  data: { text: string }[];
  isSubmitted: boolean;
  answer: number | undefined;
  solution: number | undefined;
  handleChange: (index: number) => void;
  submitAnswer: () => void;
}

const HE1HE01301 = ({
  headerInfo,
  questionInfo,
  parts,
  underlineText,
  data,
  isSubmitted,
  answer,
  solution,
  handleChange,
  submitAnswer,
}: IHE1HE01301) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const submitAnswerOnClick = () => {
    if (isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    submitAnswer();
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={answer === 0}
      submitBtnColor={answer !== 0 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      onSubmit={submitAnswerOnClick}
    >
      <Box useFull hAlign='center' padding='45px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='4px 12px' height='45%' background='white' useRound>
            <Typography>
              {parts[0]}
              <Typography
                textDecoration={'underline'}
                style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}
                weight={'var(--font-weight-bold)'}
              >
                {underlineText}
              </Typography>
              {parts[1]}
            </Typography>
          </Box>
          <Scroll height='70%' width='910px' tabIndex={0}>
            <List
              gap={24}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === answer}
                  ariaLabel={index + '번 보기'}
                  onClick={() => handleChange(index)}
                  isError={isSubmitted && answer !== solution}
                  readOnly={isSubmitted}
                >
                  <Box vAlign='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </Box>
                </Radio>
              )}
            />
          </Scroll>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isSubmitted && isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default HE1HE01301;
