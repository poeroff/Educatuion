import { atom } from 'recoil';

export const L02C12A08 = atom<TL02C12A08>({
  key: 'L02C12A08',
  default: {
    p01: {
      data: [
        { title: 'Communicate', contents: '날씨를 묻고 답할 수 있나요 ?', userAnswer: undefined },
        { title: 'Communicate', contents: '현재 하고 있는 행동을 묘사할 수 있나요 ?', userAnswer: undefined },
        { title: 'Read', contents: '본문 내용을 다섯 문장으로 말할 수 있나요 ?', userAnswer: undefined },
        { title: 'Language Use', contents: '‘be 동사 +-ing’ 와 There is/are 를 사용하여 문장을 만들 수 있나요 ?', userAnswer: undefined },
        { title: 'Think and Write', contents: 'Think and Write 그림을 보고 묘사하는 글을 쓸 수 있나요 ?', userAnswer: undefined },
      ],
      isSubmitted: false,
    },
  },
});

type TL02C12A08 = {
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
