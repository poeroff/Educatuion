import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IQuestionProps, TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C12/A03/ME1-L04-C12-A03-P02.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'This weekend, my family will go camping.',
      translation: '이번 주말에 우리 가족은 캠핑을 가려고 한다.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'We’ll have a lot of delicious food and relax.',
      translation: '우리는 맛있는 음식을 많이 먹고 푹 쉬다 올 것이다.',
      inLine: true,
    },
    {
      originText: 'I’m so excited!',
      translation: '정말 기대된다!',
      inLine: true,
    },
  ];
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
