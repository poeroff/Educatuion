import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 2:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 2,
            inputData: [
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
            ],
          },
        ],
      };
    case 3:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 3,
            inputData: [
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: true },
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
            ],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: 'teacher' }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'grandma' }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'friend' }]],
        },
      ];

    default:
      return [];
  }
};
