import { atom } from 'recoil';

const wordData: TWordData[] = [
  { id: 1, word: 'presentation', meaning: '발표', path: `/L06/C06/A02/ME1-L06-C06-A02-voca_presentation.mp3` },
  { id: 2, word: 'astronaut', meaning: '우주 비행사', path: `/L06/C06/A02/ME1-L06-C06-A02-voca_astronaut.mp3` },
  { id: 3, word: 'superhero', meaning: '슈퍼 히어로', path: `/L06/C06/A02/ME1-L06-C06-A02-voca_superhero.mp3` },
  { id: 4, word: 'stress out', meaning: '스트레스가 쌓이다', path: `/L06/C06/A02/ME1-L06-C06-A02-voca_stressout.mp3` },
  { id: 5, word: 'mean', meaning: '의미하다', path: `/L06/C06/A02/ME1-L06-C06-A02-voca_mean.mp3` },
  { id: 6, word: 'grown-up', meaning: '어른', path: `/L06/C06/A02/ME1-L06-C06-A02-voca_grown-up.mp3` },
  { id: 7, word: 'take care of', meaning: '돌보다', path: `/L06/C06/A02/ME1-L06-C06-A02-voca_takecareof.mp3` },
  { id: 8, word: 'go on', meaning: '계속하다', path: `/L06/C06/A02/ME1-L06-C06-A02-voca_goon.mp3` },
  { id: 9, word: 'be afraid of', meaning: '~을 두려워하다', path: `/L06/C06/A02/ME1-L06-C06-A02-voca_beafraidof.mp3` },
];

export const L06C06A02 = atom<TA_L06_C06_A02>({
  key: 'L06C06A02',
  default: {
    p01: wordData.map(data => ({ ...data, isMemorized: false })),
    p02: wordData
      .map(data => ({ ...data, meaningOrder: Math.round(Math.random() * wordData.length), isCorrect: false }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 8),
  },
});

type TA_L06_C06_A02 = {
  p01: TWordMemorizeData[];
  p02: TWordMatchData[];
};

type TWordData = {
  id: number;
  word: string;
  meaning: string;
  path: string;
};

type TWordMemorizeData = TWordData & {
  isMemorized: boolean;
};

type TWordMatchData = TWordData & {
  meaningOrder: number;
  isCorrect: boolean;
};
