import { TMainHeaderInfoTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'Listen and Answer',
};

const questionInfo: IQuestionProps = {
  text: 'Scripts',
  size: 'medium',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L02/C03/A02/HE1-L02-C03-A02-01.mp3',
  captionSrc: '/L02/C03/A02/HE1-L02-C03-A02-01.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: 'Hey, look at the woman in this picture.',
    translation: '이 사진 속 여자를 봐봐.',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'It looks like she’s making fun of someone.',
    translation: '누군가를 놀리고 있는 것처럼 보이네.',
    inLine: true,
  },
  {
    originText: 'I know, it does look like that, but she’s actually just saying hi.',
    translation: '응, 그렇게 보이긴 하지만 사실 그냥 인사하는 거야.',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'In certain regions of Tibet, sticking out tongues like that is a traditional way of greeting people.',
    translation: '티베트의 특정 지역에서는 혀를 내밀고 인사하는 것이 전통적인 인사 방식이야.',
    inLine: true,
  },
  {
    originText: 'Really?',
    translation: '정말?',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'So, it’s like waving our hands or giving a high-five?',
    translation: '그럼 손을 흔들거나 하이파이브를 하는 것과 같은 건가?',
    inLine: true,
  },
  {
    originText: 'Yes, exactly!',
    translation: '응, 맞아!',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'There’s an interesting history behind why Tibetans do it.',
    translation: '티베트인들이 혀를 내미는 이유에는 흥미로운 역사가 있어.',
    inLine: true,
  },
  {
    originText: 'Oh, yeah? What’s that?',
    translation: '아, 그래? 그게 뭔데?',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'Well, it’s said that there was a cold-blooded king named Lang Darma(랭 달마), who had a black tongue.',
    translation: '옛날에 Lang Darma라는 냉혈한 왕이 있었는데, 그 사람은 혀가 검은 색이었다고 해.',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'To prove they weren’t related to him, Tibetans started showing their tongues when they met someone new.',
    translation: '티베트인들은 그와 친척이 아니라는 것을 증명하기 위해 새로운 사람을 만나면 혀를 내밀기 시작했대.',
    inLine: true,
  },
  {
    originText: 'Oh, interesting.',
    translation: '아, 흥미롭네.',
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: 'But isn’t sticking out tongues considered a bit rude in some cultures, like ours?',
    translation: '하지만 우리 같은 일부 문화권에서는 혀를 내미는 것이 무례한 행동으로 여겨지지 않나?',
    inLine: true,
  },
  {
    originText: 'That’s true, but not in Tibet.',
    translation: '그렇긴 하지만 티베트에서는 그렇지 않아.',
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: 'So, if you ever visit Tibet, make sure not to get offended when someone sticks their tongue out at you!',
    translation: '그러니 티베트를 방문한다면 누군가 혀를 내밀어도 기분이 상하지 않도록 조심해!',
    inLine: true,
  },
];
const P02 = () => {
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
