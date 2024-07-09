import { Container, Stamp, EStampType } from '@maidt-cntn/ui/math';
import { Box, BoxWrap, EStyleButtonTypes, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

export interface IEM01101 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  isSubmitted: boolean;
  answer: number;
  submitAnswer: () => void;
  handleAnswerChange: (value: number) => void;
}

const EM01101 = ({ headerInfo, questionInfo, isSubmitted, answer, submitAnswer, handleAnswerChange }: IEM01101) => {
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      submitBtnColor={isSubmitted ? EStyleButtonTypes.SECONDARY : answer === 0 ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW}
      submitDisabled={isSubmitted || answer === 0}
      onSubmit={submitAnswer}
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Box>
          <Stamp
            isClicked={answer === 1}
            ariaLabel={'최고예요'}
            readOnly={isSubmitted}
            onClick={() => handleAnswerChange(1)}
            stampType={EStampType.Excellent}
          />
        </Box>
        <Box>
          <Stamp
            isClicked={answer === 2}
            ariaLabel={'잘했어요'}
            readOnly={isSubmitted}
            onClick={() => handleAnswerChange(2)}
            stampType={EStampType.Good}
          />
        </Box>
        <Box>
          <Stamp
            isClicked={answer === 3}
            ariaLabel={'아쉬워요'}
            readOnly={isSubmitted}
            onClick={() => handleAnswerChange(3)}
            stampType={EStampType.Soso}
          />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM01101;
