import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L03SP05 = atom<{
  [key: string]: {
    answer?: string;
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    exampleAnswerEng?: string;
    exampleAnswerKor?: string;
    questionKor?: string;
  };
}>({
  key: 'L03SP05',
  default: {
    p01: {
      answer: '',
      audioData: {},
      isSubmitted: false,
      exampleAnswerEng: 'Recently, I watched the movie Coco and it was wonderful! I was especially fascinated by the attractive and unique Mexican culture.',
      questionKor:'여러분이 최근에 본 영화는 무엇이며 그 영화는 어땠나요? 이 단원에서 배운 표현을 활용하세요.',
      exampleAnswerKor: '최근에 나는 <Coco>라는 영화를 봤고 정말 훌륭했다! 나는 특히 매력적이고 독특한 멕시코 문화에 매력을 느꼈다.',
    },
    p02: {
      answer: '',
      isSubmitted: false,
      exampleAnswerEng: 'The biggest challenge in my life happened two years ago, when I moved to a new middle school. At first, I found it difficult to adapt to a new environment and make new friends. However, I could make good friends at the new school because I joined a sports club and met friends with similar interests.',
      questionKor:'여러분의 인생에서 가장 큰 어려움은 무엇이었으며 그것을 어떻게 극복했나요? 이 단원에서 배운 주요 표현을 활용하여, 그것에 관한 짧은 글을 써 보세요.',
      exampleAnswerKor: '내 인생에서 가장 큰 어려움은 2년 전에 있었는데, 그 당시 나는 새로운 중학교로 전학을 갔다. 처음에 나는 새로운 환경에 적응하여 새 친구를 사귀는 것이 어렵다고 생각했다. 하지만 내가 스포츠 동아리에 가입하여 같은 관심사를 가진 친구들을 만났기 때문에 나는 새 학교에서 좋은 친구들을 사귈 수 있었다.',
    },
  },
});
