import { atom } from 'recoil';

const wordData: TWordData[] = [
  { id: 1, word: 'plan B', meaning: '대안, 제2안, 차선책', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_planB.mp3` },
  { id: 2, word: 'trip', meaning: '여행', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_trip.mp3` },
  { id: 3, word: 'strawberry', meaning: '딸기', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_strawberry.mp3` },
  { id: 4, word: 'prepare', meaning: '준비하다', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_prepare.mp3` },
  { id: 5, word: 'seafood', meaning: '해산물, 해산물 요리', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_seafood.mp3` },
  { id: 6, word: 'studio', meaning: '스튜디오, 사진관', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_studio.mp3` },
  { id: 7, word: 'perfect', meaning: '완벽한', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_perfect.mp3` },
  { id: 8, word: 'miss', meaning: '놓치다', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_miss.mp3` },
  { id: 9, word: 'thanks to ', meaning: '~ 덕분에', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_thanksto.mp3` },
  { id: 10, word: 'special', meaning: '특별한', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_special.mp3` },
  { id: 11, word: 'instead', meaning: '대신에', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_instead.mp3` },
  { id: 12, word: 'success', meaning: '성공', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_success.mp3` },
  { id: 13, word: 'put on', meaning: '~을 입다', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_puton.mp3` },
  { id: 14, word: 'work out', meaning: '(일이)잘 풀리다,잘 진행되다', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_workout.mp3` },
  { id: 15, word: 'upset', meaning: '속상한', path: `/L04/C06/A02/ME1-L04-C06-A02-voca_upset.mp3` },
];

export const L04C06A02 = atom<TA_L04_C06_A02>({
  key: 'L04C06A02',
  default: {
    p01: wordData.map(data => ({ ...data, isMemorized: false })),
    p02: wordData
      .map(data => ({ ...data, meaningOrder: Math.round(Math.random() * wordData.length), isCorrect: false }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10),
  },
});

type TA_L04_C06_A02 = {
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
