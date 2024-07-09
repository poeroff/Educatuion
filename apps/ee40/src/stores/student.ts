import { atom } from 'recoil';

type StudentAtomType = {
  userId: number;
  activeCardId: string;
  pcp: boolean;
  lrsAccessToken: {
    token: string;
    access_id: string;
  };
  sessionId: string;
};

export const studentAtom = atom<StudentAtomType>({
  key: 'studentStates',
  default: {
    userId: 11334,
    activeCardId: '1004_L01-C02-A04',
    pcp: false,
    lrsAccessToken: {
      token: '',
      access_id: '',
    },
    sessionId: '',
  },
});

//11334
