import { atom } from 'recoil';
import { gradeType, pageType, userSubmissionType } from '@maidt-cntn/api';

export const currentPageInputData = atom<userSubmissionType[]>({
  key: 'currentPageInputData',
  default: [],
});

export const currentPageTypeData = atom<pageType>({
  key: 'currentPageType',
  default: 'SUBMIT',
});

export const currentPageGradeData = atom<gradeType[]>({
  key: 'currentPageGradeType',
  default: [],
});

export const currentPageSubmittedData = atom<boolean>({
  key: 'currentPageSubmittedData',
  default: false,
});
