import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { RecoilState } from 'recoil';
import ScrambleQuestion, { IScrambleStore } from './components/ScrambleQuestion';
import { L02SP04_1 } from './store';

interface Props {
  _page?: string;
  _store?: RecoilState<object>;
}

const P08 = ({ _page = 'P08', _store = L02SP04_1 }: Props) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 영작 연습',
  };
  const questionInfo: IQuestionProps = {
    text: '단어를 알맞게 배열하여 문장을 완성해 봅시다.',
  };

  return <ScrambleQuestion cardStore={_store as IScrambleStore} pageNumber={_page} headerInfo={headerInfo} questionInfo={questionInfo} />;
};

export default P08;
