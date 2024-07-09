import { EStyleSizes, IQuestionProps, Question, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          나눗셈의 몫을 곱셈구구로 구할 수 있어요.
        </Question>
        <Question type='dot' size={EStyleSizes['SMALL']}>
          나눗셈의 몫을 곱셈식으로 구할 수 있어요.
        </Question>
      </>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;
