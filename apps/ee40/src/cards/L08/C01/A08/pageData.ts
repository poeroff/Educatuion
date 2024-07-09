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

    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    case 1:
      return [
        {
          script: [{ text: 'G: How much is it?' }, { text: 'M: It’s 1,000 won.' }],
          interpretation: [{ text: 'G: 얼마예요?' }, { text: 'M: 천 원이야.' }],
        },
      ];
      case 3:
        return [
          {
            answer: [
              { text: '가격을 묻는 말: How much is it?' },
              { text: '가격을 묻는 말에 답하는 말: It’s 700 won.' },
            ],
            interpretation: [
              { text: '가격을 묻는 말: 얼마니?' },
              { text: '가격을 묻는 말에 답하는 말: 칠백 원이야.' },
            ],
          },
        ];
    default:
      return [];
  }
};
