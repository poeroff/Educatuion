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
      <Question type='dot' size={EStyleSizes['SMALL']}>
        <Text>나눗셈의 몫을 구하고 , 몫이 같은 나눗셈을 찾을 수 있어요 .</Text>
      </Question>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;

const Text = styled.span`
  white-space: nowrap;
`;
