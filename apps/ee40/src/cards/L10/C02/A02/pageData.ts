import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 5,
            inputData: [{ subKey: 'TEXT-05', type: 'TEXT', value: '', isAnswer: false }],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '연극 공연을 준비하고 있어요.' }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'NUMBER-01', value: 2 }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'TEXT-05', value: '파란색 치마' }]],
        },
      ];

    default:
      return [];
  }
};
export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 3:
      return [
        {
          answer: '2',
        },
      ];
    default:
      return [];
  }
};
