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
    audioSrc: '/L02/C02/A05/ME1-L02-C02-A05-P02.mp3',
    captionSrc: '/L02/C02/A05/ME1-L02-C02-A05-P02.srt',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Sujin, what are you doing?',
      translation: '수진아, 뭐 하고 있어?',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'I’m shopping for some clothes online.',
      translation: '나는 온라인으로 옷을 쇼핑하고 있어.',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'What kind of clothes are you looking for?',
      translation: '어떤 종류의 옷을 찾고 있어?',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'I’m looking for a T-shirt. How about this one?',
      translation: '나는 티셔츠를 찾고 있어. 이거 어때?',
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'Oh, it’s so cute.',
      translation: '오, 그거 매우 귀엽다.',
      label: 'B',
      labelColor: 'var(--color-blue-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
