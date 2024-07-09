import { atom } from 'recoil';

export const SL2C01A02 = atom<TA_SL2_C01_A02>({
  key: 'SL2C01A02',
  default: {
    p01: [
      { id: 1, word: 'donkey', meaning: '당나귀', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_donkey.mp3`, isMemorized: false },
      { id: 2, word: 'barber', meaning: '이발사', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_barber.mp3`, isMemorized: false },
      { id: 3, word: 'haircut', meaning: '이발', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_haircut.mp3`, isMemorized: false },
      { id: 4, word: 'prison', meaning: '감옥', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_prison.mp3`, isMemorized: false },
      { id: 5, word: 'palace', meaning: '궁전', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_palace.mp3`, isMemorized: false },
      { id: 6, word: 'sick', meaning: '몸이 아픈, 병든', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_sick.mp3`, isMemorized: false },
      { id: 7, word: 'safe', meaning: '안전한', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_safe.mp3`, isMemorized: false },
      { id: 8, word: 'promise', meaning: '약속하다, 약속', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_promise.mp3`, isMemorized: false },
      { id: 9, word: 'drum', meaning: '북', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_drum.mp3`, isMemorized: false },
      { id: 10, word: 'musician', meaning: '연주자, 음악가', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_musician.mp3`, isMemorized: false },
      { id: 11, word: 'strange', meaning: '이상한', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_strange.mp3`, isMemorized: false },
      { id: 12, word: 'scared', meaning: '겁먹은', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_scared.mp3`, isMemorized: false },
      { id: 13, word: 'fall asleep', meaning: '잠이 들다', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_fallasleep.mp3`, isMemorized: false },
      { id: 14, word: 'save', meaning: '구하다, 절약하다', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_save.mp3`, isMemorized: false },
      { id: 15, word: 'mind', meaning: '신경 쓰다, 꺼리다', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_mind.mp3`, isMemorized: false },
      { id: 16, word: 'laugh', meaning: '웃다', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_laugh.mp3`, isMemorized: false },
      { id: 17, word: 'be proud of', meaning: '~을 자랑스러워 하다', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_beproudof.mp3`, isMemorized: false },
      { id: 18, word: 'finally', meaning: '마침내, 드디어', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_finally.mp3`, isMemorized: false },
      { id: 19, word: 'ever after', meaning: '내내, 영원히', path: `/SL2/C01/A02/ME1-SL2-C01-A02-voca_everafter.mp3`, isMemorized: false },
    ],
    p02: [
      { id: 1, word: 'donkey', meaning: '당나귀', meaningOrder: 5, isCorrect: false },
      { id: 2, word: 'strange', meaning: '이상한', meaningOrder: 10, isCorrect: false },
      { id: 3, word: 'haircut', meaning: '이발', meaningOrder: 4, isCorrect: false },
      { id: 4, word: 'fall asleep', meaning: '잠이 들다', meaningOrder: 7, isCorrect: false },
      { id: 5, word: 'palace', meaning: '궁전', meaningOrder: 8, isCorrect: false },
      { id: 6, word: 'mind', meaning: '신경 쓰다, 꺼리다', meaningOrder: 1, isCorrect: false },
      { id: 7, word: 'safe', meaning: '안전한', meaningOrder: 9, isCorrect: false },
      { id: 8, word: 'finally', meaning: '마침내, 드디어', meaningOrder: 3, isCorrect: false },
      { id: 9, word: 'drum', meaning: '북', meaningOrder: 6, isCorrect: false },
      { id: 10, word: 'ever after', meaning: '내내, 영원히', meaningOrder: 2, isCorrect: false },
    ],
  },
});

type TA_SL2_C01_A02 = {
  p01: TWordMemorizeData[];
  p02: TWordMatchData[];
};

type TWordData = {
  id: number;
  word: string;
  meaning: string;
};

type TWordMemorizeData = TWordData & {
  path: string;
  isMemorized: boolean;
};

type TWordMatchData = TWordData & {
  meaningOrder: number;
  isCorrect: boolean;
};
