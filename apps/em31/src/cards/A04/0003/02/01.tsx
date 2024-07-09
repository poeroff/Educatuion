import { EStyleSizes, IQuestionProps, Question, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Question type='dot' size={EStyleSizes['SMALL']}>
        <Typography>올림이 없는 (몇십몇)×(몇)의 계산 원리와 계산 형식을 이해하고 계산할 수 있어요.</Typography>
      </Question>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;
