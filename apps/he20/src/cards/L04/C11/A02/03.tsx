import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'A. Listening',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L04/C11/A02/HE2-L04-C11-A02.mp3',
  captionSrc: '/L04/C11/A02/HE2-L04-C11-A02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: `I haven’t had anything to eat today.`,
    translation: `오늘은 아무것도 못 먹었어.`,
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `Let’s get some food.`,
    translation: `뭘 좀 먹자.`,
    inLine: true,
  },
  {
    originText: `Sounds good!`,
    translation: `좋아!`,
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `I just downloaded this restaurant review app, Tasty Choices, earlier today.`,
    translation: `오늘 아까 맛집 리뷰 앱 테이스티 초이스를 다운 받았는데.`,
    inLine: true,
  },
  {
    originText: `Let me open it up.`,
    translation: `한번 열어 볼게.`,
    inLine: true,
  },
  {
    originText: `I have that on my phone, too.`,
    translation: `내 핸드폰에도 그거 있어.`,
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `It’s convenient and easy to use.`,
    translation: `편리하고 사용하기 쉽지.`,
    inLine: true,
  },
  {
    originText: `That’s great!`,
    translation: `잘됐다!`,
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Can you show me how to use it properly?`,
    translation: `그거 제대로 사용하는 방법 좀 알려 줄래?`,
    inLine: true,
  },
  {
    originText: `I’m not that familiar with it yet.`,
    translation: `아직 잘 모르겠어.`,
    inLine: true,
  },
  {
    originText: `Sure.`,
    translation: `그럼.`,
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `First, enter your location to search for restaurants near you.`,
    translation: `일단 위치를 입력해서 가까운 식당을 검색해 봐.`,
    inLine: true,
  },
  {
    originText: `Then, you can arrange them in the order of the highest ratings.`,
    translation: `그런 다음 평점이 높은 순서대로 정렬하면 돼.`,
    inLine: true,
  },
  {
    originText: `Got it.`,
    translation: `알겠어.`,
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Let me see...`,
    translation: `어디 볼까…`,
    inLine: true,
  },
  {
    originText: `What do you think about this Vietnamese restaurant?`,
    translation: `이 베트남 음식점은 어떤 것 같아?`,
    inLine: true,
  },
  {
    originText: `It’s rated 4.5 out of 5.`,
    translation: `5점 만점에 4.5점이야.`,
    inLine: true,
  },
  {
    originText: `Well, we should check the operating hours.`,
    translation: `영업시간을 확인해 봐야겠네.`,
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `It’s 3:30 now, so some places might be closed for a break.`,
    translation: `지금이 3시 30분이라서 쉬는 곳도 있을 것 같아.`,
    inLine: true,
  },
  {
    originText: `Press the “Open Now” button.`,
    translation: `‘지금 영업 중’ 버튼을 눌러 봐.`,
    inLine: true,
  },
  {
    originText: `Oh, you’re right. It’s closed.`,
    translation: `아, 맞네. 문 닫았네.`,
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Then, how about this Chinese restaurant?`,
    translation: `그럼 이 중식당은 어때?`,
    inLine: true,
  },
  {
    originText: `It’s open now, and has a 4.4 rating.`,
    translation: `지금 영업 중이고 평점 4.4점이야.`,
    inLine: true,
  },
  {
    originText: `It’s only a five-minute walk away.`,
    translation: `걸어서 5분 거리에 있어.`,
    inLine: true,
  },
  {
    originText: `Sounds perfect.`,
    translation: `완벽해.`,
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Let’s go and get some dim sum!`,
    translation: `가서 딤섬을 먹자!`,
    inLine: true,
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} data={data} />;
};

export default P03;
