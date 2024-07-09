import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
          },
          {
            mainKey: 3,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true }],
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
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT-0', value: '소수' }]],
        },
        {
          mainKey: 1,
          inputDatas: [[{ subKey: 'TEXT-0', value: '합성수' }]],
        },
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'TEXT-0', value: '소수' }]],
        },
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'TEXT-0', value: '합성수' }]],
        },
      ];
    default:
      return [];
  }
};
