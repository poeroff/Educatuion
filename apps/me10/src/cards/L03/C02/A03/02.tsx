import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/ME1-L03-C02-A03-P02.mp3',
    captionSrc: '/L03/C02/A03/ME1-L03-C02-A03-P02.srt',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'W',
      labelColor: 'var(--color-orange-200)',
      originText: 'Excuse me, can you help me with this machine?',
      translation: '실례지만, 이 기계를 사용하는 것을 도와줄 수 있나요?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'Sure. What can I do for you?',
      translation: ' 물론이죠. 무엇을 도와 드릴까요?',
    },
    {
      label: 'W',
      labelColor: 'var(--color-orange-200)',
      originText: 'Can you order a drink for me?',
      translation: '음료 한 잔을 주문해 주실 수 있나요?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'No problem. They have orange juice, watermelon juice, and lemonade. Which one would you like?',
      translation: '물론이죠. 오렌지 주스, 수박 주스, 레모네이드가 있네요. 어떤 것을 드시겠어요?',
    },
    {
      label: 'W',
      labelColor: 'var(--color-orange-200)',
      originText: 'Orange juice, please. Thank you.',
      translation: '오렌지 주스로 할게요. 고마워요.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'You’re welcome.',
      translation: '천만에요.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
