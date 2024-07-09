import HE00501 from '@maidt-cntn/pages/HE-005-01';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { contentInfo } from './contentInfo';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Who Do I Want to Be? (2)',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={contentInfo.P03.body} />;
};

export default P03;
