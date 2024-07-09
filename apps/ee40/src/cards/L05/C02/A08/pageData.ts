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
          script: [{ text: 'B: Let’s play baseball.' }, { text: 'G: Sorry, I can’t. I’m busy.' }],
          interpretation: [{ text: 'B: 같이 야구하자.' }, { text: 'G: 미안해, 나는 할 수 없어. 나는 바빠.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'G: Let’s play badminton.' },
            { text: 'B: __________' },
            { text: '(a) Sure.' },
            { text: '(b) Sorry, I can’t. I’m busy.' },
            { text: '(c) Sorry, I can’t. I’m tired.' },
          ],
          interpretation: [
            { text: 'G: 우리 배드민턴 치자.' },
            { text: 'B: __________' },
            { text: '(a) 물론이지.' },
            { text: '(b) 미안해, 나는 할 수 없어. 나는 바빠.' },
            { text: '(c) 미안해, 나는 할 수 없어. 나는 피곤해' },
          ],
        },
      ];
    case 3:
      return [
        {
          script: [{ text: '운동을 제안하는 말: Let’s play badminton.' }, { text: '제안에 거절하는 말: Sorry, I can’t. I’m sick.' }],
          interpretation: [{ text: '운동을 제안하는 말 : 우리 배드민턴 치자.' }, { text: '제안에 거절하는 말: 미안해, 나는 할 수 없어. 나는 아파.' }],
        },
      ];
    default:
      return [];
  }
};
