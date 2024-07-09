import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'A. Listening',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L04/C11/A02/HE1-L04-C11-A02.mp3',
  captionSrc: '/L04/C11/A02/HE1-L04-C11-A02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Lucy, take a look at this line graph showing the average global temperature over the last 20 years.',
    translation: 'Lucy, 지난 20년 동안 평균 지구 온도를 보여주는 이 선 그래프를 봐 봐.',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Wow! Look how steadily it’s been going up!',
    translation: '우와! 지속적으로 꾸준히 올라갔네!',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'You’re absolutely right. ',
    translation: '내 말이 그 말이야.',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'The temperature is rising rapidly.',
    translation: '온도가 빠르게 상승하고 있어.',
    inLine: true,
  },
  {
    originText: 'Yeah, it’s like the Earth isn’t just warming — it’s burning.',
    translation: '맞아. 지구 온난화가 아니라 타는 것 같아',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'Exactly. I’m really worried about climate change.',
    translation: '그러니까. 난 기후 변화에 대해 정말로 걱정하고 있어.',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'It’s time to take action.',
    translation: '이제 행동을 취할 때야.',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'I think so, too. ',
    translation: '나도 그렇게 생각해.',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'People need to know how serious this issue is.',
    translation: '사람들이 문제가 얼마나 심각한지 알아야 해.',
    inLine: true,
  },
  {
    originText: 'I couldn’t agree more.',
    translation: '강력하게 동의해.',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'How about writing a school newspaper article on this topic?',
    translation: '이 주제에 관해 학교 신문 기사를 작성하는 건 어떨까?',
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'That’s a fantastic idea! ',
    translation: '환상적인 생각이야!',
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'It’ll be a perfect subject for next month’s issue.',
    translation: '다음 달 이슈에 완벽한 주제가 될 것 같아.',
    inLine: true,
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} data={data} />;
};

export default P03;
