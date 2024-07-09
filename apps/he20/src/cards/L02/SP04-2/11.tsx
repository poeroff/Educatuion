import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { RecoilState } from 'recoil';
import InputSentenceQuestion, { IInputSentenceStore } from './components/InputSentenceQuestion';
import { L02SP04_2 } from './store';

interface Props {
  _page?: string;
  _store?: RecoilState<object>;
}

const P11 = ({ _page = 'P11', _store = L02SP04_2 }: Props) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 문장쓰기 연습',
  };
  const questionInfo: IQuestionProps = {
    text: '밑줄 친 부분을 바르게 고쳐 문장을 다시 써 봅시다.',
  };

  return <InputSentenceQuestion cardStore={_store as IInputSentenceStore} pageNumber={_page} headerInfo={headerInfo} questionInfo={questionInfo} />;
};

export default P11;
