import { pageId, pageUserSubmission } from '@maidt-cntn/api';
import { atom } from 'recoil';

export const pageAtom = atom({
  key: 'pageStates',
  default: {
    selectedPage: 1,
    pageTotalNums: 1,
  },
});

export const pageDataAtom = atom({
  key: 'pageDataState',
  default: [] as pageUserSubmission[],
});

export const pageIdsAtom = atom({
  key: 'pageIdsAtom',
  default: [] as pageId[],
});
