import { IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        물건의 길이를 어림하고 재어 볼 수 있어요.
        <br />
        지도에서 거리를 어림할 수 있어요.
      </>
    ),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound vAlign='start'></Container>;
};

export default P01;
