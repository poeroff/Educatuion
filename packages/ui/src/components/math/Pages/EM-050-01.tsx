import { useMemo, useState } from 'react';

import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, IQuestionProps, Label, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';

type TSubmitType = 'marking' | 'complete';
interface IEM052101 {
  headerInfo?: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  questionData?: { [key: string]: string }[];
  questionNode?: React.ReactNode;
  answerNode: React.ReactNode;
  answer: { [key: string]: string };
  solution: { [key: string]: string };
  commentary?: string;
  onSubmit?: (state: boolean[]) => void;
  submitType?: TSubmitType;
  isSubmitted?: boolean;
}

const EM05001 = ({
  headerInfo,
  questionInfo,
  questionData,
  questionNode,
  answerNode,
  answer,
  solution,
  commentary,
  onSubmit,
  submitType = 'marking',
  isSubmitted,
}: IEM052101) => {
  const isDisabled = useMemo(() => Object.keys(answer).some(key => !answer[key]), [answer]);
  const [isShow, setShow] = useState<boolean>(false);

  const isCorrectAnswer = (input: string, answer: string) => {
    return input.trim() === answer.trim();
  };
  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
    } else {
      const result = Object.keys(answer).map(key => isCorrectAnswer(answer[key], solution[key]));
      onSubmit && onSubmit(result);
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo || {}}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={() => {
        handleSubmit();
      }}
      vAlign={'flex-start'}
      useRound
      useExtend
    >
      <Box useFull>
        <BoxWrap>
          {questionData &&
            questionData.map((value, index) => {
              return (
                <BoxWrap key={`list-item-${index}`}>
                  <Label value={value.label} />
                  <Box background='yellow' marginLeft='8px' width='400px' hAlign='center' useRound>
                    <Box padding='8px 12px' fontSize='var(--font-size-36)' lineHeight='54px' whiteSpace='pre-line' textAlign='left'>
                      {value.item1}
                      {'\n'}
                      {value.item2}
                    </Box>
                  </Box>
                </BoxWrap>
              );
            })}
        </BoxWrap>
        {questionNode}

        <Box hAlign='end' marginTop='24px'>
          {answerNode}
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={submitType === 'marking' ? '답안' : '모범답안'} />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>
              {Object.keys(solution)
                .map(key => solution[key])
                .join(', ')}
            </Typography>
          </Box>
          {commentary && (
            <Box marginTop={'10px'}>
              <Box>
                <Tag type={ETagLine.GREEN} label={'풀이'} />
              </Box>
              <Box marginTop='12px'>
                <Typography usePre>
                  <MathExpression equation={commentary} />
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM05001;
