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
    audioSrc: '/L04/C02/A05/ME1-L04-C02-A05-P02.mp3',
    captionSrc: '/L04/C02/A05/ME1-L04-C02-A05-P02.srt',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'Do you know any good bakeries near here? I want some bread.',
      translation: '여기 근처에 있는 좋은 빵집을 아니? 나는 빵을 좀 사고 싶어.',
      label: 'G',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Yes, Sky Bakery is really good.',
      translation: '응, 스카이 빵집이 정말 좋아.',
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: 'Great. Where is it?',
      translation: '잘됐다. 그것은 어디에 있어?',
      label: 'G',
      labelColor: 'var(--color-blue-100)',
    },
    {
      originText: 'Go straight one block and turn right. It’s on your right.',
      translation: '한 블록 직진해서 오른쪽으로 돌아. 네 오른쪽에 있어.',
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
    },
    {
      originText: `It's so close. Thanks.`,
      translation: '아주 가깝네. 고마워.',
      label: 'G',
      labelColor: 'var(--color-blue-100)',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
