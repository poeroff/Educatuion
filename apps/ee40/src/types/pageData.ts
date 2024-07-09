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
  | 'BOOLEAN';

export interface initDataType {
  pageType?: pageType;
  inputData?: userSubmissionType[];
}

export type pagesType = {
  selectedPageId: number;
  pageIdList: number[];
};

export type inputDatasType = {
  subKey: string;
  type: inputDataType;
  value?: unknown;
  isAnswer?: boolean;
  isCorrect?: boolean;
  order?: boolean;
  regExr?: RegExp;
};

export type userSubmissionType = {
  mainKey: number;
  inputData: inputDatasType[];
  isCorrect?: boolean;
};

export interface requestDataSavePageType {
  userUuid: string;
  cardPageId: number;
  userSubmission: userSubmissionType[];
  duration: number;
  isCorrect?: boolean;
}

export type gradeType = {
  mainKey: number;
  isCorrect: boolean;
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
