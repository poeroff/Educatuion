import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import WordSelectQuestion from './components/WordSelectQuestion';

const P10 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '언어형식 진단',
  };
  const questionInfo: IQuestionProps = {
    text: '빈 칸에 들어갈 알맞은 단어를 골라 봅시다.',
  };

  return <WordSelectQuestion pageName='P10' headerInfo={headerInfo} questionInfo={questionInfo} />;
};

export default P10;
