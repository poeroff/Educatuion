import styled from '@emotion/styled';
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
          <Text>일의 자리에서 올림이 있는 (몇십몇)×(몇)의 계산 결과를 어림할 수 있어요.</Text>
        </Question>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          <Text>일의 자리에서 올림이 있는 (몇십몇)×(몇)의 계산 원리와 계산 형식을 이해하고 계산할 수 있어요.</Text>
        </Question>
      </Box>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;

const Text = styled.span`
  white-space: wrap;
`;
