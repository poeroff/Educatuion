import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    text: '세 자리 수의 덧셈과 뺄셈을 하여 그림 조각을 맞추고, 색칠하여 그림을 완성하는 놀이를 할 수 있어요.',
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound></Container>;
};

export default P02;
