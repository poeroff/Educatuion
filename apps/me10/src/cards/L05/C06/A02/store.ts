import { atom } from 'recoil';

const wordData: TWordData[] = [
  { id: 1, word: 'waste', meaning: '쓰레기, 낭비', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_waste.mp3` },
  { id: 2, word: 'challenge', meaning: '(SNS에서) 챌린지, 도전, 과제', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_challenge.mp3` },
  { id: 3, word: 'trash', meaning: '쓰레기 ', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_trash.mp3` },
  { id: 4, word: 'straw', meaning: '빨대', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_straw.mp3` },
  { id: 5, word: 'secondhand', meaning: '중고의', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_secondhand.mp3` },
  { id: 6, word: 'item', meaning: '물품, 품목', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_item.mp3` },
  { id: 7, word: 'advice', meaning: '조언, 충고', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_advice.mp3` },
  { id: 8, word: 'go through', meaning: '살펴보다', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_gothrough.mp3` },
  { id: 9, word: 'garbage', meaning: '쓰레기', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_garbage.mp3` },
  { id: 10, word: 'throw away', meaning: '버리다', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_throwaway.mp3` },
  { id: 11, word: 'wasteful', meaning: '낭비하는', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_wasteful.mp3` },
  { id: 12, word: 'list', meaning: '판매 목록에 올리다', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_list.mp3` },
  { id: 13, word: `to one's surprise`, meaning: '놀랍게도', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_toones_surprise.mp3` },
  { id: 14, word: 'used', meaning: '중고의', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_used.mp3` },
  { id: 15, word: 'run out of', meaning: '다 써 버리다', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_runoutof.mp3` },
  { id: 16, word: 'fill ~ with …', meaning: '~을 …로 채우다', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_fillwith.mp3` },
  { id: 17, word: 'cut down on', meaning: '줄이다', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_cutdownon.mp3` },
  { id: 18, word: 'post', meaning: '게시하다', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_post.mp3` },
  { id: 19, word: 'useful', meaning: '유용한', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_useful.mp3` },
  { id: 20, word: 'environment', meaning: '환경', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_environment.mp3` },
  { id: 21, word: 'friendship', meaning: '우정', path: `/L05/C06/A02/ME1-L05-C06-A02-voca_friendship.mp3` },
];

export const L05C06A02 = atom<TA_L05_C06_A02>({
  key: 'L05C06A02',
  default: {
    p01: wordData.map(data => ({ ...data, isMemorized: false })),
    p02: wordData
      .map(data => ({ ...data, meaningOrder: Math.round(Math.random() * wordData.length), isCorrect: false }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 10),
  },
});

type TA_L05_C06_A02 = {
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
