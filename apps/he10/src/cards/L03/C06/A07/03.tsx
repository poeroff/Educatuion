import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (5)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const paragraphs: IListenAndAnswer[] = [
    {
      originText: 'As technology advances, many people expect it will solve various social issues caused by noise pollution.',
      translation: '기술이 발전함에 따라 소음공해로 인한 다양한 사회문제가 해결될 것으로 많은 사람들이 기대하고 있습니다.',
    },
    {
      originText: 'A common source of these problems is noisy neighbors, as the noise they make can lead to conflict among residents.',
      translation: '일반적으로 문제가 되는 시끄러운 이웃이 내는 소음은 주민들 사이의 갈등으로 이어질 수 있습니다.',
    },
    {
      originText:
        'Noise-cancellation technology can help address these problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.',
      translation:
        '노이즈 캔슬링 기술은 원치 않는 방해를 줄여 이러한 문제를 해결하는 데 도움을 주어 사람들이 더욱 평화롭고 건강한 삶을 영위할 수 있도록 해줍니다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={paragraphs} />;
};

export default P03;
