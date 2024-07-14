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
            inputData: [{ subKey: 'P01', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'P01', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'P01', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 5,
            inputData: [{ subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true }],
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
          inputDatas: [[{ subKey: 'P01', value: 2 }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'P01', value: 1 }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'P01', value: 2 }]],
        },
      ];

    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'RECORDER-1', value: '(예시 답안) This is my brother.' }]],
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
          script: [{ text: '' }],
        },
      ];
    case 2:
      return [
        {
          script: [{ text: '' }],
        },
      ];
    case 3:
      return [
        {
          script: [{ text: '' }],
        },
      ];
    case 4:
      return [
        {
          script: [{ text: '' }],
        },
      ];

    default:
      return [];
  }
};
