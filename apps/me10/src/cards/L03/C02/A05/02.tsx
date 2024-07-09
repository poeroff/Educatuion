import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Choose',
    headerPattern: 'icon',
    iconType: 'listeningStrategy',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A05/ME1-L03-C02-A05-P02.mp3',
    captionSrc: '/L03/C02/A05/ME1-L03-C02-A05-P02.srt',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Jiwon, what’s the problem? You look upset.',
      translation: '지원아, 무슨 일 있니? 기분이 안 좋아 보여.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'I’m not upset. I’m just hungry.',
      translation: '기분이 나쁜 건 아냐. 다만 배가 고플 뿐이야.',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'I have some cookies. Do you want some?',
      translation: '나한테 쿠키가 좀 있어. 좀 먹을래?',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Great. Can I have them all?',
      translation: '좋아. 내가 다 먹어도 될까?',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'Umm, sure.',
      translation: '음, 그래.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
