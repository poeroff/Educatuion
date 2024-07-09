import { useMemo, useState } from 'react';

import { Box, Typography, IQuestionProps, EStyleButtonTypes, TMainHeaderInfoTypes, Tag, ETagLine, BottomSheet } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { TBoxType } from '@/components/atoms/Box/Box.style';

type TSubmitType = 'marking' | 'complete';
interface IEM03901 {
  headerInfo?: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  questionNode: React.ReactNode;
  questionNodeWidth?: string;
  questionBoxType?: TBoxType;
  answerNode: React.ReactNode;
  answer: { [key: string]: string };
  solution: { [key: string]: string };
  multipleAnswer?: boolean;
  commentary?: string;
  commentaryNode?: React.ReactNode;
  onSubmit?: (state: boolean[]) => void;
  submitType?: TSubmitType;
  isSubmitted?: boolean;
}

const EM03901 = ({
  headerInfo,
  questionInfo,
  questionNode,
  questionNodeWidth = '519px',
  questionBoxType = 'dashed',
  answerNode,
  answer,
  solution,
  multipleAnswer = false,
  commentary,
  commentaryNode,
  onSubmit,
  submitType = 'marking',
  isSubmitted,
}: IEM03901) => {
  const isDisabled = useMemo(() => Object.keys(answer).some(key => !answer[key]), [answer]);
  const [isShow, setShow] = useState<boolean>(false);

  const isCorrectAnswer = (input: string, answer: string) => {
    return input === answer;
  };
  function isCorrectAnswerMultiple(obj1: { [key: string]: any }, obj2: { [key: string]: any }): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // 두 객체의 키 수가 다르면 false 반환
    if (keys1.length !== keys2.length) {
      return false;
    }

    // obj1과 obj2의 값을 배열로 만든 뒤 정렬하여 비교
    const values1 = keys1.map(key => obj1[key]).sort();
    const values2 = keys2.map(key => obj2[key]).sort();

    for (let i = 0; i < values1.length; i++) {
      if (values1[i] !== values2[i]) {
        return false;
      }
    }

    return true;
  }

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
    } else {
      if (!multipleAnswer) {
        const result = Object.keys(answer).map(key => isCorrectAnswer(answer[key], solution[key]));
        onSubmit && onSubmit(result);
      } else {
        //답이 여러개(순서 상관 없음)
        const result = isCorrectAnswerMultiple(answer, solution);
        onSubmit && onSubmit([result]);
      }
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
      <Box vAlign='center' flexDirection='column'>
        <Box width={questionNodeWidth} marginTop={24} padding='24px' type={questionBoxType} useRound>
          {questionNode}
        </Box>
        <Box vAlign='center' marginTop='24px'>
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
          {commentaryNode && (
            <Box marginTop={'10px'}>
              <Box>
                <Tag type={ETagLine.GREEN} label={'풀이'} />
              </Box>
              <Box marginTop='12px'>
                <Typography usePre>{commentaryNode}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM03901;
