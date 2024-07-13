import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false }],
          },
        ],
      };
    case 2:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'RECORDER-0', type: 'RECORDER', value: null, isAnswer: false }],
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
          inputDatas: [[{ subKey: 'RECORDER-0', value: true }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'RECORDER-0', value: true }]],
        },
      ];

    default:
      return [];
  }
};
