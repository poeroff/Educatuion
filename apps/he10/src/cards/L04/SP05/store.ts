import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L04SP05 = atom<{
  [key: string]: {
    answer?: string;
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    exampleAnswerEng?: string;
    exampleAnswerKor?: string;
  };
}>({
  key: 'L04SP05',
  default: {
    p01: {
      answer: '',
      audioData: {},
      isSubmitted: false,
      exampleAnswerEng: 'I’m worried about my spending habits. It’s because I tend to buy things without careful consideration.',
      exampleAnswerKor: '나는 나의 소비 습관에 대해 걱정이 된다. 이는 내가 신중하게 고려하지 않고 물건을 사는 경향이 있기 때문이다.',
    },
    p02: {
      answer: '',
      isSubmitted: false,
      exampleAnswerEng:
        'There are several ways we can do to reduce plastic waste. For example, we can decrease the use of plastic not only by bringing reusable bags to markets but also by choosing products with eco-friendly packaging. With more people starting to do such simple things, our environment might become better.',
      exampleAnswerKor:
        '플라스틱 쓰레기를 줄이기 위해 내가 할 수 있는 일이 몇 가지 있다. 예를 들어, 나는 시장에 재사용할 수 있는 가방을 가져갈 뿐만 아니라 친환경 포장이 된 제품을 고르는 것으로도 플라스틱의 사용을 줄일 수 있다. 더 많은 사람들이 그러한 간단한 일을 하기 시작하면, 우리 환경은 더 좋아질 수 있을 것이다.',
    },
  },
});
