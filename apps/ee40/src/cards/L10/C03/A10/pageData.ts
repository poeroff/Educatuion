import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1: // page 1번
      return {
        pageType: 'GRADE',
        inputData: [
          {
            mainKey: 1,
            inputData: [
              { subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: true },
              { subKey: 'TEXT-1', type: 'TEXT', value: '', isAnswer: true },
            ],
          },
        ],
      };
    case 3:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 3,
            inputData: [{ subKey: 'TEXT-01', type: 'TEXT', value: '', isAnswer: true }],
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
          inputDatas: [
            [
              { subKey: 'TEXT-0', value: 's' },
              { subKey: 'TEXT-1', value: 'h' },
            ],
          ],
        },
      ];
    case 3:
      return [
        {
          mainKey: 3,
          inputDatas: [[{ subKey: 'TEXT-01', value: 'shirt' }]],
        },
      ];
    default:
      return [];
  }
};
