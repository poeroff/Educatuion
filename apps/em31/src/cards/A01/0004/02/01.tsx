import { Box, EStyleSizes, IQuestionProps, Question, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        {'받아올림이 두 번, 세 번 있는 {세 자리 수} ＋ {세 자리 수}의 계산 원리를 이해하고 계산할 수 있어요.'}
        <br />
        {'받아올림이 두 번, 세 번 있는 {세 자리 수} ＋ {세 자리 수}의 계산 결과를 어림할 수 있어요.'}
      </>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;
