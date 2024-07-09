import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: null, isAnswer: true }],
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
          inputDatas: [[{ subKey: 'NUMBER-01', value: 3 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'NUMBER-01', value: 1 }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'NUMBER-01', value: 2 }]],
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
          answer: 3,
          // script: '',
          // interpretation: '',
        },
      ];
    case 2:
      return [
        {
          answer: 1,
          // script: '',
          // interpretation: '',
        },
      ];
    case 3:
      return [
        {
          answer: 2,
          // script: '',
          // interpretation: '',
        },
      ];
    default:
      return [];
  }
};