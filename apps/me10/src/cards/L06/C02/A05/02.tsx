import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Check',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C02/A05/ME1-L06-C02-A05-P02.mp3',
    captionSrc: '/L06/C02/A05/ME1-L06-C02-A05-P02.srt',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Jiwoo, what are you interested in?',
      translation: '지우야, 너는 무엇에 관심이 있니?',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'I’m interested in dancing. How about you, Eric?',
      translation: '나는 춤추는 것에 관심이 있어. Eric, 너는?',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `I’m into making webtoons.`,
      translation: '나는 웹툰 그리는 것에 관심이 있어.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Can you show me one of your webtoons?',
      translation: '네 웹툰 중 하나를 나에게 보여줄 수 있니?',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `Sure. I’d love to share my webtoons with you.`,
      translation: '물론이지. 나의 웹툰을 너와 공유하고 싶어.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
