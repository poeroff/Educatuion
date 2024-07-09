import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 0,
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
            mainKey: 1,
            inputData: [{ subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'RECORDER-03', type: 'RECORDER', value: null, isAnswer: false }],
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
            {
              mainKey: 3,
              inputData: [{ subKey: 'RECORDER-03', type: 'RECORDER', value: null, isAnswer: false }],
            },
          ],
        };
      case 5:
        return {
          pageType: 'SUBMIT',
          inputData: [
            {
              mainKey: 0,
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
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT-01', value: '친구에게 아빠를 소개하고 있어요.' }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT-05', value: '병원에서 아이가 자신의 이름을 말하고 있어요.' }]],
        },
      ];
    default:
      return [];
  }
};
