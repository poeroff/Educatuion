import { atom } from 'recoil';

export const L02C05A04 = atom<TL02C05A04>({
  key: 'L02C05A04',
  default: {
    p01: [
      { id: 1, word: 'gather', meaning: '모이다, 모으다', isMemorized: false },
      { id: 2, word: 'faintly', meaning: '희미한, 아주 적은', isMemorized: false },
      { id: 3, word: 'sigh', meaning: '한숨을 쉬다', isMemorized: false },
      { id: 4, word: 'genealogy', meaning: '계보학, 족보학, 가계도', isMemorized: false },
      { id: 5, word: 'run through', meaning: '예행연습', isMemorized: false },
      { id: 6, word: 'destroy', meaning: '파괴하다, 말살하다', isMemorized: false },
      { id: 7, word: 'in despair', meaning: '절망하여', isMemorized: false },
      { id: 8, word: 'ash', meaning: '재', isMemorized: false },
      { id: 9, word: 'shaky', meaning: '떨리는, 불안한', isMemorized: false },
      { id: 10, word: 'chant', meaning: '구호, 성가', isMemorized: false },
      { id: 11, word: 'burst', meaning: '터지다, 한바탕 ~을 함', isMemorized: false },
      { id: 12, word: 'thin', meaning: '얇은, 마른', isMemorized: false },
      { id: 13, word: 'painful', meaning: '아픈', isMemorized: false },
      { id: 14, word: 'cannot help but', meaning: '~하지 않을 수 없다', isMemorized: false },
      { id: 15, word: 'set off', meaning: '출발하다', isMemorized: false },
      { id: 16, word: 'lift up', meaning: '~을 고양시키다', isMemorized: false },
      { id: 17, word: 'stare at', meaning: '~을 응시하다', isMemorized: false },
      { id: 18, word: 'recall', meaning: '기억해 내다', isMemorized: false },
      { id: 19, word: 'whisper', meaning: '속삭이다', isMemorized: false },
      { id: 20, word: 'press', meaning: '언론, 누르다', isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'gather', meaning: '모이다, 모으다', meaningOrder: 6, isCorrect: false },
      { id: 2, word: 'run through', meaning: '예행연습', meaningOrder: 3, isCorrect: false },
      { id: 3, word: 'in despair', meaning: '절망하여', meaningOrder: 5, isCorrect: false },
      { id: 4, word: 'faintly', meaning: '희미한, 아주 적은', meaningOrder: 1, isCorrect: false },
      { id: 5, word: 'genealogy', meaning: '계보학, 족보학, 가계도', meaningOrder: 7, isCorrect: false },
      { id: 6, word: 'ash', meaning: '재', meaningOrder: 8, isCorrect: false },
      { id: 7, word: 'shaky', meaning: '떨리는, 불안한', meaningOrder: 10, isCorrect: false },
      { id: 8, word: 'sigh', meaning: '한숨을 쉬다', meaningOrder: 2, isCorrect: false },
      { id: 9, word: 'destroy', meaning: '파괴하다, 말살하다', meaningOrder: 4, isCorrect: false },
      { id: 10, word: 'chant', meaning: '구호, 성가', meaningOrder: 9, isCorrect: false },
    ],
    p03: [
      { id: 1, word: 'cannot help but', meaning: '~하지 않을 수 없다', meaningOrder: 4, isCorrect: false },
      { id: 2, word: 'set off', meaning: '출발하다', meaningOrder: 9, isCorrect: false },
      { id: 3, word: 'lift up', meaning: '~을 고양시키다', meaningOrder: 8, isCorrect: false },
      { id: 4, word: 'burst', meaning: '터지다, 한바탕 ~을 함', meaningOrder: 10, isCorrect: false },
      { id: 5, word: 'whisper', meaning: '속삭이다', meaningOrder: 5, isCorrect: false },
      { id: 6, word: 'stare at', meaning: '~을 응시하다', meaningOrder: 7, isCorrect: false },
      { id: 7, word: 'thin', meaning: '얇은, 마른', meaningOrder: 3, isCorrect: false },
      { id: 8, word: 'press', meaning: '언론, 누르다', meaningOrder: 6, isCorrect: false },
      { id: 9, word: 'recall', meaning: '기억해 내다', meaningOrder: 1, isCorrect: false },
      { id: 10, word: 'painful', meaning: '아픈', meaningOrder: 2, isCorrect: false },
    ],
    p04: [
      { id: 1, word: 'burst', meaning: '터지다, 한바탕 ~을 함', meaningOrder: 7, isCorrect: false },
      { id: 2, word: 'run through', meaning: '예행연습', meaningOrder: 9, isCorrect: false },
      { id: 3, word: 'gather', meaning: '모이다, 모으다', meaningOrder: 8, isCorrect: false },
      { id: 4, word: 'set off', meaning: '출발하다', meaningOrder: 10, isCorrect: false },
      { id: 5, word: 'stare at', meaning: '~을 응시하다', meaningOrder: 4, isCorrect: false },
      { id: 6, word: 'shaky', meaning: '떨리는, 불안한', meaningOrder: 5, isCorrect: false },
      { id: 7, word: 'whisper', meaning: '속삭이다', meaningOrder: 3, isCorrect: false },
      { id: 8, word: 'sigh', meaning: '한숨을 쉬다', meaningOrder: 1, isCorrect: false },
      { id: 9, word: 'in despair', meaning: '절망하여', meaningOrder: 2, isCorrect: false },
      { id: 10, word: 'painful', meaning: '아픈', meaningOrder: 6, isCorrect: false },
    ],
  },
});

type TL02C05A04 = {
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
