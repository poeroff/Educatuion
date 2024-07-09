import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'The Power of Friendliness: Soft but Strong (5)',
};
const questionInfo = {
  text: 'Translations',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Recycled coffee grounds have a wide range of uses, including coffee logs, fabrics for clothing and shoes, and reusable cups. ',
    translation: '재활용된 커피 찌꺼기는 커피 통나무, 의류 및 신발용 직물, 재사용 가능한 컵 등 다양한 용도로 사용됩니다.',
  },
  {
    originText: 'Coffee logs, for instance, generate more heat and burn for a longer time than wood.',
    translation: '예를 들어, 커피 통나무는 나무보다 더 많은 열을 발생시키고 더 오랫동안 연소됩니다.',
  },
  {
    originText: 'Fabric made from coffee grounds absorbs sweat, dries quickly, and provides UV protection. ',
    translation: '커피 찌꺼기로 만든 원단은 땀을 흡수하고 빠르게 건조되며 자외선 차단 기능을 제공합니다.',
  },
  {
    originText: 'Reusable cups from coffee grounds not only have a visually appealing appearance but also preserve the taste of the coffee.',
    translation: '커피 찌꺼기로 만든 재사용 가능한 컵은 시각적으로 매력적인 외관을 가질 뿐만 아니라 커피의 맛도 보존합니다.',
  },
  {
    originText: 'Korea has shown a growing interest in recycling spent coffee grounds in recent years. ',
    translation: '최근 몇 년간 한국에서는 커피 찌꺼기 재활용에 대한 관심이 높아지고 있습니다.',
  },
  {
    originText:
      'The government is taking steps toward the creation of a sustainable recycling system in the coffee industry, while companies are dedicating themselves to researching and developing new uses for coffee waste. ',
    translation:
      '정부는 커피 산업에서 지속 가능한 재활용 시스템 구축을 위한 조치를 취하고 있으며, 기업들은 커피 폐기물의 새로운 용도를 연구하고 개발하는 데 전념하고 있습니다.',
  },
  {
    originText: 'By recycling materials such as coffee waste, individuals can also help protect the environment. ',
    translation: '커피 찌꺼기와 같은 물질을 재활용함으로써 개인도 환경을 보호하는 데 도움을 줄 수 있습니다.',
  },
  {
    originText:
      'With continued efforts, the recycling of used coffee grounds is expected to increase, encouraging more sustainable methods of enjoying coffee for years to come.',
    translation:
      '지속적인 노력을 통해 사용된 커피 찌꺼기의 재활용이 증가하여 앞으로 수년간 커피를 즐기는 보다 지속 가능한 방법이 장려될 것으로 예상됩니다.',
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
