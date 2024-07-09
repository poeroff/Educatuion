import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true }],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 5,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true }],
          },
        ],
      };
    case 6:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 6,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true }],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: 'dress' }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'coat' }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'cap' }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'skirt' }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'shirt' }]],
        },
      ];
    case 6:
      return [
        {
          mainKey: 6,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'scarf' }]],
        },
      ];
    default:
      return [];
  }
};
