import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-2', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-3', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-4', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-5', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 4:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 2,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: '', isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'NUMBER-01', type: 'NUMBER', value: '', isAnswer: true }],
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
          mainKey: 0,
          inputDatas: [[{ subKey: 'TEXT-01', value: '야구하고 있어요. / 새로운 친구를 만나 인사하고 있어요.' }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 1,
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: 'r' },
              { subKey: 'TEXT-1', value: 'o' },
              { subKey: 'TEXT-2', value: 't' },
              { subKey: 'TEXT-3', value: 'h' },
              { subKey: 'TEXT-4', value: 'e' },
              { subKey: 'TEXT-5', value: 'r' },
            ],
          ],
        },
      ];
    case 4:
      return [
        {
          mainKey: 2,
          inputDatas: [[{ subKey: 'NUMBER-01', value: 2 }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'NUMBER-01', value: 1 }]],
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
          interpretation: [{ text: '야구하고 있어요. / 새로운 친구를 만나 인사하고 있어요.' }],
        },
      ];
    case 4:
      return [
        {
          //script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: '2' }],
        },
      ];
    case 5:
      return [
        {
          //script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: '2' }],
        },
      ];
    default:
      return [];
  }
};