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
    userId: 1234,
    activeCardId: '1007_A010099-02',
    pcp: false,
    lrsAccessToken: {
      token: '',
      access_id: '',
    },
    sessionId: '',
  },
});
