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
              { subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
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
              { subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
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
              { subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 4:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 4,
            inputData: [
              { subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'RECORDER-1', type: 'BOOLEAN', value: '', isAnswer: true },
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
          inputDatas: [[{ subKey: 'TEXT-01', value: 'Monday' }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'Friday' }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'Sunday' }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'Tuesday' }]],
        },
      ];
    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    default:
      return [{ answer: '', script: '', interpretation: '' }];
  }
};
