import { Box, IQuestionProps, TMainHeaderInfoTypes, Typography, EStyleButtonTypes, Tag, ETagLine, BottomSheet } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useMemo, useState } from 'react';
import { isAnswer, removeSpaces } from '@maidt-cntn/util/CommonUtil';

type TSubmitType = 'marking' | 'complete';

export interface IEM02101 {
  headerInfo?: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  inputNodes: React.ReactNode[];
  answers: { [key: string]: string };
  signs?: string[];
  solutions: { [key: string]: string }[];
  submitted: boolean;
  submitType?: TSubmitType;
  commentary?: string;
  onSubmit?: (isCorrect: boolean, isCorrectArr: { [key: string]: boolean }) => void;
}

const EM02101 = ({
  headerInfo,
  questionInfo,
  inputNodes,
  answers,
  signs,
  solutions,
  submitted,
  submitType = 'marking',
  commentary,
  onSubmit,
}: IEM02101) => {
  const [isShow, setShow] = useState<boolean>(false);
  const isDisabled = useMemo(() => Object.keys(answers).some(key => !answers[key]), [answers]);

  const isCorrectAnswer = (inputs: { [key: string]: string }, answers: { [key: string]: string }[]) => {
    return answers.some(answer => {
      return Object.keys(inputs).every(key => isAnswer(removeSpaces(inputs[key]), removeSpaces(answer[key])));
    });
  };

  const isCorrectAnswerArr = (inputs: { [key: string]: string }, answers: { [key: string]: string }[]) => {
    const correctArrCopy: { [key: string]: boolean } = {};
    Object.keys(inputs).forEach(key => {
      correctArrCopy[key] = answers.some(answer => {
        return isAnswer(removeSpaces(inputs[key]), removeSpaces(answer[key]));
      });
    });

    return correctArrCopy;
  };

  const handleSubmit = () => {
    if (submitted) {
      setShow(show => !show);
    } else {
      const result = isCorrectAnswer(answers, solutions);
      const newIsCorrectArr = isCorrectAnswerArr(answers, solutions);
      onSubmit && onSubmit(result, newIsCorrectArr);
    }
  };

  const em02101Solution = solutions
    .map(solution => {
      const values = Object.values(solution);
      return '$' + values.map((value, i) => `${value}${(signs && i < values.length - 1 && signs[i]) || ''}`).join('') + '$';
    })
    .join(' 또는 ');

  return (
    <Container
      useRound
      useExtend
      bodyId={'targetContainer'}
      headerInfo={headerInfo || {}}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={submitted ? (isShow ? '답안 닫기' : '답안 보기') : submitType === 'marking' ? '채점하기' : '완료하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={() => {
        handleSubmit();
      }}
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box padding={'20px 44px'} useRound>
          {inputNodes.map((node, index) => (
            <Typography key={index} useGap={false}>
              {node}
              {signs && signs[index] && <Typography>{signs[index]}</Typography>}
            </Typography>
          ))}
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={submitType === 'marking' ? '답안' : '모범답안'} />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>
              <MathExpression equation={em02101Solution} />
            </Typography>
          </Box>
          {commentary && (
            <Box marginTop='40px'>
              <Box>
                <Tag type={ETagLine.GREEN} label={'풀이'} />
              </Box>
              <Box marginTop='22px'>
                <Typography usePre>{commentary.includes('$') ? <MathExpression equation={commentary} /> : commentary}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM02101;
