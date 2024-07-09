import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L07/C02/A03/ME1-L07-C02-A03-P02.mp3',
    captionSrc: '/L07/C02/A03/ME1-L07-C02-A03-P02.srt',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'B',
      labelColor: 'var(--color-orange-200)',
      originText: 'Do you know about Angel Falls?',
      translation: '너는 앙헬 폭포에 대해 알고 있니?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Angel Falls? What is it? ',
      translation: '앙헬 폭포? 그게 뭐니?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-orange-200)',
      originText: 'It’s the tallest waterfall in the world. It’s in Venezuela.',
      translation: '그것은 세계에서 가장 높은 폭포야. 그것은 베네수엘라에 있어.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'That’s interesting. How did you know that?',
      translation: '흥미롭네. 너는 그것을 어떻게 알았어?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-orange-200)',
      originText: 'I went there last summer. Would you like to see some pictures? I have some on my phone.',
      translation: '나는 지난 여름에 거기에 갔거든. 사진들 좀 볼래? 내 휴대 전화에 몇 장 있어.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Sure. It looks so wonderful. I’d like to go there someday.',
      translation: '물론이지. 그것은 정말 멋있어 보이네. 나는 언젠가 거기에 가고 싶어.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
