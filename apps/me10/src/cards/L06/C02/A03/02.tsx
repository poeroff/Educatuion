import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meListenAndCheck',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L06/C02/A03/ME1-L06-C02-A03-P02.mp3',
    captionSrc: '/L06/C02/A03/ME1-L06-C02-A03-P02.srt',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'Kevin’s birthday is coming up.',
      translation: 'Kevin의 생일이 다가오고 있어.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-orange-200)',
      originText: 'I know. I want to do something for him.',
      translation: '알아. 나는 그에게 무언가를 해 주고 싶어.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'What do you want to do?',
      translation: '너는 무엇을 하고 싶니?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-orange-200)',
      originText: 'Umm, I want to bake a birthday cake for him.',
      translation: '음, 나는 그에게 생일 케이크를 구워 주고 싶어.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'That’s a good idea. You’re good at baking.',
      translation: '그거 좋은 생각이다. 너는 빵 굽는 것을 잘하잖아.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} questionInfo={questionInfo} data={data} />;
};

export default P02;
