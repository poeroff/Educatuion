import { Box, EStyleSizes, IQuestionProps, Question, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Box>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          똑같이 나누는 나눗셈을 알 수 있어요.
        </Question>
        <br />
        <Question type='dot' size={EStyleSizes['SMALL']}>
          나눗셈 상황을 나눗셈식으로 나타낼 수 있어요.
        </Question>
      </Box>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;
