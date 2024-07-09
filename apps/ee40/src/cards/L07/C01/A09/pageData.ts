import { initDataType } from '@maidt-cntn/api';
import { Script } from 'vm';

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
          script: [{ text: 'G: What time is it?' }, { text: 'B: It’s 11 o’clock.' }],
          interpretation: [{ text: 'G: 몇 시야?' }, { text: 'B: 11시야.' }],
        },
      ];
    case 2:
      return [
        {
          answer: 2,
          script: `G: What time is it?
                  B: It’s 7:30.`,
          interpretation: `G: 몇 시야?
                          B: 일곱시 삼십분이야.`,
        },
      ];
    case 3:
      return [
        {
          answer: [{ text: '지금 몇 시인지 묻는 말: What time is it? 지금 시각: 1시예요' }, { text: '지금 시각: 1시예요.' }],
          interpretation: [{ text: '지금 몇 시인지 묻는 말: 지금 몇 시니?' }],
        },
      ];
    default:
      return [];
  }
};
