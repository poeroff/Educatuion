import { IQuestionProps, TMainHeaderInfoTypes, Box, Question, EStyleSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        이번 단원에서 배운 내용을 정리하고 문제를 해결할 수 있어요.
      </>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P01;
