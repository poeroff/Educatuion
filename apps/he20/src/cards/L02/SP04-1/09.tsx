import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { RecoilState } from 'recoil';
import NumberSelectQuestion, { INumberSelectStore, IUiInfo } from './components/NumberSelectQuestion';
import { L02SP04_1 } from './store';

interface Props {
  _page?: string;
  _store?: RecoilState<object>;
}

const P09 = ({ _page = 'P09', _store = L02SP04_1 }: Props) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };
  const questionInfo: IQuestionProps = {
    text: '1. 각 네모 안에서 어법에 맞는 표현으로 가장 적절한 것을 고르시오.',
  };
  const uiInfo: IUiInfo = { exampleType: 'dot', exampleFlex: 'column', optionGrid: 2, optionGap: 20 };

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

export default P09;
