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
          inputDatas: [[{ subKey: 'P01', value: 1 }]],
        },
      ];
    case 2:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'P02', value: 3 }]],
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
          script: [{ text: 'G: Let’s play soccer.' }, { text: 'B: Sure.' }],
          interpretation: [{ text: 'G: 같이 축구하자.' }, { text: 'B: 물론이지.'}],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: '(a) Let’s play badminton.' },
            { text: '(b) Let’s play basketball.' },
            { text: '(c) Let’s play baseball..' },
          ],
          interpretation: [
            { text: '(a) 우리 배드민턴 치자.' },
            { text: '(b) 우리 농구하자.' },
            { text: '(c) 우리 야구하자.' },
          ],
        },
      ];
    case 3:
      return [
        {
          script: [{ text: '친구에게 제안하는 말: Let’s play basketball.' }, { text: '친구의 제안에 답하는 말: Sure.' }],
          interpretation: [{ text: '친구에게 제안하는 말 : 우리 농구하자.' }, { text: '친구의 제안에 답하는 말: 물론이지.'}],
        },
      ];
    default:
      return [];
  }
};