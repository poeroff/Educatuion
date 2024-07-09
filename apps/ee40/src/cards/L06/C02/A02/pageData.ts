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
    case 5:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 5,
            inputData: [{ subKey: 'TEXT-05', type: 'TEXT', value: '', isAnswer: false }],
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
          inputDatas: [[{ subKey: 'TEXT-01', value: '벽화를 그리고 있어요.' }]],
        },
      ];
      case 3:
        return [
          {
            mainKey: 3,
            inputDatas: [[{ subKey: 'P03', value: 1 }]],
          },
        ];
    case 5:
      return [
        {
          mainKey: 5,
          inputDatas: [[{ subKey: 'TEXT-05', value: '노래를 듣고 있었어요.' }]],
        },
      ];

    default:
      return [];
  }
};

export const getSolutionData = (pageNumber: number) => {
  switch (pageNumber) {
    default:
      return [{ answer: '', script: '',  interpretation: [{ text: '1' }]}];
  }
};
