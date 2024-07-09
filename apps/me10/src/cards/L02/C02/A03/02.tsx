import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndChoose',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/ME1-L02-C02-A03-P02.mp3',
    captionSrc: '/L02/C02/A03/ME1-L02-C02-A03-P02.srt',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'G',
      labelColor: 'var(--color-orange-200)',
      originText: 'Dad, how’s the weather?',
      translation: '아빠, 날씨가 어때요?',
    },
    {
      label: 'M',
      labelColor: 'var(--color-blue-100)',
      originText: 'It’s cold and windy outside. Are you going out?',
      translation: '바깥은 춥고 바람이 많이 불어. 너 외출하는 거니?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-orange-200)',
      originText: 'Yes, I have soccer practice today.',
      translation: '네, 오늘 축구 연습이 있어요.',
    },
    {
      label: 'M',
      labelColor: 'var(--color-blue-100)',
      originText: 'You need a jacket, then.',
      translation: '그러면 너는 재킷이 필요하겠구나.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
