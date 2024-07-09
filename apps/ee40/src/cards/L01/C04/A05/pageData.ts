import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-1', type: 'TEXT', value: null, isAnswer: true }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'TEXT-1', type: 'TEXT', value: null, isAnswer: true }],
          },
          {
            mainKey: 3,
            inputData: [{ subKey: 'TEXT-1', type: 'TEXT', value: null, isAnswer: true }],
          },
          {
            mainKey: 4,
            inputData: [{ subKey: 'LINE-1', type: 'LINE', value: null, isAnswer: true }],
          },
          {
            mainKey: 5,
            inputData: [{ subKey: 'LINE-1', type: 'LINE', value: null, isAnswer: true }],
          },
          {
            mainKey: 6,
            inputData: [{ subKey: 'LINE-1', type: 'LINE', value: null, isAnswer: true }],
          },
          {
            mainKey: 7,
            inputData: [{ subKey: 'OFFSET', type: 'LINE', value: null, isAnswer: false }],
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
          inputDatas: [[{ subKey: 'TEXT-1', value: 'a' }]],
        },
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'TEXT-1', value: 'a' }]],
        },
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'TEXT-1', value: 'a' }]],
        },
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'LINE-1', value: ['left-1', 'right-2'] }]],
        },
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'LINE-1', value: ['left-2', 'right-1'] }]],
        },
        {
          mainKey: 6,
          inputDatas: [[{ subKey: 'LINE-1', value: ['left-3', 'right-3'] }]],
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
          //script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: '1. 낱말: a, 선긋기: 2번' }, { text: '2. 낱말: a, 선긋기: 1번' }, { text: '3. 낱말: a, 선긋기: 3번' }],
        },
      ];
    default:
      return [];
  }
};
