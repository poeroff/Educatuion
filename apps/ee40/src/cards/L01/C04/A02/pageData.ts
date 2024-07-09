import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'P01', type: 'TEXT', value: null, isAnswer: false }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'P03', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'P04', type: 'NUMBER', value: 0, isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 5,
            inputData: [
              { subKey: '1', type: 'NUMBER', value: null, isAnswer: true },
              { subKey: '2', type: 'NUMBER', value: null, isAnswer: true },
            ],
          },
          {
            mainKey: 6,
            inputData: [
              { subKey: 'RECORDER-1', type: 'RECORDER', value: null, isAnswer: true },
              { subKey: 'RECORDER-2', type: 'RECORDER', value: null, isAnswer: true },
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
          inputDatas: [[{ subKey: 'P01', value: '다리를 다친 친구의 가방을 대신 들어줬어요.' }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'P03', value: 2 }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'P04', value: 1 }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [
            [
              { subKey: '1', value: 2 },
              { subKey: '2', value: 1 },
            ],
          ],
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
          //script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: '다리를 다친 친구의 가방을 대신 들어줬어요.' }],
        },
      ];
    case 5:
      return [
        {
          answer: `오전에 만난 친구 - 허수아비 - Good morning
          오후에 만난친구 - 사자 - Good afternoon
          `,
          script: '',
          interpretation: '',
        },
      ];
    default:
      return [];
  }
};
