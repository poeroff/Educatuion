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
            inputData: [{ subKey: 'NUMBER-02', type: 'NUMBER', value: 0, isAnswer: true }],
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
          inputDatas: [[{ subKey: 'NUMBER-02', value: 2 }]],
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
          script: [{ text: 'G: What do you do on weekends?' }, { text: 'B: I read books.' }],
          interpretation: [{ text: 'G: 너는 주말에 무엇을 하니?' }, { text: 'B: 나는 책을 읽어.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'B: What do you do on weekends?' },
            { text: 'G: I ride my bike.' },
          ],
          interpretation: [
            { text: 'B: 너는 주말에 무엇을 하니?' },
            { text: 'G: 나는 자전거를 타.' },
          ],
        },
      ];
    case 3:
      return [
        {
          script: [{text: '주말에 무슨 여가 활동을 하는지 묻는 말: What do you do on weekends?'}, {text: '주말에 무슨 여가 활동을 하는지 묻는 말에 답하는 말: I watch movies.'},],
          interpretation: [{ text: '주말에 무슨 여가 활동을 하는지 묻는 말: 너는 주말에 무엇을 하니?' }, { text: '주말에 무슨 여가 활동을 하는지 묻는 말에 답하는 말: 나는 영화를 봐.' }],
        },
      ];
    default:
      return [];
  }
};
