import { IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { RecoilState } from 'recoil';
import NumberSelectQuestion, { INumberSelectStore, IUiInfo } from './components/NumberSelectQuestion';
import { L02SP04_1 } from './store';

interface Props {
  _page?: string;
  _store?: RecoilState<object>;
}

const P10 = ({ _page = 'P10', _store = L02SP04_1 }: Props) => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };
  const questionInfo: IQuestionProps = {
    text: (
      <>
        2. 다음 중 밑줄 친 부분이 어법상{' '}
        <Typography useGap={false} fontSize='inherit' textDecoration='underline'>
          틀린
        </Typography>{' '}
        것을 고르시오.
      </>
    ),
  };
  const uiInfo: IUiInfo = { exampleFlex: 'column', optionGrid: 1, optionGap: 20 };

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

export default P10;
