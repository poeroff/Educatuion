import { atom } from 'recoil';

export const L04C12A08 = atom<TL04C12A08>({
  key: 'L04C12A08',
  default: {
    p01: {
      data: [
        { title: 'Communicate', contents: '길을 묻고 답할 수 있나요 ?', userAnswer: undefined },
        { title: 'Communicate', contents: '희망이나 기대를 표현할 수 있나요 ?', userAnswer: undefined },
        { title: 'Read', contents: '본문 내용을 세 문장으로 말할 수 있나요 ?', userAnswer: undefined },
        { title: 'Language Use', contents: "'동사 + -ing' 와 미래를 나타내는 will을 사용하여 문장을 만들 수 있나요 ?", userAnswer: undefined },
        { title: 'Think and Write', contents: '자신의 여행 스타일을 소개하는 글을 쓸 수 있나요 ?', userAnswer: undefined },
      ],
      isSubmitted: false,
    },
  },
});

type TL04C12A08 = {
  p01: {
    isSubmitted: boolean;
    data: Array<Tdata>;
  };
};

type Tdata = {
  title: string;
  contents: string;
  userAnswer: string | undefined;
};
