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
              { subKey: 'TEXT-01', type: 'TEXT', value: null, isAnswer: false },
              { subKey: 'RECORDER-01', type: 'RECORDER', value: null, isAnswer: false },
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
    // case 3:
    //   return [
    //     {
    //       mainKey: 3,
    //       inputDatas: [
    //         [{ subKey: 'TEXT-01', value: '[예시 답안] 무엇을 하고 있는지 묻는 말: What are you doing? 친구의 대답: 그림을 그리고 있어요.' }],
    //       ],
    //     },
    //   ];
    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 1:
      return [
        {
          script: [{ text: 'B: What are you doing, Emily?' }, { text: 'G: I’m cleaning.' }],
          interpretation: [{ text: 'B: 무엇을 하고 있니, 에밀리?' }, { text: 'G: 나는 청소하고 있어.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'G: What are you doing?' },
            { text: 'B: __________' },
            { text: '(a) I’m cooking.' },
            { text: '(b) I’m listening to music.' },
            { text: '(c) I’m making a robot.' },
          ],
          interpretation: [
            { text: 'G: 무엇을 하고 있니?' },
            { text: 'B: __________' },
            { text: '(a) 나는 요리하고 있어.' },
            { text: '(b) 나는 음악을 듣고 있어.' },
            { text: '(c) 나는 로봇을 만들고 있어.' },
          ],
        },
      ];
    case 3:
      return [
        {
          answer: [{ text: '무엇을 하고 있는지 묻는 말: What are you doing?' }, { text: '친구의 대답: 그림을 그리고 있어요.' }],
           // script: [{ text: '' }],
          interpretation: [{ text: '무엇을 하고 있는지 묻는 말: 무엇을 하고 있니?' }],
        },
      ];
    default:
      return [];
  }
};
