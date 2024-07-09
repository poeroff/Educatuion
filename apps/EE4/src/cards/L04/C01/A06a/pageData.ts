import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [
              { subKey: 'TEXT-01', type: 'NUMBER', value: null, isAnswer: true },
              { subKey: 'TEXT-02', type: 'NUMBER', value: null, isAnswer: true },
              { subKey: 'TEXT-03', type: 'NUMBER', value: null, isAnswer: true },
              { subKey: 'TEXT-04', type: 'NUMBER', value: null, isAnswer: true },
              { subKey: 'TEXT-05', type: 'NUMBER', value: null, isAnswer: true },
            ],
          },
        ],
      };
    case 2:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'NUMBER-02', type: 'NUMBER', value: null, isAnswer: true }],
          },
        ],
      };
    case 3:
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'NUMBER-03', type: 'NUMBER', value: null, isAnswer: true }],
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
          inputDatas: [
            [
              { subKey: 'TEXT-01', value: '4' },
              { subKey: 'TEXT-02', value: '5' },
              { subKey: 'TEXT-03', value: '1' },
              { subKey: 'TEXT-04', value: '2' },
              { subKey: 'TEXT-05', value: '3' },
            ],
          ],
        },
      ];
    case 2:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'NUMBER-02', value: 2 }]],
        },
      ];
    case 3:
      return [
        {
          mainKey: 0,
          inputDatas: [[{ subKey: 'NUMBER-03', value: 1 }]],
        },
      ];
    default:
      return [];
  }
};
