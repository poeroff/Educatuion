import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'P01', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'P02', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    default:
      return {};
  }
};

export const getCorrectData = (pageNumber: number) => {
  switch (pageNumber) {
    case 1:
      return [
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'P01', value: 1 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'P02', value: 3 }]],
        },
      ];
    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 1:
      return [
        {
          script: [{ text: 'B: What day is it today?' }, { text: 'G: It’s Wednesday. I have cooking class.' }],
          interpretation: [{ text: 'B: 오늘 무슨 요일이니?' }, { text: 'G: 수요일이야. 나는 요리 수업이 있어.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'G: What day is it today?' },
            { text: 'B: __________' },
            { text: '(a) It’s Thursday. I have robot class.' },
            { text: '(b) It’s Friday. I have art class.' },
            { text: '(c) It’s Friday. I have dance class.' },
          ],
          interpretation: [
            { text: 'G: 내 공이 어디 있지?' },
            { text: 'B:  __________' },
            { text: '(a) 목요일이야. 나는 로봇 수업이 있어.' },
            { text: '(b) 금요일이야. 나는 미술 수업이 있어.' },
            { text: '(c) 금요일이야. 나는 춤 수업이 있어.' },
          ],
        },
      ];
    default:
      return [];
  }
};
