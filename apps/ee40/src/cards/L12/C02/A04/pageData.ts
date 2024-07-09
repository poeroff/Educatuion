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
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true }],
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
          {
            mainKey: 3,
            inputData: [{ subKey: 'RECORDER-03', type: 'RECORDER', value: null, isAnswer: false }],
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
          {
            mainKey: 3,
            inputData: [{ subKey: 'RECORDER-03', type: 'RECORDER', value: null, isAnswer: false }],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '(예시 답안) 친구들이 계단에서 즐거운 대화를 하고 있어요.' }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'TEXT-01', value: '(예시 답안) 여자아이가 강아지를 산책시킨다고 남자아이에게 말하고 있어요.' }]],
        },
      ];
    default:
      return [];
  }
};
