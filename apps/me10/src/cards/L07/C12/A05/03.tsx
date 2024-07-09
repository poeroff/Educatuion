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
      originText: 'The Sahara is the largest hot desert on Earth.',
      translation: '사하라 사막은 지구상에서 가장 큰 더운 사막이다.',
    },
    {
      originText: 'The word “sahara” means “desert.”.',
      translation: '‘사하라’라는 말은 ‘사막’을 의미한다.',
    },
    {
      originText: 'During the summer days, the Sahara is the hottest place in the world.',
      translation: '여름 동안 , 사하라 사막은 세상에서 가장 더운 지역이다.',
    },
    {
      originText: 'But it is cooler at night.',
      translation: '그러나 밤에는 더 서늘하다.',
    },
    {
      originText: 'In winter, it is even cold at night.',
      translation: '심지어 겨울에 밤에는 춥다 .',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
