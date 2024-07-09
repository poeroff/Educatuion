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
      originText: 'I want to be a caring person in the future.',
      translation: '나는 장래에 배려하는 사람이 되고 싶다.',
    },
    {
      originText: 'I will listen to others and think of their feelings.',
      translation: '나는 다른 사람들의 말을 잘 듣고 그들의 감정을 고려할 것이다.',
    },
    {
      originText: 'I will help people in need around the world.',
      translation: '나는 전 세계에 도움이 필요한 사람들을 도울 것이다.',
    },
    {
      originText: 'How about you?',
      translation: '당신은 어떤가?',
    },
    {
      originText: 'Who do you want to be in the future?',
      translation: '당신은 장래에 어떤 사람이 되고 싶은가?',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P03;
