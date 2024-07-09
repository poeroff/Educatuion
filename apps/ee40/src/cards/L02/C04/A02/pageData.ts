import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
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
            mainKey: 0,
            inputData: [{ subKey: 'NUMBER-02', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'P03', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'P04', type: 'NUMBER', value: 0, isAnswer: true }],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '다리를 다친 친구의 가방을 대신 들어줬어요.' }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'NUMBER-02', value: 1 }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'P03', value: 1 }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'P04', value: 2 }]],
        },
      ];
    default:
      return [];
  }
};
export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    default:
      return [];
  }
};
