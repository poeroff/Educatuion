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
              { subKey: 'P0301', type: 'RECORDER', value: null, isAnswer: false },
              { subKey: 'P0302', type: 'RECORDER', value: null, isAnswer: false },
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
          inputDatas: [[{ subKey: 'P01', value: 1 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'P02', value: 1 }]],
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
          script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: 'G: 기분이 어때?' }, { text: 'B: 아주 좋아.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'B: How are you?' },
            { text: 'G: __________' },
            { text: '(a) Not so good.' },
            { text: '(b) I’m good.' },
            { text: '(c) I’m great.' },
          ],
          interpretation: [
            { text: 'B: 기분이 어때?' },
            { text: 'G:  __________' },
            { text: '(a) 좋지 않아.' },
            { text: '(b) 좋아.' },
            { text: '(c) 아주좋아.' },
          ],
        },
      ];
    case 3:
      return [
        {
          script: [{ text: '안부를 묻는 말: How are you?' }, { text: 'I`m good.' }],
          interpretation: [{ text: '안부를 묻는 말: 기분이 어때?' }, { text: '안부를 묻는 말에 답하는 말: 좋아.' }],
        },
      ];
    default:
      return [];
  }
};
