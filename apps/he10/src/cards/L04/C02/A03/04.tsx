import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
}

const P04 = ({ headerInfo, audioInfo }: IProps) => {
  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'Kate, what’s on your mind? You look a bit concerned.',
      translation: 'Kate, 무슨 일이야? 걱정스러운 표정이네.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'I’m just looking at a graph of the sea level.',
      translation: '해수면 그래프를 보고 있어.',
    },
    {
      inLine: true,
      originText: 'Here, take a look.',
      translation: '여기 좀 봐.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'Hmm, it seems to be rising steadily but with some ups and downs.',
      translation: '음, 꾸준히 상승하는 것 같지만 기복이 좀 있다.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Yes, the rising sea level is becoming a problem.',
      translation: '맞아, 해수면 상승이 문제가 되고 있어.',
    },
    {
      inLine: true,
      originText: 'I’m especially worried about the people in Tuvalu in the South Pacific Ocean.',
      translation: '특히 남태평양에 있는 Tuvalu 사람들이 걱정이지.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'What do you mean?',
      translation: '무슨 뜻이야?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Well, if the sea level continues to rise, most of their land may disappear into the sea within a hundred years.',
      translation: '해수면이 계속 상승하면 100년 안에 대부분의 땅이 바다 속으로 사라질 수도 있어.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'Oh, really?',
      translation: '아, 정말?',
    },
    {
      inLine: true,
      originText: 'I suppose if their land is lost, they’ll lose their culture and traditions as well as their homes.',
      translation: '땅을 잃으면 집뿐만 아니라 문화와 전통도 잃게 되겠다.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Exactly.',
      translation: '맞아.',
    },
    {
      inLine: true,
      originText: 'It’s a shame that the rising sea level is mostly due to human activities.',
      translation: '해수면 상승이 대부분 인간의 활동 때문이라는 게 안타깝지.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'You’re right.',
      translation: '맞아.',
    },
    {
      inLine: true,
      originText: 'We should be alert to the potential dangers and take appropriate action.',
      translation: '우리는 잠재적인 위험에 대해 경각심을 갖고 적절한 조치를 취해야 해.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
