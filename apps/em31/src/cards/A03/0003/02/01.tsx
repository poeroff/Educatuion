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
          같은 양이 몇 번 들어 있는 나눗셈인지를 알 수 있어요.
        </Question>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          나눗셈 상황을 나눗셈식으로 나타낼 수 있어요.
        </Question>
      </Box>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;
