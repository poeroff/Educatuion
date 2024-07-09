import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (5)',
  };

  const questionInfo = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'In our competitive society, many people believe that only the biggest or the strongest can survive and thrive.',
      translation: '우리의 경쟁 사회에서, 많은 사람들은 가장 크거나 가장 강한 자들만이 살아남아 번영할 수 있다고 믿습니다.',
    },
    {
      originText: 'However, I propose an alternative view: kindness is the key to success.',
      translation: '그러나 저는 다른 관점을 제시합니다: 친절이 성공으로 가는 열쇠라는 것입니다.',
    },
    {
      originText: 'Isn’t that a comforting thought?',
      translation: '위안이 되는 생각 아닌가요?',
    },
    {
      originText: 'We can use the power of our natural kindness to communicate and cooperate with different individuals.',
      translation: '우리는 다른 개개인과 의사소통하고 협력하기 위해 우리의 타고난 친절의 힘을 사용할 수 있습니다.',
    },
    {
      originText: 'We can all benefit from this instead of trying to be better than others.',
      translation: '우리는 모두 다른 사람보다 잘하려고 노력하는 대신에 이것으로부터 이득을 얻을 수 있습니다.',
    },
    {
      originText: 'I’d like to end this talk with a message.',
      translation: '저는 하나의 메시지를 던지며 이 이야기를 끝내고 싶습니다.',
    },
    {
      originText: 'Think of our society as a bouquet.',
      translation: '우리 사회를 꽃다발이라고 생각해 보세요.',
    },
    {
      originText:
        'Just as each flower adds to the beauty when it harmonizes with the others, each person can contribute to a more beautiful world when they cooperate.',
      translation:
        '각각의 꽃이 다른 꽃들과 조화를 이룰 때 아름다움을 더하는 것처럼, 각각의 사람은 그들이 협력할 때 더 아름다운 세상에 기여할 수 있습니다.',
    },
    {
      originText: 'By being kind and working together, we can truly flourish.',
      translation: '서로 친절하고 협력할 때 우리는 진정으로 번영할 수 있습니다.',
    },
    {
      originText: 'Thank you for your attention.',
      translation: '관심을 가져주셔서 감사합니다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
