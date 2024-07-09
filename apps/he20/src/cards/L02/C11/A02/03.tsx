import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const headerInfo: TMainHeaderInfoTypes = {
  headerText: 'A. Listening',
};

const audioInfo: IAudioPlayerProps = {
  audioSrc: '/L02/C11/A02/HE2-L02-C11-A02.mp3',
  captionSrc: '/L02/C11/A02/HE2-L02-C11-A02.srt',
};

const data: IListenAndAnswer[] = [
  {
    originText: `Daniel, you look busy.`,
    translation: `Daniel, 바빠 보이는데요.`,
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `What’s going on?`,
    translation: `무슨 일이에요?`,
    inLine: true,
  },
  {
    originText: `Oh, I’m trying to find some good Korean restaurants for a family gathering.`,
    translation: `아, 가족 모임에 좋은 한식당을 찾고 있어요.`,
    label: 'M',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `Do you have any recommendations?`,
    translation: `추천해 주실 만한 곳이 있나요?`,
    inLine: true,
  },
  {
    originText: `How many people are you expecting?`,
    translation: `몇 명을 예상하는데요?`,
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `About 10.`,
    translation: `한 10명 정도요.`,
    label: 'M',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `We’d like to get a private room.`,
    translation: `저희는 개별 룸을 이용하고 싶어요.`,
    inLine: true,
  },
  {
    originText: `In that case, I recommend Seorabeol, a traditional Korean restaurant.`,
    translation: `그렇다면 한국의 전통 음식점인 서라벌을 추천해요.`,
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `It’s right by the park, and it has lots of private rooms of different sizes.`,
    translation: `공원 바로 옆에 있고, 크기가 다른 프라이빗 룸이 많이 있어요.`,
    inLine: true,
  },
  {
    originText: `What’s the food like there?`,
    translation: `그곳의 음식은 어때요?`,
    label: 'M',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `All the dishes are healthy and delicious.`,
    translation: `모든 요리가 건강하고 맛있어요.`,
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `My family was quite satisfied with the food there.`,
    translation: `우리 가족은 그곳의 음식에 꽤 만족했거든요.`,
    inLine: true,
  },
  {
    originText: `That sounds great.`,
    translation: `좋을 것 같네요.`,
    label: 'M',
    labelColor: 'var(--color-yellow-100)',
  },
  {
    originText: `I’ll try to get a reservation.`,
    translation: `예약해 봐야겠어요.`,
    inLine: true,
  },
  {
    originText: `Thanks for the suggestion.`,
    translation: `제안 고마워요.`,
    inLine: true,
  },
  {
    originText: `You’re welcome.`,
    translation: `천만에요.`,
    label: 'W',
    labelColor: 'var(--color-blue-100)',
  },
  {
    originText: `I hope your family likes the restaurant as much as mine did!`,
    translation: `가족들도 저희 집처럼 식당을 좋아하셨으면 좋겠어요!`,
    inLine: true,
  },
];

const P03 = () => {
  return <HE00501 headerInfo={headerInfo} audioInfo={audioInfo} data={data} />;
};

export default P03;
