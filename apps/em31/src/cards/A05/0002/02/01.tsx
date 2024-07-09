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
          1 mm를 알고 이를 쓰고 읽을 수 있어요.
        </Question>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          1 cm=10 mm의 관계를 알고 길이를 ‘몇 cm 몇 mm’와 ‘몇 mm’로 나타낼 수 있어요.
        </Question>
      </Box>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;
