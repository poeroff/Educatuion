import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L03SP05 = atom<{
  [key: string]: {
    answer?: string;
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    exampleAnswerEng?: string;
    exampleAnswerKor?: string;
  };
}>({
  key: 'L03SP05',
  default: {
    p01: {
      answer: '',
      audioData: {},
      isSubmitted: false,
      exampleAnswerEng: 'I wonder how my classmates are preparing to achieve their future goals.',
      exampleAnswerKor: '나는 반 친구들이 그들의 미래 목표를 달성하기 위해 어떻게 준비하고 있는지 궁금하다.',
    },
    p02: {
      answer: '',
      isSubmitted: false,
      exampleAnswerEng:
        'I want to invent a self-cleaning bed. I always make my bed as soon as I wake up, but there are many other morning tasks. If I have a self-cleaning bed, it will be possible for me to save time every morning.',
      exampleAnswerKor:
        '나는 스스로 청소하는 침대를 발명하고 싶다. 나는 항상 일어나자마자 침대를 정리하지만, 아침에 해야 할 다른 일들이 많다. 내게 스스로 청소하는 침대가 있다면, 내가 매일 아침 시간을 절약하는 것이 가능할 것이다. ',
    },
  },
});
