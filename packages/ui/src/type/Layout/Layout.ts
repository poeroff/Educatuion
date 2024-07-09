import { LargeIconType } from './LargeIconType';

export type TSubject = 'math' | 'en';
export type TClass = 'hight' | 'middle' | 'elementary';
export type TLayoutBackColorTypes =
  | 'green'
  | 'yellow'
  | 'pink'
  | 'blue'
  | 'purple'
  | 'brown'
  | 'white'
  | 'orange'
  | 'img_pink'
  | 'img_blue'
  | 'img_yellow'
  | 'math_thumb'
  | 'math_intro'
  | 'math_index'
  | 'math_quiz'
  | 'math_wave_blue';
export type THeaderLargeIconTypes = keyof typeof LargeIconType;
export type TFooterColorTypes = 'white' | 'yellow' | 'dark';
export type TAnswerButtonTypes = 'submit' | 'check' | 'next';

export interface IPageAtom {
  selectedPage: number;
  pageTotalNums: number;
}

export type TChapterInfoTypes = {
  chapterNum?: string;
  mainChapter?: string;
  subChapter?: string;
  minorChapter?: string;
  seconds?: number;
  isVisible?: boolean;
};

export type TMainHeaderInfoTypes = {
  headerPattern?: 'text' | 'icon' | 'number';
  headerText?: React.ReactNode;
  headerNumber?: number;
  headerTextColor?: string;
  iconType?: THeaderLargeIconTypes;
  useExtend?: boolean;
};

export enum ELayout {
  DEFAULT = 'default',
  INTRO = 'intro',
  PROJECT_CULTURE = 'Project + Culture',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  QUATERNARY = 'quaternary',
  QUINARY = 'quinary',
  SENARY = 'senary',
  SEPTENARY = 'septenary',
  L01SP01 = 'L01SP01',
  L01SP02 = 'L01SP02',

  L02C01 = 'L02C01',
  L02C02 = 'L02C02',
  L02C03 = 'L02C03',
  L02C04 = 'L02C04',
  L02SP01 = 'L02SP01',
  L02SP02 = 'L02SP02',
  L02SP03 = 'L02SP03',
  L02SP04 = 'L02SP04',
  L02SP05 = 'L02SP05',

  L03C01 = 'L03C01',
  L03C02 = 'L03C02',
  L03C03 = 'L03C03',
  L03C04 = 'L03C04',
  L03SP01 = 'L03SP01',
  L03SP02 = 'L03SP02',
  L03SP03 = 'L03SP03',
  L03SP04 = 'L03SP04',
  L03SP05 = 'L03SP05',

  L04C01 = 'L04C01',
  L04C02 = 'L04C02',
  L04C03 = 'L04C03',
  L04C04 = 'L04C04',
  L04SP01 = 'L04SP01',
  L04SP02 = 'L04SP02',
  L04SP03 = 'L04SP03',
  L04SP04 = 'L04SP04',
  L04SP05 = 'L04SP05',

  L05C01 = 'L05C01',
  L05C02 = 'L05C02',
  L05C03 = 'L05C03',
  L05C04 = 'L05C04',
  L05SP01 = 'L05SP01',
  L05SP02 = 'L05SP02',
  L05SP03 = 'L05SP03',
  L05SP04 = 'L05SP04',
  L05SP05 = 'L05SP05',

  L06C01 = 'L06C01',
  L06C02 = 'L06C02',
  L06C03 = 'L06C03',
  L06C04 = 'L06C04',
  L06SP01 = 'L06SP01',
  L06SP02 = 'L06SP02',
  L06SP03 = 'L06SP03',
  L06SP04 = 'L06SP04',
  L06SP05 = 'L06SP05',

  L07C01 = 'L07C01',
  L07C02 = 'L07C02',
  L07C03 = 'L07C03',
  L07C04 = 'L07C04',
  L07SP01 = 'L07SP01',
  L07SP02 = 'L07SP02',
  L07SP03 = 'L07SP03',
  L07SP04 = 'L07SP04',
  L07SP05 = 'L07SP05',

  L08C01 = 'L08C01',
  L08C02 = 'L08C02',
  L08C03 = 'L08C03',
  L08C04 = 'L08C04',
  L08SP01 = 'L08SP01',
  L08SP02 = 'L08SP02',
  L08SP03 = 'L08SP03',
  L08SP04 = 'L08SP04',
  L08SP05 = 'L08SP05',

  L09C01 = 'L09C01',
  L09C02 = 'L09C02',
  L09C03 = 'L09C03',
  L09C04 = 'L09C04',
  L09SP01 = 'L09SP01',
  L09SP02 = 'L09SP02',
  L09SP03 = 'L09SP03',
  L09SP04 = 'L09SP04',
  L09SP05 = 'L09SP05',

  L10C01 = 'L10C01',
  L10C02 = 'L10C02',
  L10C03 = 'L10C03',
  L10C04 = 'L10C04',
  L10SP01 = 'L10SP01',
  L10SP02 = 'L10SP02',
  L10SP03 = 'L10SP03',
  L10SP04 = 'L10SP04',
  L10SP05 = 'L10SP05',

  L11C01 = 'L11C01',
  L11C02 = 'L11C02',
  L11C03 = 'L11C03',
  L11C04 = 'L11C04',
  L11SP01 = 'L11SP01',
  L11SP02 = 'L11SP02',
  L11SP03 = 'L11SP03',
  L11SP04 = 'L11SP04',
  L11SP05 = 'L11SP05',

  L12C01 = 'L12C01',
  L12C02 = 'L12C02',
  L12C03 = 'L12C03',
  L12C04 = 'L12C04',
  L12SP01 = 'L12SP01',
  L12SP02 = 'L12SP02',
  L12SP03 = 'L12SP03',
  L12SP04 = 'L12SP04',
  L12SP05 = 'L12SP05',

  LK1C01 = 'LK1C01',
  LK1C02 = 'LK1C02',

  LK2C01 = 'LK2C01',
  LK2C02 = 'LK2C02',

  LK3C01 = 'LK3C01',
  LK3C02 = 'LK3C02',

  LK4C01 = 'LK4C01',
  LK4C02 = 'LK4C02',

  SL1C01 = 'SL1C01',
  SL1C02 = 'SL1C02',

  SL2C01 = 'SL2C01',
}

export enum EMathLayout {
  DEFAULT = 'default',
  INTRO = 'intro',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  QUATERNARY = 'quaternary',
  QUINARY = 'quinary',
}

export interface ILayoutDataTypes extends TChapterInfoTypes, TMainHeaderInfoTypes {
  backGroundColor: TLayoutBackColorTypes;
  footerInfo?: TFooterinfoTypes;
}

export type TLayoutDataTypes = {
  [key: string]: ILayoutDataTypes;
};

export type TFooterinfoTypes = {
  footerColorType: TFooterColorTypes;
};

export type TAlertInfoTypes = {
  isShow?: boolean;
  message?: string;
  subMessage?: string;
  description?: string;
  closeLabel?: string;
  onClose?: () => void;
};

export type TLoadingIndicatorInfoTypes = {
  isShow?: boolean;
  message?: string;
};
