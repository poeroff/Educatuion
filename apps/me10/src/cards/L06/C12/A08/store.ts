import { atom } from 'recoil';

export const L06C12A08 = atom<TL06C12A08>({
  key: 'L06C12A08',
  default: {
    p01: {
      data: [
        { title: 'Communicate', contents: '바람이나 소원을 묻고 답할 수 있나요 ?', userAnswer: undefined },
        { title: 'Communicate', contents: '관심사를 묻고 답할 수 있나요 ?', userAnswer: undefined },
        { title: 'Read', contents: '본문 내용을 다섯 문장으로 말할 수 있나요 ?', userAnswer: undefined },
        { title: 'Language Use', contents: '‘want to+ 동사’와 when 을 사용하여 문장을 만들 수 있나요 ?', userAnswer: undefined },
        { title: 'Think and Write', contents: '미래의 자신을 소개하는 글을 쓸 수 있나요 ?', userAnswer: undefined },
      ],
      isSubmitted: false,
    },
  },
});

type TL06C12A08 = {
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
