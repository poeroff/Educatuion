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
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false }],
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
    case 7:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false }],
          },
        ],
      };
    case 8:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false }],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '피자 가게에서 피자를 먹을지 이야기를 하고 있어요' }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'TEXT-05', value: '가방을 보여 주며 무슨 수업을 가는지 이야기를 하고 있어요.' }]],
        },
      ];
    default:
      return [];
  }
};
