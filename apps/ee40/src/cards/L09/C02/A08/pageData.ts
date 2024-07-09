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
            inputData: [{ subKey: 'P02', type: 'NUMBER', value: 0, isAnswer: true }],
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
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'RECORDER-02', type: 'RECORDER', value: null, isAnswer: false },
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
          inputDatas: [[{ subKey: 'P01', value: 2 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'P02', value: 2 }]],
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
          script: [{ text: 'G: Where is my book?' }, { text: 'B: It’s under the desk.' }],
          interpretation: [{ text: 'G: 내 책이 어디 있지?' }, { text: 'B: 책상 아래에 있어.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'B: Where is my ball?' },
            { text: 'G: __________' },
            { text: '(a) It’s on the chair.' },
            { text: '(b) I don’t know.' },
            { text: '(c) It’s under the desk.' },
          ],
          interpretation: [
            { text: 'B: 내 공이 어디 있지?' },
            { text: 'G:  __________' },
            { text: '(a) 의자 아래에 있어.' },
            { text: '(b) 모르겠어.' },
            { text: '(c) 책상 아래에 있어.' },
          ],
        },
      ];
    case 3:
      return [
        {
          answer: [{ text: '물건의 위치를 묻는 말: Where is my watch?' }, { text: '모른다고 답하는 말: I don’t know.' }],
          interpretation: [{ text: '물건의 위치를 묻는 말: 손목시계가 어디 있지?' }, { text:'모른다고 답하는 말: 잘 모르겠어.'}],
        },
      ];
    default:
      return [];
  }
};