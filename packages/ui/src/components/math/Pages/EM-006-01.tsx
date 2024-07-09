import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

export interface IEM00601 {
  goals: string[];
}

const EM00601 = ({ goals = [] }: IEM00601) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathAim',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: goals.map(val => `${val}\n`),
  };

  return <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound vAlign='start'></Container>;
};

export default EM00601;
