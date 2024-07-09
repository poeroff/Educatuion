import { atom } from 'recoil';

export const L07C12A08 = atom<TL07C12A08>({
  key: 'L07C12A08',
  default: {
    p01: {
      data: [
        { title: 'Communicate', contents: '알고 있는지 물을 수 있나요 ?', userAnswer: undefined },
        { title: 'Communicate', contents: '궁금한 것을 물을 수 있나요 ?', userAnswer: undefined },
        { title: 'Read', contents: '본문 내용을 네 문장으로 말할 수 있나요 ?', userAnswer: undefined },
        { title: 'Language Use', contents: '비교하는 데 필요한 표현을 사용하여 문장을 만들 수 있나요 ?', userAnswer: undefined },
        { title: 'Think and Write', contents: '그래프를 설명하는 글을 쓸 수 있나요 ?', userAnswer: undefined },
      ],
      isSubmitted: false,
    },
  },
});

type TL07C12A08 = {
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
