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
          script: [{ text: 'B: What is he doing?' }, { text: 'G: He’s drawing a picture.' }],
          interpretation: [{ text: 'B: 그는 무엇을 하고 있니?' }, { text: 'G: 그는 그림을 그리고 있어.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'G: What is she doing?' },
            { text: 'B: __________' },
            { text: '(a) I’m cooking.' },
            { text: '(b) She’s reading a book.' },
            { text: '(c) She’s listening to music.' },
          ],
          interpretation: [
            { text: 'G: 그녀는 무엇을 하고 있니?' },
            { text: 'B: __________' },
            { text: '(a) 나는 요리하고 있어.' },
            { text: '(b) 그녀는 책을 읽고 있어.' },
            { text: '(c) 그녀는 음악을 듣고 있어.' },
          ],
        },
      ];
      case 3:
        return [
          {
            answer: [{ text: '쉬는 시간에 친구가 하고 있는 것: 책을 읽고 있어요.' }, { text: 'He’s reading a book.' }],
            interpretation: [{ text: '그는 책을 읽고 있어.' }],
          },
        ];
    default:
      return [];
  }
};