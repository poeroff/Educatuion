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
          inputDatas: [[{ subKey: 'P01', value: 2 }]],
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
          script: [{ text: 'M: Put on this helmet, please.' }, { text: 'G: Okay.' }],
          interpretation: [{ text: 'M: 헬멧을 써줘.' }, { text: 'G: 알겠어요.' }],
        },
      ];
    case 2:
      return [
        {
          script: [
            { text: 'G: __________ ' },
            { text: '(a) Don’t enter, please.' },
            { text: '(b) Put on this helmet, please.' },
            { text: '(c) Line up, please.' },
          ],
          interpretation: [
            { text: 'G: __________ ' },
            { text: '(a) 들어가지 말아줘.' },
            { text: '(b) 이 헬멧을 쓰세요.' },
            { text: '(c) 줄을 서세요.' },
          ],
        },
      ];
      case 3:
        return [
          {
            answer: [{ text: '스케이트장에서 지켜야 할 규칙: 헬멧을 써야 해요.' }, { text: 'Put on this helmet, please.' }],
            interpretation: [{ text: '이 헬멧을 써 줘.' }],
          },
        ];
    default:
      return [];
  }
};


