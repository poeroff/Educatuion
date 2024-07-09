import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true }],
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
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 4,
            inputData: [{ subKey: 'TEXT-04', type: 'TEXT', value: '', isAnswer: true }],
          },
        ],
      };
    case 5:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 5,
            inputData: [{ subKey: 'TEXT-05', type: 'TEXT', value: '', isAnswer: true }],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '농구하고 있어요. / 배드민턴을 치고 있어요.' }]],
        },
      ];
      case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'P03', value: 1 }]],
        },
      ];
    case 4:
      return [
        {
          mainKey: 4,
          inputDatas: [[{ subKey: 'TEXT-04', value: '배드민턴을 잘 치지 못하기 때문이에요.' }]],
        },
      ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'TEXT-05', value: '바빠서요.' }]],
        },
      ];
    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 3:
      return [
        {
          //script: [{ text: 'G: How are you?' }, { text: 'B: I’m great.' }],
          interpretation: [{ text: '1' }],
        },
      ];
      default:
        return [];
    }
  };