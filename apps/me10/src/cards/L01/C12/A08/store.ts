import { atom } from 'recoil';

export const L01C12A08 = atom<TL01C12A08>({
  key: 'L01C12A08',
  default: {
    p01: {
      data: [
        { title: 'Communicate', contents: '자기소개를 할 수 있나요?', userAnswer: undefined },
        { title: 'Communicate', contents: '좋아하는 것을 묻고 답할 수 있나요?', userAnswer: undefined },
        { title: 'Read', contents: '본문 내용을 세 문장으로 말할 수 있나요?', userAnswer: undefined },
        { title: 'Language Use', contents: 'am, are, is, have, like 등을 사용하여 문장을 만들 수 있나요?', userAnswer: undefined },
        { title: 'Think and Write', contents: '학교생활을 소개하는 글을 쓸 수 있나요?', userAnswer: undefined },
      ],
      isSubmitted: false,
    },
  },
});

type TL01C12A08 = {
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
