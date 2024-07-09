import { atom } from 'recoil';

export const L03C05A04 = atom<TL03C05A04>({
  key: 'L03C05A04',
  default: {
    p01: [
      { id: 1, word: 'spotlight', meaning: '스포트라이트, 환한 조명', isMemorized: false },
      { id: 2, word: 'docent', meaning: '(박물관 등의) 안내원', isMemorized: false },
      { id: 3, word: 'exhibit', meaning: '전시회', isMemorized: false },
      { id: 4, word: 'unique', meaning: '독특한', isMemorized: false },
      { id: 5, word: 'slavery', meaning: '노예', isMemorized: false },
      { id: 6, word: 'discrimination', meaning: '차별', isMemorized: false },
      { id: 7, word: 'mean', meaning: '못된, 심술궂은', isMemorized: false },
      { id: 8, word: 'in contrast', meaning: '그에 반해서', isMemorized: false },
      { id: 9, word: 'portray', meaning: '묘사하다', isMemorized: false },
      { id: 10, word: 'capture', meaning: '포착하다', isMemorized: false },
      { id: 11, word: 'freedom', meaning: '자유', isMemorized: false },
      { id: 12, word: 'renowned', meaning: '유명한', isMemorized: false },
      { id: 13, word: 'distorted', meaning: '기형의', isMemorized: false },
      { id: 14, word: 'mobility', meaning: '기동성', isMemorized: false },
      { id: 15, word: 'depict', meaning: '그리다, 묘사하다', isMemorized: false },
      { id: 16, word: 'landscape', meaning: '풍경', isMemorized: false },
      { id: 17, word: 'innovative', meaning: '획기적인', isMemorized: false },
      { id: 18, word: 'confine', meaning: '국한시키다, 얽매이다', isMemorized: false },
      { id: 19, word: 'iconic', meaning: '상징적인, …의 상징이 되는', isMemorized: false },
      { id: 20, word: 'persist', meaning: '끈질기게 계속하다', isMemorized: false },
      { id: 21, word: 'solely', meaning: '오로지', isMemorized: false },
      { id: 22, word: 'era', meaning: '시대', isMemorized: false },
      { id: 23, word: 'showcase', meaning: '소개하다', isMemorized: false },
      { id: 24, word: 'stunningly', meaning: '굉장히 아름다운', isMemorized: false },
      { id: 25, word: 'conventional', meaning: '관습적인, 전통적인', isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'capture', meaning: '포착하다', meaningOrder: 6, isCorrect: false },
      { id: 2, word: 'mean', meaning: '못된, 심술궂은', meaningOrder: 3, isCorrect: false },
      { id: 3, word: 'unique', meaning: '독특한', meaningOrder: 5, isCorrect: false },
      { id: 4, word: 'in contrast', meaning: '그에 반해서', meaningOrder: 2, isCorrect: false },
      { id: 5, word: 'exhibit', meaning: '전시회', meaningOrder: 4, isCorrect: false },
      { id: 6, word: 'discrimination', meaning: '차별', meaningOrder: 9, isCorrect: false },
      { id: 7, word: 'portray', meaning: '묘사하다', meaningOrder: 1, isCorrect: false },
      { id: 8, word: 'docent', meaning: '(박물관 등의) 안내원', meaningOrder: 10, isCorrect: false },
      { id: 9, word: 'slavery', meaning: '노예', meaningOrder: 8, isCorrect: false },
      { id: 10, word: 'spotlight', meaning: '스포트라이트, 환한 조명', meaningOrder: 7, isCorrect: false },
    ],
    p03: [
      { id: 1, word: 'renowned', meaning: '유명한', meaningOrder: 5, isCorrect: false },
      { id: 2, word: 'depict', meaning: '그리다', meaningOrder: 9, isCorrect: false },
      { id: 3, word: 'iconic', meaning: '…의 상징이 되는', meaningOrder: 8, isCorrect: false },
      { id: 4, word: 'confine', meaning: '국한시키다', meaningOrder: 6, isCorrect: false },
      { id: 5, word: 'persist', meaning: '끈질기게 계속하다', meaningOrder: 10, isCorrect: false },
      { id: 6, word: 'innovative', meaning: '획기적인', meaningOrder: 7, isCorrect: false },
      { id: 7, word: 'mobility', meaning: '기동성', meaningOrder: 1, isCorrect: false },
      { id: 8, word: 'freedom', meaning: '자유', meaningOrder: 2, isCorrect: false },
      { id: 9, word: 'distorted', meaning: '기형의', meaningOrder: 3, isCorrect: false },
      { id: 10, word: 'landscape', meaning: '풍경', meaningOrder: 4, isCorrect: false },
    ],
    p04: [
      { id: 1, word: 'era', meaning: '시대', meaningOrder: 5, isCorrect: false },
      { id: 2, word: 'showcase', meaning: '소개하다', meaningOrder: 1, isCorrect: false },
      { id: 3, word: 'conventional', meaning: '관습적인', meaningOrder: 4, isCorrect: false },
      { id: 4, word: 'solely', meaning: '오로지', meaningOrder: 3, isCorrect: false },
      { id: 5, word: 'stunningly', meaning: '아름다운', meaningOrder: 2, isCorrect: false },
      { id: 6, word: 'capture', meaning: '포착하다', meaningOrder: 10, isCorrect: false },
      { id: 7, word: 'mobility', meaning: '기동성', meaningOrder: 6, isCorrect: false },
      { id: 8, word: 'landscape', meaning: '풍경', meaningOrder: 7, isCorrect: false },
      { id: 9, word: 'innovative', meaning: '획기적인', meaningOrder: 9, isCorrect: false },
      { id: 10, word: 'freedom', meaning: '자유', meaningOrder: 8, isCorrect: false },
    ],
  },
});

type TL03C05A04 = {
  p01: TWordMemorizeData[];
  p02: TWordMatchData[];
  p03: TWordMatchData[];
  p04: TWordMatchData[];
};

type TWordData = {
  id: number;
  word: string;
  meaning: string;
};

type TWordMemorizeData = TWordData & {
  isMemorized: boolean;
};

type TWordMatchData = TWordData & {
  meaningOrder: number;
  isCorrect: boolean;
};
