import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C12/A03/ME1-L06-C12-A03-P02.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Yuri, what do you want to be in the future?',
      translation: '유리야, 너는 미래에 무엇이 되고 싶니?',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'I want to be a designer. What about you, Hongmin?',
      translation: '나는 디자이너가 되고 싶어. 홍민아, 너는?',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'I want to be a cook.',
      translation: '나는 요리사가 되고 싶어.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'That sounds great.',
      translation: '그거 좋네.',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
