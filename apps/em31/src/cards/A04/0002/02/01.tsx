import styled from '@emotion/styled';
import { EStyleSizes, IQuestionProps, Question, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Question size={EStyleSizes['SMALL']}>
        <Text>(몇십)×(몇)의 계산 원리와 계산 형식을 이해하고 계산 할 수 있어요.</Text>
      </Question>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;

const Text = styled.span`
  white-space: nowrap;
`;
