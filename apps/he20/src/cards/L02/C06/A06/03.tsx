import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (4)',
  };

  const questionInfo: IQuestionProps = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Dark patterns on digital platforms are becoming more complex and more prevalent.',
      translation: '디지털 플랫폼의 다크 패턴은 점점 더 복잡해지고 있으며 그리고 더 널리 퍼지고 있습니다.',
    },
    {
      originText: 'So, what is driving their growth?',
      translation: '그렇다면 이러한 성장의 원동력은 무엇일까요?',
    },
    {
      originText:
        'Over the years, online commerce has grown steadily, especially with the development of smart phones and other digital technologies.',
      translation:
        '지난 몇 년 동안 온라인 상거래는 특히 스마트폰과 기타 디지털 기술의 발전과 함께 특히 스마트폰 및 기타 디지털 기술의 발전과 함께 꾸준히 성장해 왔습니다.',
    },
    {
      originText:
        'As the competition in online markets has intensified, companies have begun to develop sneakier strategies to trick people into making purchases.',
      translation:
        '온라인 시장에서의 경쟁이 심화됨에 따라 온라인 시장의 경쟁이 치열해지면서, 기업들은 사람들의 구매를 유도하기 위한 구매를 유도하기 위한 전략을 개발하기 시작했습니다.',
    },
    {
      originText:
        'While these companies insist that they are simply using new types of marketing strategies, critics do not agree that dark patterns are valid marketing strategies.',
      translation:
        '이러한 기업들은 단순히 새로운 유형의 마케팅 전략을 사용하고 있다고 주장하지만, 비평가들은 은 다크 패턴이 유효한 마케팅 전략이라는 데 동의하지 않습니다.',
    },
    {
      originText:
        'Rather, they suggest that a real marketing strategy create value for both companies and customers, promoting positive and supportive relationships.',
      translation: '오히려 그들은 진정한 마케팅 전략은 기업과 고객 모두에게 가치를 창출하고 고객, 긍정적이고 지지적인 관계를 촉진합니다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
