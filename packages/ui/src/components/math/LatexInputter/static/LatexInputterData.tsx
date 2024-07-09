import { LowerEngDataList, UpperEngDataList } from './EngData';
import { LatexDataList } from './LatexData';
import { NumberDataList } from './NumberData';

export interface LatexInputterButtonType {
  [key: string]: {
    icon: React.ReactNode | string;
    latex: string;
    mathquill?: string;
    mathml?: string;
    children?: { component: React.ReactNode };
  };
}

export const checkValidKey = (key: string) => {
  return !!LatexDataList[key] || !!NumberDataList[key] || !!LowerEngDataList[key] || !!UpperEngDataList[key];
};

export type InputterType = 'latex' | 'number' | 'eng_대문자' | 'eng_소문자';

const elementLatex: string[] = ['더하기', '빼기', '곱하기', '나누기', '등호', '분수', '각도', '작다', '크다', '소수점'];

const middleLatex: string[] = [
  '더하기',
  '빼기',
  '곱하기',
  '나누기',
  '플러스마이너스',
  '등호',
  '부등호, 같지않다',
  '작다',
  '크다',
  '같거나 작다',
  '같거나 크다',
  '분수',
  '각도',
  '위첨자',
  '루트, 제곱근',
  '절댓값',
  '괄호',
  '중괄호',
  '순환 소수',
  '합동',
  '닮음',
  '중간점 기호',
  '평행, 비례',
  '직교',
  '반직선, 벡터',
  '직선',
  '선분',
  '호',
  '각',
  '사각형',
  '삼각형',
  '사인',
  '코사인',
  '탄젠트',
  '소수점',
  '파이',
];

const highLatex: string[] = [
  '더하기',
  '빼기',
  '곱하기',
  '나누기',
  '플러스마이너스',
  '마이너스플러스',
  '등호',
  '부등호, 같지않다',
  '작다',
  '크다',
  '같거나 작다',
  '같거나 크다',
  '분수',
  '각도',
  '위첨자',
  '아래첨자',
  '루트, 제곱근',
  '절댓값',
  '괄호',
  '중괄호',
  '프라임',
  '경우',
  '행렬',
  '복소수 단위',
  '순환 소수',
  '합동',
  '닮음',
  '사인',
  '코사인',
  '탄젠트',
  '평행, 비례',
  '직교',
  '반직선, 벡터',
  '직선',
  '선분',
  '호',
  '각',
  '사각형',
  '삼각형',
  '소수점',
  '파이',
  '세타',
  '알파',
  '베타',
  '감마',
  '허근, 오메가',
  '켤레근',
];

const highLatex_eng: string[] = [
  '팩토리얼',
  '공집합',
  '교집합',
  '합집합',
  '진부분집합',
  '진부분집합이 아니다',
  '원소가 속한다',
  '원소가 속하지 아니한다',
  '수직 막대',
  '중간점 기호',
  '필요 조건',
  '충분 조건',
  '필요 충분 조건',
  '합성 함수',
  '순열',
  '조합',
  '거듭 제곱근',
  '내분',
  '부정',
];

export const getButtonList = (school: 'em' | 'hm' | 'mm') => {
  if (school === 'hm')
    return {
      latex: latexDataMap[school],
      number: letterDataMap.number,
      eng_소문자: { latex: letterDataMap.eng_소문자.label, data: [...highLatex_eng, ...letterDataMap.eng_소문자.data] },
      eng_대문자: { latex: letterDataMap.eng_소문자.label, data: [...highLatex_eng, ...letterDataMap.eng_대문자.data] },
    };
  return { latex: latexDataMap[school], ...letterDataMap };
};

const latexDataMap = {
  em: { label: '수식', data: elementLatex },
  mm: { label: '수식', data: middleLatex },
  hm: { label: '수식', data: highLatex },
};

const letterDataMap = {
  number: {
    label: '숫자',
    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  },
  eng_소문자: {
    label: '영어 소문자',
    data: [
      '소문자 a',
      '소문자 b',
      '소문자 c',
      '소문자 d',
      '소문자 e',
      '소문자 f',
      '소문자 g',
      '소문자 h',
      '소문자 i',
      '소문자 j',
      '소문자 k',
      '소문자 l',
      '소문자 m',
      '소문자 n',
      '소문자 o',
      '소문자 p',
      '소문자 q',
      '소문자 r',
      '소문자 s',
      '소문자 t',
      '소문자 u',
      '소문자 v',
      '소문자 w',
      '소문자 x',
      '소문자 y',
      '소문자 z',
    ],
  },
  eng_대문자: {
    label: '영어 대문자',
    data: [
      '대문자 A',
      '대문자 B',
      '대문자 C',
      '대문자 D',
      '대문자 E',
      '대문자 F',
      '대문자 G',
      '대문자 H',
      '대문자 I',
      '대문자 J',
      '대문자 K',
      '대문자 L',
      '대문자 M',
      '대문자 N',
      '대문자 O',
      '대문자 P',
      '대문자 Q',
      '대문자 R',
      '대문자 S',
      '대문자 T',
      '대문자 U',
      '대문자 V',
      '대문자 W',
      '대문자 X',
      '대문자 Y',
      '대문자 Z',
    ],
  },
};

export const ButtonDataList = {
  ...LatexDataList,
  ...LowerEngDataList,
  ...UpperEngDataList,
  ...NumberDataList,
};
