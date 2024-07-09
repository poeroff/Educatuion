import { atom } from 'recoil';

export const L05C12A08 = atom<TL05C12A08>({
  key: 'L05C12A08',
  default: {
    p01: {
      data: [
        { title: 'Communicate', contents: '계획을 묻고 답할 수 있나요 ?', userAnswer: undefined },
        { title: 'Communicate', contents: '제안하고 답할 수 있나요 ?', userAnswer: undefined },
        { title: 'Read', contents: '본문의 내용을 여섯 문장으로 말할 수 있나요 ?', userAnswer: undefined },
        { title: 'Language Use', contents: 'give, buy 등의 동사와 should 를 사용해서 문장을 만들 수 있나요 ?', userAnswer: undefined },
        { title: 'Think and Write', contents: '학급 쓰레기 줄이기 규칙을 정하고 쓸 수 있나요 ?', userAnswer: undefined },
      ],
      isSubmitted: false,
    },
  },
});

type TL05C12A08 = {
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
