import { useMemo, useState } from 'react';

import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Image, TMainHeaderInfoTypes, Tag, Typography } from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';

type TSubmitType = 'marking' | 'complete';
interface IEM052101 {
  headerInfo?: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  questionNode: React.ReactNode;
  answerNode: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  answer: { [key: string]: string };
  solution: { [key: string]: string };
  commentary?: string;
  onSubmit?: (state: boolean[]) => void;
  submitType?: TSubmitType;
  isSubmitted?: boolean;
}

const EM05201 = ({
  headerInfo,
  questionInfo,
  questionNode,
  answerNode,
  imageSrc,
  imageAlt,
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
    return input === answer;
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
      <Box vAlign='center' flexDirection='column'>
        <Image src={imageSrc} alt={imageAlt} width='377px' height='102px' />
        <Box width='519px' marginTop={24} padding='24px' type='dashed' useRound>
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
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default EM05201;
