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
    audioSrc: '/L05/C02/A05/ME1-L05-C02-A05-P02.mp3',
    captionSrc: '/L05/C02/A05/ME1-L05-C02-A05-P02.srt',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Welcome to Sun Cafe. How can I help you?',
      translation: 'Sun Cafe에 어서 오세요. 무엇을 도와드릴까요?',
      label: 'W',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'I want the strawberry juice, please.',
      translation: '저는 딸기 주스를 마시고 싶어요.',
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `Sure. That'll be 5,000 won.`,
      translation: '네. 5천 원입니다.',
      label: 'W',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Okay.',
      translation: '알겠습니다.',
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `Oh, wait. Why don’t you use your own bottle?`,
      translation: '오, 잠시만요. 손님의 개인 병을 사용하시는 게 어때요?',
      label: 'W',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: `We can give you a 500 won discount.`,
      translation: '저희가 5백 원 할인해 드릴 수 있어요.',
      inLine: true,
    },
    {
      originText: 'Really? That’s great. Here it is.',
      translation: '정말요? 잘됐네요. 여기 있습니다.',
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
