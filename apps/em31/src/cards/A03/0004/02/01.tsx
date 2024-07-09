import { Box, EStyleSizes, IQuestionProps, Question, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box marginTop={20}>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          곱셈과 나눗셈의 관계를 이해할 수 있어요.
        </Question>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          곱셈식을 나눗셈식 2개로 나타낼 수 있어요.
        </Question>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          나눗셈식을 곱셈식 2개로 나타낼 수 있어요.
        </Question>
      </Box>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;
