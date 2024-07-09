import { atom } from 'recoil';

export const L03C12A08 = atom<TL03C12A08>({
  key: 'L03C12A08',
  default: {
    p01: {
      data: [
        { title: 'Communicate', contents: '도움을 요청할 수 있나요 ?', userAnswer: undefined },
        { title: 'Communicate', contents: '감정이나 상태를 묻고 답할 수 있나요 ?', userAnswer: undefined },
        { title: 'Read', contents: '본문 내용을 세 문장으로 말할 수 있나요 ?', userAnswer: undefined },
        { title: 'Language Use', contents: '과거를 나타내는 말과 can 을 사용하여 문장을 만들 수 있나요 ?', userAnswer: undefined },
        { title: 'Think and Write', contents: '고마운 사람에게 감사 편지를 쓸 수 있나요 ?', userAnswer: undefined },
      ],
      isSubmitted: false,
    },
  },
});

type TL03C12A08 = {
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
