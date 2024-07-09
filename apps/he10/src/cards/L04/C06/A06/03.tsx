import HE00501 from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

interface IoriginTextglishAndtranslationrean {
  originText: string;
  translation: string;
}

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (4)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IoriginTextglishAndtranslationrean[] = [
    {
      originText:
        'An example of a circular economy in action occurs whoriginText a chain of coffee shops collaborates with an organization to collect sporiginTextt coffee grounds from its shops.',
      translation: '커피숍 체인이 조직과 협력하여 매장에서 사용된 커피 찌꺼기를 수집하는 것은 순환 경제가 실행되는 사례입니다.',
    },
    {
      originText: 'These grounds are processed to remove impurities and dried out',
      translation: '이러한 찌꺼기는 불순물을 제거하기 위해 가공되고 건조됩니다.',
    },
    {
      originText: 'The resulting SCGs are sold to fertilizer companies, where they are transformed into organic fertilizer.',
      translation: '생성된 SCG 는 비료회사에 판매되어 유기비료로 전환됩니다.',
    },
    {
      originText: 'This fertilizer is later sold back to the coffee shop chain.',
      translation: '이 비료는 나중에 커피숍 체인에 다시 판매됩니다.',
    },
    {
      originText: 'The chain provides the fertilizer to local ecofrioriginTextdly farmers, who thoriginText sell their produce back to the chain.',
      translation: '체인은 지역 친환경 농부들에게 비료를 제공하고, 농부들은 자신의 농산물을 체인에 다시 판매합니다.',
    },
    {
      originText:
        'The farm produce can be used to create various food items, such as rice chips and dried sweet potatoes, which are sold in the chain’s coffee shops.',
      translation: '농산물로 쌀칩, 말린 고구마 등 다양한 식품을 만들어 체인 커피숍에서 판매할 수 있습니다.',
    },
    {
      originText:
        'By repurposing coffee grounds in this manner, related businesses and local farmers can benefit both economically and environmentally.',
      translation: '이러한 방식으로 커피 찌꺼기를 재활용함으로써 관련 기업과 지역 농민들은 경제적, 환경적 혜택을 누릴 수 있습니다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
