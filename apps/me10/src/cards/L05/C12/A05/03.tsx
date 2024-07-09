import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Reading',
  };

  const questionInfo: IQuestionProps = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Minsu takes his own water bottle everywhere for the environment.',
      translation: '민수는 환경을 위해 어디든 자신의 병을 가지고 간다.',
    },
    {
      originText: 'Today, he went to a cafe for a drink.',
      translation: '오늘, 그는 음료수를 마시려고 카페에 갔다.',
    },
    {
      originText: 'They filled his bottle with lemonade.',
      translation: '그의 병에 레모네이드를 채워주었다.',
    },
    {
      originText: 'They also gave him a discount.',
      translation: '그들은 또한 그에게 할인을 해 주었다.',
    },
    {
      originText: 'Why don’t you carry your own water bottle?',
      translation: '네 자신의 병을 가지고 다니는 건 어떤가?',
    },
    {
      originText: 'It helps the environment.',
      translation: '그것은 환경에 도움이 된다.',
    },
    {
      originText: 'It saves money, too.',
      translation: '또한 돈을 아껴준다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
