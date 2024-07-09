import { pagesType } from '@maidt-cntn/api';
import { atom } from 'recoil';

export const pageDataAtom = atom<pagesType>({
  key: 'pageDataStates',
  default: {
    selectedPageId: 0,
    pageIdList: [],
  },
});

export const pageMetaAtom = atom<pageMetaAtomType>({
  key: 'pageMetaStates',
  default: {
    contentId: '',
    duration: '',
    appropriateTime: '',
    difficulty: -1,
    curriculumId: '',
    activeType: '',
    currentSeq: 0,
    unitId: '',
  },
});

export type pageMetaAtomType = {
  contentId: string;
  duration: string;
  appropriateTime: string;
  difficulty: number;
  curriculumId: string;
  activeType: string;
  currentSeq: number;
  unitId: string;
};
