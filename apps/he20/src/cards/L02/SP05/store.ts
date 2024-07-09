import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02SP05 = atom<TL02SP05>({
  key: 'L02SP05',
  default: {
    p01: {
      audioData: {
        1: {},
      },
      examples: [
        {
          text: 'What do you think about your school facilities?',
        },
        {
          text: 'Use an expression you learned in this lesson.',
        },
      ],
      correctAnswer:
        'I’m quite satisfied with our school facilities, especially the English classroom. Its comfortable space provides a perfect environment to discuss in English.',
      translations: [
        '여러분의 학교 시설에 대해 어떻게 생각하나요? 이 단원에서 배운 표현을 활용하세요.',
        '나는 우리 학교 시설에 꽤 만족하며, 특히 영어 교실에 만족한다. 그곳의 편안한 공간은 영어로 토의할 완벽할 환경을 제공해 준다.',
      ],
      isSubmitted: false,
    },

    p02: {
      answer1: '',
      examples: [
        {
          text: 'Have you ever been tricked by dark patterns online? Write a short paragraph about your experience, using key expressions you learned in this lesson.',
        },
      ],
      correctExamples: [
        {
          text: 'I have experienced “hidden fees” when shopping online. After I paid for a product online, I noticed that shipping fees were included in the final cost. I should have checked the total cost at the last step of the ordering process, but I didn’t.',
        },
      ],
      translations: [
        '온라인상의 다크 패턴에 속아 넘어간 적이 있나요? 이 단원에서 배운 주요 표현을 활용하여 여러분의 경험에 대한 짧은 글을 써 보세요.',
        '나는 온라인으로 쇼핑할 때 “숨겨진 요금”을 겪은 적이 있다. 내가 온라인으로 물건을 지불한 후에, 배송비가 최종 비용에 포함되어 있다는 것을 알아차렸다. 나는 주문 과정의 마지막 단계에서 전체 비용을 확인했어야 했는데, 그러지 않았다.',
      ],
      isSubmitted: false,
    },
  },
});

export type TL02SP05 = {
  [key: string]: {
    answer1?: string;
    audioData?: { [key in number]: IAudioData | null };
    examples?: IExample[];
    correctExamples?: Array<{ text: string; underline?: boolean }>;
    correctAnswer?: string;
    translations?: string[];
    exampleTranslation?: string;
    isSubmitted: boolean;
  };
};

export interface IExample {
  text: string;
  underline?: boolean;
}
