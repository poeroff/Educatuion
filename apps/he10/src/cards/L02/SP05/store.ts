import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02SP05 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: string;
    exampleAnswerEng?: string;
    exampleAnswerKor?: string;
  };
}>({
  key: 'L02SP05',
  default: {
    p01: {
      isSubmitted: false,
      exampleAnswerEng: 'Make sure not to talk loudly on the phone when you are on the bus or subway. It could disturb other people.',
      exampleAnswerKor: '버스나 지하철에 있을 때 시끄럽게 통화하지 않도록 해라. 다른 사람을 방해할 수 있다.',
      audioData: {},
    },
    p02: {
      answer: '',
      isSubmitted: false,
      exampleAnswerEng:
        'My favorite form of literature is poetry because I’m really interested in finding meanings in poems and discussing them with others. The lessons from a poem can be different among readers, depending on their own experiences. Sometimes, I am amazed at how differently people can interpret the same poem, and that’s why I appreciate poetry.',
      exampleAnswerKor:
        '내가 좋아하는 문학 형식은 시인데, 나는 시에서 의미를 찾아내고 다른 사람들과 그것에 대해 논의하는 것에 매우 관심이 있기 때문이다. 시에서 주는 교훈은 독자들 자신의 경험에 따라 달라질 수 있다. 가끔 나는 사람들이 같은 시를 얼마나 다르게 해석하는지에 놀라는데, 바로 그러한 이유로 나는 시를 감상한다.',
    },
  },
});
