export type inputDataType =
  | 'TEXT'
  | 'TEXTAREA'
  | 'TEXT_REGEXR'
  | 'NUMBER'
  | 'CANVAS'
  | 'LINE'
  | 'TEXT_LIST'
  | 'NUMBER_LIST'
  | 'RECORDER'
  | 'IMAGE'
  | 'BOOLEAN'
  | 'AUDIO';

export interface initDataType {
  pageType?: pageType;
  inputData?: userSubmissionType[];
}

export type pagesType = {
  selectedPageId: number;
  pageIdList: number[];
};

export type inputDatasType<T = any> = {
  subKey: number | string;
  type: inputDataType;
  value?: T;
  isAnswer?: boolean;
  isCorrect?: boolean;
  isListCorrect?: boolean[];
  order?: boolean;
  regExr?: RegExp;
};

export type userSubmissionType<T = unknown> = {
  mainKey: number;
  inputData: inputDatasType<T>[];
  isCorrect?: boolean;
  isListCorrect?: boolean[];
  include?: boolean;
};

export interface requestDataSavePageType {
  userId: number;
  cardPageId: number;
  userSubmission: userSubmissionType[];
  duration?: number;
}

export type gradeType = {
  mainKey: number;
  isCorrect: boolean;
  isListCorrect?: boolean[];
};

export interface correctDataType {
  mainKey?: number;
  inputDatas?: correctInputDataType[][];
}

type correctInputDataType = {
  subKey: string;
  value: unknown;
};

export type pageType = 'SAVE' | 'SUBMIT' | 'GRADE';

export type userAccessLogType = 'IN' | 'OUT';

export interface pageUserSubmission {
  userSubmission: userSubmissionType[];
  page: string;
  isSubmitted?: boolean;
}

export interface pageId {
  page: string;
  pageId: number;
}
