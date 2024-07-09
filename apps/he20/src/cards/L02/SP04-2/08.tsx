import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { RecoilState } from 'recoil';
import WordSelectQuestion, { IWordSelectStore } from './components/WordSelectQuestion';
import { L02SP04_2 } from './store';

interface Props {
  _page?: string;
  _store?: RecoilState<object>;
}

const P08 = ({ _page = 'P08', _store = L02SP04_2 }: Props) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 어법 연습',
  };
  const questionInfo: IQuestionProps = {
    text: '빈 칸에 들어갈 알맞은 단어를 골라 봅시다.',
  };

  return <WordSelectQuestion cardStore={_store as IWordSelectStore} pageNumber={_page} headerInfo={headerInfo} questionInfo={questionInfo} />;
};

export default P08;
