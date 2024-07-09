import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (2)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Translations',
    size: 'medium',
  };

  const data: IListenAndAnswer[] = [
    {
      originText:
        'The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant waste.',
      translation: '커피에 대한 전 세계의 광범위한 사랑은 추출 과정에서 상당한 폐기물이 발생하기 때문에 상당한 환경 비용을 초래합니다.',
    },
    {
      originText: 'Only 0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent disposed of as waste.',
      translation: '커피 원두 중 0.2% 만이 커피를 만드는 데 사용되며, 나머지 99.8% 는 폐기물로 처리됩니다.',
    },
    {
      originText: 'As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.',
      translation: '결과적으로 전 세계적으로 소비되는 엄청난 양의 커피로 인해 매년 수백만 톤의 커피 폐기물이 발생합니다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
