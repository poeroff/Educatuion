import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { RecoilState } from 'recoil';
import NumberSelectQuestion, { INumberSelectStore, IUiInfo } from './components/NumberSelectQuestion';
import { L02SP04_1 } from './store';

interface Props {
  _page?: string;
  _store?: RecoilState<object>;
}

const P11 = ({ _page = 'P11', _store = L02SP04_1 }: Props) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };
  const questionInfo: IQuestionProps = {
    text: '3. 다음 글의 밑줄 친 부분 중, 어법상 틀린 것을 고르시오.',
  };
  const uiInfo: IUiInfo = { exampleFlex: 'row', exampleGap: 50, optionWidth: '175px', optionGrid: 1, optionGap: 20 };

  return (
    <NumberSelectQuestion
      cardStore={_store as INumberSelectStore}
      pageNumber={_page}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      uiInfo={uiInfo}
    />
  );
};

export default P11;
