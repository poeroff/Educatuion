import { initDataType } from '@maidt-cntn/api';

export const getDefaultData = (pageNumber: number): initDataType => {
  switch (pageNumber) {
    case 1:
      return {
        pageType: 'SUBMIT',
        inputData: [
          {
            mainKey: 0,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 1,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 2,
            inputData: [{ subKey: 'TEXT-0', type: 'TEXT', value: '', isAnswer: false }],
          },
          {
            mainKey: 3,
            inputData: [{ subKey: 'NUMBER-0', type: 'NUMBER', value: '', isAnswer: false }],
          },
          {
            mainKey: 4,
            inputData: [{ subKey: 'NUMBER-0', type: 'NUMBER', value: '', isAnswer: false }],
          },
          {
            mainKey: 5,
            inputData: [{ subKey: 'NUMBER-0', type: 'NUMBER', value: '', isAnswer: false }],
          },
        ],
      };
    default:
      return {};
  }
};

export const getCorrectData = (pageNumber: number) => {
  switch (pageNumber) {
    default:
      return [];
  }
};
