import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer, isValidString } from '@maidt-cntn/util/CommonUtil';
import React, { Fragment, useState } from 'react';

export interface IHE03702 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo?: IQuestionProps;
  examples: string[];
  options: string[];
  translations?: string[];
  answer: string;
  solution: string;
  isCorrect?: boolean;
  isSubmitted: boolean;
  onChange?: (subKey: number, value: string) => void;
  onSubmit?: (isCorrect: boolean) => void;
}

const HE03702 = ({
  headerInfo,
  questionInfo,
  examples,
  options,
  translations,
  answer,
  solution,
  isCorrect,
  isSubmitted,
  onChange,
  onSubmit,
}: IHE03702) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const isAnswered = isValidString(answer);
  const isSubmitAvailable = isAnswered && !isSubmitted;
  const submitBtnColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isSubmitAvailable
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;

  const checkCorrect = () => isAnswer(answer, solution);

  const handleSubmit = () => {
    if (isSubmitAvailable) {
      const isCorrect = checkCorrect();
      onSubmit?.(isCorrect);
    } else {
      setIsShowAnswer(!isShowAnswer);
    }
  };

  return (
    <Container
      bodyId='container'
      vAlign={'flex-start'}
      headerInfo={headerInfo}
      questionInfo={{
        mark: isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none',
        ...questionInfo,
      }}
      submitBtnColor={submitBtnColor}
      submitLabel={!isSubmitted ? '채점하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isSubmitted && !isSubmitAvailable}
      onSubmit={handleSubmit}
    >
      <Box useFull flexDirection='column' hAlign='center'>
        <Box vAlign='center' hAlign={'center'} padding='48px 30px' background='white' borderRadius={24} useShadow>
          <Box display='flex' flexWrap='wrap'>
            {examples.map((chunk, index) => (
              <Fragment key={index}>
                {chunk === '___' ? (
                  <>
                    <Box width='100px' height='40px' borderBottom=' 2px solid black' />
                    <Box type='hidden'>빈칸 영역</Box>
                  </>
                ) : (
                  <Typography>{chunk}</Typography>
                )}
              </Fragment>
            ))}
          </Box>
        </Box>

        <BoxWrap marginTop={48}>
          {options.map((option, index) => {
            return (
              <Box key={index} flex='1' textAlign='center'>
                <Radio
                  key={`${answer}-${index}`}
                  type={'box'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={option}
                  readOnly={isSubmitted}
                  isError={isSubmitted && !isCorrect}
                  value={option === answer}
                  onClick={() => onChange?.(1, option)}
                >
                  {option}
                </Radio>
              </Box>
            );
          })}
        </BoxWrap>
      </Box>

      <BottomSheet
        bottomSheetTargetId='container'
        height={'40%'}
        show={isShowAnswer}
        closeOption={{ useYn: true, onClose: () => setIsShowAnswer(false) }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <AnswerTagBox marginTop={0} label='답안'>
            {solution}
          </AnswerTagBox>
          {translations && (
            <AnswerTagBox label='해석'>
              {translations.map((translation, index) => (
                <Typography key={index} useGap={false}>
                  {translation}
                </Typography>
              ))}
            </AnswerTagBox>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

const AnswerTagBox = React.memo(({ marginTop = 20, label, children }: { marginTop?: number; label: string; children: React.ReactNode }) => (
  <>
    <Box marginTop={marginTop}>
      <Tag type={ETagLine.GREEN} label={label} />
    </Box>

    <Box marginTop='10px'>
      <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
        {children}
      </Typography>
    </Box>
  </>
));

export default HE03702;
