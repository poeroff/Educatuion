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
          script: [{ text: 'G: What do you do on weekends?' }, { text: 'B: I play soccer. How about you?' }, { text: 'G: I walk my dog.' }],
          interpretation: [
            { text: 'G: 너는 주말에 무엇을 하니?' },
            { text: 'B: 나는 축구를 해. 너는 어때?' },
            { text: 'G: 나는 강아지를 산책시켜.' },
          ],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'G: What do you do on weekends?' },
            { text: 'B: I ride my bike. How about you?' },
            { text: 'G: __________' },
            { text: '(a) I read books.' },
            { text: '(b) I watch movies.' },
            { text: '(c) I play the piano.' },
          ],
          interpretation: [
            { text: 'G: 너는 주말에 무엇을 하니?' },
            { text: 'B: 나는 자전거를 타. 너는 어때?' },
            { text: 'G:  __________' },
            { text: '(a) 나는 책을 읽어.' },
            { text: '(b) 나는 영화를 봐.' },
            { text: '(c) 나는 피아노를 쳐.' },
          ],
        },
      ];
    default:
      return [];
  }
};
